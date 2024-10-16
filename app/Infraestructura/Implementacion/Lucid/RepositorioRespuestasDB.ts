import { Respuesta } from 'App/Dominio/Datos/Entidades/Respuesta';
import { RepositorioRespuesta } from 'App/Dominio/Repositorios/RepositorioRespuesta';
import TblRespuestas from 'App/Infraestructura/Datos/Entidad/Respuesta';
import { DateTime } from 'luxon';
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import { TblArchivosTemporales } from 'App/Infraestructura/Datos/Entidad/Archivo';
import { ServicioAuditoria } from 'App/Dominio/Datos/Servicios/ServicioAuditoria';
import { ServicioEstados } from 'App/Dominio/Datos/Servicios/ServicioEstados';
import { PayloadJWT } from 'App/Dominio/Dto/PayloadJWT';
import { ServicioEstadosVerificado } from 'App/Dominio/Datos/Servicios/ServicioEstadosVerificado';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';
import { TblSedesOperativas } from 'App/Infraestructura/Datos/Entidad/SedesOperativas';
import { TblPatios } from 'App/Infraestructura/Datos/Entidad/Patios';
import { TblEmpresas } from 'App/Infraestructura/Datos/Entidad/Empresas';
import axios from 'axios'; 
import Env from '@ioc:Adonis/Core/Env';
import Mail from '@ioc:Adonis/Addons/Mail'

export class RepositorioRespuestasDB implements RepositorioRespuesta {
  private servicioAuditoria = new ServicioAuditoria();
  private servicioEstado = new ServicioEstados();
  private servicioEstadoVerificado = new ServicioEstadosVerificado()

