
import { Paginador } from 'App/Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { Reportadas } from 'App/Dominio/Dto/Encuestas/Reportadas';
import TblEncuestas from 'App/Infraestructura/Datos/Entidad/Encuesta';
import TblReporte from 'App/Infraestructura/Datos/Entidad/Reporte';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';
import TbClasificacion from 'App/Infraestructura/Datos/Entidad/Clasificacion';
import TblRespuestas from 'App/Infraestructura/Datos/Entidad/Respuesta';
//import NoAprobado from 'App/Exceptions/NoAprobado';
import { Respuesta } from 'App/Dominio/Datos/Entidades/Respuesta';
import { Pregunta } from 'App/Dominio/Datos/Entidades/Pregunta';
import { ServicioAuditoria } from 'App/Dominio/Datos/Servicios/ServicioAuditoria';
import { ServicioEstados } from 'App/Dominio/Datos/Servicios/ServicioEstados';
import { DateTime } from 'luxon';
import { TblAnioVigencias } from 'App/Infraestructura/Datos/Entidad/AnioVigencia';
import { ServicioAcciones } from 'App/Dominio/Datos/Servicios/ServicioAcciones';
import { EnviadorEmail } from 'App/Dominio/Email/EnviadorEmail'
import { EmailnotificacionCorreo } from 'App/Dominio/Email/Emails/EmailNotificacionCorreo';
import Env from '@ioc:Adonis/Core/Env';
import { EnviadorEmailAdonis } from 'App/Infraestructura/Email/EnviadorEmailAdonis';
import { RepositorioFormularioPeccit } from 'App/Dominio/Repositorios/RepositorioFormularioPeccit';
export class RepositorioFormularioPeccitDB implements RepositorioFormularioPeccit {
  private servicioAuditoria = new ServicioAuditoria();
  private servicioEstado = new ServicioEstados();
  private servicioAcciones = new ServicioAcciones();
  private enviadorEmail: EnviadorEmail


  async visualizar(params: any): Promise<any> {

    const { idEncuesta, idUsuario, idVigilado, idReporte, idRol } = params;
    let tipoAccion = (idUsuario === idVigilado) ? 2 : 1;
    let clasificacionesArr: any = [];
    let estado = '';
    const reporte = await TblReporte.query().preload('estadoVerificado').preload('estadoVigilado').where('id_reporte', idReporte).first()
    estado = reporte?.estadoVerificado?.nombre ?? estado;
    estado = reporte?.estadoVigilado?.nombre ?? estado;
    let clasificacion = '';


    const consulta = TblEncuestas.query().preload('pregunta', sql => {
      sql.preload('clasificacion')
      sql.whereHas('clasificacion', sqlClass =>{
        sqlClass.where('estado',1)
      })
      sql.preload('tiposPregunta')
      sql.preload('respuesta', sqlResp => {
        sqlResp.where('id_reporte', idReporte)
      })
      sql.preload('subTiposdatos', sqlSubTipoDato => {
        sqlSubTipoDato.preload('tipoDato')
      })
      sql.where('estado', 1)

    }).where({ 'id_encuesta': idEncuesta }).first();
    const encuestaSql = await consulta


    //BUscar la clasificacion del usuario
    const usuario = await TblUsuarios.query().preload('clasificacionUsuario', (sqlClasC) => {
      sqlClasC.preload('clasificacion')
      sqlClasC.has('clasificacion')
    }).where('identificacion', idVigilado).first()

    const nombreClasificaion = usuario?.clasificacionUsuario[0]?.nombre;
    const descripcionClasificacion = usuario?.clasificacionUsuario[0]?.descripcion;
    const pasos = usuario?.clasificacionUsuario[0]?.clasificacion

    const fechaActual = DateTime.now();
    const rolDefecto = (fechaActual < encuestaSql?.fechaFin!) ? idRol : '000'
    const { encuestaEditable } = await this.servicioAcciones.obtenerAccion(reporte?.estadoVerificacionId ?? 0, rolDefecto);

    const claficiacionesSql = await TbClasificacion.query().orderBy('id_clasificacion', 'asc');
    let consecutivo: number = 1;
    claficiacionesSql.forEach(clasificacionSql => {
      
      let preguntasArr: any = [];
      clasificacion = clasificacionSql.nombre;
      //validar si el paso es obligatorio      
     // const obligatorio = pasos?.find(paso => paso.id === clasificacionSql.id) ? true : false;
      encuestaSql?.pregunta.forEach(pregunta => {
        console.log(pregunta.subTiposdatos);
        

        if (clasificacionSql.id === pregunta.clasificacion.id) {
          preguntasArr.push({
            idPregunta: pregunta.id,
           // numeroPregunta: consecutivo,
            pregunta: pregunta.pregunta,
            obligatoria: pregunta.obligatoria, //obligatorio,// 
            respuesta: pregunta.respuesta[0]?.valor ?? '',
            documento: pregunta.respuesta[0]?.documento ?? '',
            nombreOriginal: pregunta.respuesta[0]?.nombredocOriginal ?? '',
            ruta: pregunta.respuesta[0]?.ruta ?? '',
            adjuntable: pregunta.adjuntable,
            adjuntableObligatorio: pregunta.adjuntableObligatorio,// pregunta.adjuntableObligatorio,
            tipoPregunta: pregunta.tiposPregunta.nombre,
            //tamanio: pregunta.tamanio,
            valoresPregunta: pregunta.tiposPregunta.opciones,
            validacionesPregunta: pregunta.tiposPregunta.validaciones,
            tieneObservacion:pregunta.tieneObservacion,
            maxObservacion: pregunta.maxObservacion,
            observacion: pregunta.respuesta[0]?.observacion ?? '',
          /*   cumple: pregunta.respuesta[0]?.cumple ?? '',
            observacionCumple: pregunta.respuesta[0]?.observacionCumple ?? '',
            corresponde: pregunta.respuesta[0]?.corresponde ?? '',
            observacionCorresponde: pregunta.respuesta[0]?.observacionCorresponde ?? '', */            
            tipo:pregunta.tipo,
            habilitaObservacion: pregunta.tiposPregunta.datoClave,
            tipoEvidencia: pregunta.subTiposdatos.tipoDato.nombre,
            validacionesEvidencia: {
              tipoDato: pregunta.tipoEvidencia,
              cantDecimal: pregunta.subTiposdatos.decimales??0,
              tamanio: pregunta.tamanio,
              extension: pregunta.subTiposdatos.extension??''
            },
          });
          consecutivo++;
        }

      });
      if (preguntasArr.length >= 1) {
        clasificacionesArr.push(
          {
            clasificacion,
            preguntas: preguntasArr
          }

        );
      }


    });

    const encuesta = {
      tipoAccion,
      estadoActual: estado,
      nombreEncuesta: encuestaSql?.nombre,
      encuestaEditable,
      clasificaion: nombreClasificaion,
      descripcionClasificacion,
     // observacion: encuestaSql?.observacion,
      clasificaciones: clasificacionesArr,
     
    }

    return encuesta
  }

}
