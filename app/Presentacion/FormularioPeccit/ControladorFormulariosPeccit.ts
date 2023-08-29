import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RepositorioFormularioPeccitDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioFormularioPeccitDB'
import { ServicioUsuario } from 'App/Dominio/Datos/Servicios/ServicioUsuario';
import { RepositorioUsuariosDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioUsuariosDB';
import { ServicioFormularioPeccit } from 'App/Dominio/Datos/Servicios/ServicioFormularioPeccit';

export default class ControladorFormulariosPeccit {
  private service: ServicioFormularioPeccit
  constructor () {
    this.service = new ServicioFormularioPeccit(
      new RepositorioFormularioPeccitDB(),
      new ServicioUsuario( new RepositorioUsuariosDB())
    )
  }

  public async visualizar ({ request }:HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    const encuestas = await this.service.visualizar(request.all(), payload)
    return encuestas
  }


}