  async guardar(datos: string, idReporte: number, documento: string): Promise<any> {

    const { respuestas, sedes, guardarPatios, eliminarPatios, guardarEmpresas, eliminarEmpresas } = JSON.parse(datos);
    const { usuarioCreacion, loginVigilado, idEncuesta, estadoVerificacionId } = await TblReporte.findByOrFail('id', idReporte)

    let estado = 1003
    let array_msn: string[] = [];
    let valido = true;
    let dataemail:any = { 
      clave: '', 
      nombre: '', 
      usuario: '', 
      enviarcredenciales: false,
      textpoliza: 'Debe cargar las polizas en el aplicativo POLIZAS de la superintendencia de transporte',
      textvigia: 'Debe registrarse en el aplicativo VIGIA de la superintendencia de transporte',
      logo: Env.get('LOGO') 
    };

    if (estadoVerificacionId === 7 || estadoVerificacionId === 1005) 
    {
      estado = 1005
    }
  
    this.servicioEstado.Log(loginVigilado, estado, idEncuesta, idReporte)
  
    this.servicioAuditoria.Auditar({
      accion: "Guardar Respuesta PECCIT",
      modulo: "Información general PECCIT",
      usuario: usuarioCreacion ?? '',
      vigilado: loginVigilado ?? '',
      descripcion: 'Primer guardado de la encuesta',
      encuestaId: idEncuesta,
      tipoLog: 4
    })

    await TblSedesOperativas.query().where('seo_usuario_id', documento).delete();

    for await (const sede of sedes) {
      sede.usuarioId = documento;
      const sedesOperativas = new TblSedesOperativas();
       sedesOperativas.estableceSedeConId(sede);
       sedesOperativas.save();
    }

    await TblPatios.query().whereIn('pat_id', eliminarPatios).delete();

    for await (const patio of guardarPatios) 
    {
      if(patio.id)
      {
        const isPatio = await TblPatios.findOrFail(patio.id);
        isPatio.establecePatioConId(patio)
        isPatio.save()
      }
      else
      {
        patio.usuarioId = patio.usuario_id       
        
        const newPatio = new TblPatios()
        newPatio.establecePatio(patio)
        newPatio.save()
      }
    }

    await TblEmpresas.query().whereIn('emp_nit', eliminarEmpresas).delete();

    for await (const empresa of guardarEmpresas)
    {
      valido = true;

      const datosEmpresa = {
                nit: empresa.nit,
                razonSocial: empresa.razon_social,
                tipoServicio: empresa.tipo_servicio,
                originalTipoServicio: empresa.original_tipo_servicio,
                documentoTipoServicio: empresa.documento_tipo_servicio,
                rutaTipoServicio: empresa.ruta_tipo_servicio,
                capacidadTransportadoraA: empresa.capacidad_transportadora_a,
                capacidadTransportadoraB: empresa.capacidad_transportadora_b,
                capacidadTransportadoraC: empresa.capacidad_transportadora_c,
                originalTransportadora: empresa.original_transportadora,
                rutaTransportadora: empresa.ruta_transportadora,
                documentoTransportadora: empresa.documento_transportadora,
                correoelectronico:empresa.correoelectronico,
                estado: empresa.estado,
                usuarioId: empresa.usuario_id,
                departamento: empresa.departamento,
                municipio: empresa.municipio,
      }
   
      const isEmpresa = await TblEmpresas.findBy('emp_nit',empresa.nit);
      
      const out_validacion =  await this.validacionRVP(empresa.nit);

      if (isEmpresa)
      {
        const affectedRows = await TblEmpresas.query()
        .where('emp_nit', empresa.nit)
        .update(datosEmpresa);

        dataemail.enviarcredenciales = false;
      }
      else
      {
        valido = out_validacion.status;

        if (out_validacion.status)
        {
          const a = await TblEmpresas.create(datosEmpresa);

          const obj_usuario = {
              usuario: "Usuario", // Se autogenera en backend polizas utilizando el nit de la empresa
              identificacion: datosEmpresa.nit,
              nombre: datosEmpresa.razonSocial,
              apellido: null,
              fechaNacimiento: null,
              cargo: null,
              correo: datosEmpresa.correoelectronico,
              telefono: null,
              estado: true,
              clave: "Clave", // Se autogenera en backend polizas
              claveTemporal: true,
              idRol:'003'
          };

          dataemail.enviarcredenciales = true;
          dataemail.clave = datosEmpresa.nit;
          dataemail.usuario = datosEmpresa.nit;

          const out_usuario = await this.crearUsuariopolizas(obj_usuario);
          dataemail.clave = out_usuario.out.clave;
        }
      }

      dataemail.nombre = datosEmpresa.razonSocial;

      if (out_validacion.tienepoliza)
      {
          dataemail.textpoliza = '';
      }

      if (out_validacion.tienevigia)
      {
          dataemail.textvigia = '';
      }

      await this.enviarCorreo(
        'Registro de empresa exitoso', 
        datosEmpresa.correoelectronico,
        dataemail
      );
    }

    for await (const respuesta of respuestas)
    {
      //validar si existe
      const existeRespuesta = await TblRespuestas.query().where({ 'id_pregunta': respuesta.preguntaId, 'id_reporte': idReporte }).first()

      let data: Respuesta = {
        idPregunta: respuesta.preguntaId,
        valor: respuesta.valor,
        usuarioActualizacion: documento,
        idReporte: idReporte,
        fechaActualizacion: DateTime.fromJSDate(new Date),
        observacion: respuesta.observacion ?? ''
      }

      if (respuesta.documento)
      {
        data.documento = respuesta.documento
      }

      if (respuesta.nombreArchivo)
      {
        data.nombredocOriginal = respuesta.nombreArchivo
      }

      if (respuesta.ruta)
      {
        data.ruta = respuesta.ruta
      }

      if (existeRespuesta)
      {
        existeRespuesta.estableceRespuestaConId(data)
        const resp = await existeRespuesta.save();
        this.servicioAuditoria.Auditar({
          accion: "Actualizar Respuesta PECCIT",
          modulo: "Informacion General PECCIT",
          jsonAnterior: JSON.stringify(existeRespuesta.$attributes),
          jsonNuevo: JSON.stringify(resp.$attributes),
          usuario: usuarioCreacion ?? '',
          vigilado: loginVigilado ?? '',
          descripcion: 'Actualización de respuesta',
          encuestaId: idEncuesta
        })

      }
      else
      {
        const respuestaDB = new TblRespuestas();
        respuestaDB.establecerRespuestaDb(data)
        await respuestaDB.save();
      }

      //Elimnar de la tabla temporal el archivo almacenado     

      if (respuesta.documento)
      {
        const temporal = await TblArchivosTemporales.query().where({ 'art_pregunta_id': respuesta.preguntaId, 'art_usuario_id': loginVigilado, 'art_nombre_archivo': respuesta.documento }).first()

        await temporal?.delete()
      }
    }

    return {
      mensaje: "Encuesta guardada correctamente",
      out_empresa: {
        msn: valido ? 'La empresa fue registrada correctamente' : 'No fue posible agregar la empresa',
        array_errors: array_msn,
        status: valido? 200 : 409
      }
    }
  }

