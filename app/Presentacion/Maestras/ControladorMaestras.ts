/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TblAnioVigencias } from 'App/Infraestructura/Datos/Entidad/AnioVigencia';
import { TblCiudades } from 'App/Infraestructura/Datos/Entidad/Ciudades';
import { TblDepartamentos } from 'App/Infraestructura/Datos/Entidad/Departamentos';
import { TblMeses } from 'App/Infraestructura/Datos/Entidad/Mes';
import { TblServiciosModalidades } from 'App/Infraestructura/Datos/Entidad/ServicioModalidad';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';

export default class ControladorReporte {
  //private service: ServicioIndicadores
  constructor() {
    /* this.service = new ServicioIndicadores(
      new RepositorioIndicadoresDB()
    ) */
  }


  public async listarMeses({ request, response }: HttpContextContract) {

    const { historico } = request.only(['historico']);

    let mesesSql;
    

    const vigencia = await TblAnioVigencias.query().where('anv_estado', true).first();
    if (historico && historico == 'true') {
      if (vigencia?.anio == 2023) {
        mesesSql = await TblMeses.query().where('mes_habilitado', true).orderBy('mes_id', 'asc');
      } else {
        mesesSql = await TblMeses.query().orderBy('mes_id', 'asc');
      }
    } else {
      mesesSql = await TblMeses.query().where({'mes_estado': true, 'mes_vigencia':vigencia?.anio}).orderBy('mes_id', 'asc');
    }


    const meses = mesesSql.map(m => {
      return {
        idMes: m.id,
        nombreMes: m.nombre
      }
    })
    response.status(200).send({ meses })
  }

  public async servicioModalidad({ request, response }: HttpContextContract) {
    const serviciosModalidades = await TblServiciosModalidades.query().orderBy('id', 'asc');
    response.status(200).send({ serviciosModalidades })
  }

  public async listarDepartamentos({ request, response }: HttpContextContract) {
    const departamentos = await TblDepartamentos.query().where('status', true).orderBy('name', 'asc');
    response.status(200).send(departamentos)
  }

  public async listarCiudades({ request, response }: HttpContextContract) {
    const { departamentoId, filtro } = request.all();
    const consulta = TblCiudades.query().preload('departamento').where('status', true);
    if (departamentoId) {
      consulta.where('departmentId', departamentoId);
    }/* else{
      ciudades=await TblCiudades.query().preload('departamento').where('status',true).orderBy('name', 'asc');
    } */
    if(filtro && filtro == 'true'){
      const payload = await request.obtenerPayloadJWT();
      //const usuario = await TblUsuarios.findByOrFail('usn_usuario', payload.documento);
      const usuario = await TblUsuarios.query().preload('reportaMunicipio').where('usn_usuario', payload.documento).first();
      
      const idMunicipios = new Array();
     // consulta.where('id', usuario.municipioId!)
     usuario?.reportaMunicipio.forEach(elemento => {      
      idMunicipios.push(elemento.municipio);
     });     
     idMunicipios.push(usuario?.municipioId);

      consulta.whereIn('id', idMunicipios)

    }
    const ciudades = await consulta.orderBy('name', 'asc');
    response.status(200).send(ciudades)
  }


}
