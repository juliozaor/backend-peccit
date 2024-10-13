import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioEmpresa } from 'App/Dominio/Datos/Servicios/ServicioEmpresa'
import { RepositorioEmpresa } from 'App/Infraestructura/Implementacion/Lucid/RepositorioEmpresa';

export default class ControladorEncuesta {
  private service: ServicioEmpresa
  constructor () {
    this.service = new ServicioEmpresa(new RepositorioEmpresa())
  }

  public async listar ({ request, response }:HttpContextContract) {
    const array_empresas = await this.service.listar(request.all())
    return response.status(200).send(array_empresas);
  }


  public async listarpoliza ({ request, response }:HttpContextContract) {
    const array_empresas = await this.service.listarpoliza(request.all())
    return response.status(200).send(array_empresas);
  }

  public async novedadespoliza ({ request, response }:HttpContextContract) {
    const array_empresas = await this.service.novedadespoliza(request.all())
    return response.status(200).send(array_empresas);
  }
}