  async verificar(datos: string, payload: PayloadJWT): Promise<any> {
    const { idReporte, respuestas } = JSON.parse(datos)

    this.servicioEstadoVerificado.Log(idReporte, 2, payload.documento)

    respuestas.forEach(async respuesta => {

      const existeRespuesta = await TblRespuestas.query().where({ 'id_pregunta': respuesta.preguntaId, 'id_reporte': idReporte }).first()
      existeRespuesta?.estableceVerificacion(respuesta)
      existeRespuesta?.save()
    });

  }

  async finalizar(params: any): Promise<any> {
    const { idEncuesta, idReporte, idUsuario, idVigilado } = params
    const usuario = await TblUsuarios.query().preload('clasificacionUsuario', (sqlClasC) => {
      sqlClasC.preload('clasificacion', (sqlCla) => {
        sqlCla.preload('pregunta', (sqlPre) => {
          sqlPre.preload('respuesta', sqlResp => {
            sqlResp.where('id_reporte', idReporte)
          })
          sqlPre.where('id_encuesta', idEncuesta)
        }).whereHas('pregunta', sqlE => {
          sqlE.where('id_encuesta', idEncuesta);
        }).orderBy('id_clasificacion', 'asc')
      })
    }).where('identificacion', idVigilado).first()


    let aprobado = true;
    let cumple = true;
    const faltantes = new Array();
    const pasos = usuario?.clasificacionUsuario[0].clasificacion
    pasos?.forEach(paso => {
      paso.pregunta.forEach(preguntaPaso => {
        const respuesta = preguntaPaso.respuesta[0];

        if (respuesta) {
          // console.log(respuesta.cumple , respuesta.corresponde);
          if (!respuesta.cumple || respuesta.cumple == 0 || !respuesta.corresponde || respuesta.corresponde == 0) {
            faltantes.push(respuesta.idPregunta)
            aprobado = false
          }


          if (respuesta.cumple && respuesta.cumple == 2 && (!respuesta.observacionCumple || respuesta.observacionCumple == '')) {
            faltantes.push(respuesta.idPregunta)
            aprobado = false
          }

          if (respuesta.corresponde && respuesta.corresponde == 2 && (!respuesta.observacionCorresponde || respuesta.observacionCorresponde == '')) {
            faltantes.push(respuesta.idPregunta)
            aprobado = false
          }

          if (respuesta.corresponde == 2 || respuesta.cumple == 2) {
            cumple = false;
          }

        }

      });

    });

    //guardar log de intento si falla 

    if (aprobado) {
      let estado = 7;
      if (cumple) {
        estado = 6;
      }
      this.servicioEstadoVerificado.Log(idReporte, estado, idUsuario)
    }



    return { aprobado, faltantes }

  }

