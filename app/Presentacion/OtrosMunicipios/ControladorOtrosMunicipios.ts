/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioOtrosMunicipios } from 'App/Dominio/Datos/Servicios/ServicioOtrosMunicipios'
import { RepositorioOtrosMunicipiosDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioOtrosMunicipiosDB'

export default class ControladorOtrosMunicipios {
  private service: ServicioOtrosMunicipios
  constructor () {
    this.service = new ServicioOtrosMunicipios(
      new RepositorioOtrosMunicipiosDB()
    )
  }

public async obtener ({ request, response }:HttpContextContract) {
  const payload = await request.obtenerPayloadJWT()
    const otrosMunicipios = await this.service.obtener(payload.documento)
    response.status(200).send(otrosMunicipios);
  }

  public async guardar ({ request, response }:HttpContextContract) {  
    const payload = await request.obtenerPayloadJWT() 
    const crear = await this.service.crear(payload.documento, JSON.stringify(request.all()))
    response.status(200).send(crear);
  }

}