  public async validacionRVP(nit:string)
  {
    let array_msn: string[] = [];
    let valido = true;
    let msntemp:string = "";
    let tienepoliza:boolean = true;
    let tienevigia:boolean = true;

    const output_rues = await this.validarRues(parseInt(nit));
    const output_vigia = await this.validarVigia(nit);

    if (!output_rues.out.hasOwnProperty('registros'))
    {
        msntemp = "La empresa no encuentra registrada en el RUES";
        array_msn.push(msntemp);
        valido = false;
    }

    if (output_vigia.out.code == "ERR_BAD_REQUEST")
    {
        msntemp = 'La empresa no encuentra registrada en el VIGIA';
        array_msn.push(msntemp);
        tienevigia = false;
    }

    const output_poliza = await this.validarPoliza(nit);

    if (output_poliza.out.code == "ERR_BAD_REQUEST")
    {
        msntemp = "La empresa debe reportar las pólizas";
        array_msn.push(msntemp);
        tienepoliza = false;
    }

     return {
         status: valido,
         array_msn:array_msn,
         tienepoliza:tienepoliza,
         tienevigia:tienevigia
     }
  }

  public async validarVigia(nit:string){
    try
    {
        const apiResponse = await axios.get(Env.get('URL_VIGIA')+'/vista', {
            params: {
              documento: nit, // Parámetro del documento en la URL
            },
            headers: {
              Authorization: 'Bearer 2c9b417a-75af-46c5-8ca0-340d3acdb3c7', // Token Bearer
              'Content-Type': 'application/json',
            },
          });

        return {
            out: apiResponse.data,
            status: 200,
            msn: 'Consulta exitosa en VIGIA'
        };
    } 
    catch (error)
    {
        return {
            out: error,
            msn: 'Error al consulta VIGIA'
        };
    }
}

public async validarPoliza(nit:string){
    try
    {
        const apiResponse = await axios.get(Env.get('URL_POLIZAS')+'/poliza/usuario', {
            params: {
              documento: nit, // Parámetro del documento en la URL
            },
            headers: {
              Authorization: 'Bearer 2c9b417a-75af-46c5-8ca0-340d3acdb3c7', // Token Bearer
              'Content-Type': 'application/json',
            },
          });

        return {
            out: apiResponse.data,
            status: 200,
            msn: 'Consulta exitosa en Polizas'
        };
    } 
    catch (error)
    {
        return {
            out: error,
            status: 500,
            msn: 'Error al consulta Polizas'
        };
    }
}

public async validarRues(nit:number){
    try
    {
        const apiResponse = await axios.post(Env.get('URL_RUES')+'/getConfecamaras', {
                document: (nit), // Parámetro del documento en la URL
            }, {
                headers: {
                    Authorization: 'Bearer 2c9b417a-75af-46c5-8ca0-340d3acdb3c7', 
                    'Content-Type': 'application/json',
                }
            });

        return {
            out: apiResponse.data,
            status: 200,
            msn: 'Consulta exitosa en RUES'
        };
    } 
    catch (error)
    {
        return {
            out: null,
            status: 500,
            msn: 'Error al consulta VIGIA'
        };
    }
  }

  public async crearUsuariopolizas(obj_usuario:any){
    try
    {
        const apiResponse = await axios.post(Env.get('URL_POLIZAS')+'/registropeccit',
            obj_usuario,
            {
              headers: {
                  Authorization: 'Bearer 2c9b417a-75af-46c5-8ca0-340d3acdb3c7', 
                  'Content-Type': 'application/json',
              }
            }
        );

        return {
            out: apiResponse.data,
            status: 200,
            msn: 'Usuario creado exitosamente'
        };
    } 
    catch (error)
    {
        return {
            out: null,
            status: 500,
            msn: 'Error al crear usuario en polizas'
        };
    }
  }

  public async enviarCorreo(asunto:string, destinatario:string, data:any){
    Mail.send(mensaje => {
      mensaje
        .subject(asunto)
        .from(Env.get('SMTP_USERNAME'), Env.get('EMAIL_ALIAS'))
        .to(destinatario)
        .htmlView("app/Dominio/Email/Templates/empresas.edge", data)
    });
  }
}
