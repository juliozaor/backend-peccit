/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioIndicadores } from 'App/Dominio/Datos/Servicios/ServicioIndicadores'
import { RepositorioIndicadoresDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioIndicadoresDB'
/* import { ServicioRespuestas } from 'App/Dominio/Datos/Servicios/ServicioRespuestas'
import { RepositorioRespuestasDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioRespuestasDB' */

export default class ControladorReporte {
  private service: ServicioIndicadores
  constructor() {
    this.service = new ServicioIndicadores(
      new RepositorioIndicadoresDB()
    )
  }


  public async formularios({ request, response }: HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    const encuestas = await this.service.visualizar(request.all(), payload)
    return encuestas   
  }


  public async respuestas({ request, response }: HttpContextContract) {
    /*   response.status(200).send({
      mensaje: "Formulario guardado correctamente"
    })  */
    const payload = await request.obtenerPayloadJWT()
    const respuesta = await this.service.guardar(JSON.stringify(request.all()), payload)

    response.status(200).send(respuesta)
  }

  public async enviar({ request, response }: HttpContextContract) {
    
    const payload = await request.obtenerPayloadJWT()
    try {
      const enviado = await this.service.enviarSt(request.all(), payload)
      return enviado
      
    } catch (error) {
      return response.status(400).send("Se presento un error en el servidor")
      
    }
    /* if (enviado && !enviado.aprobado) {
    } */
  }

  public async ejecucion({ request, response }: HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    console.log(request.all());
    
    const encuestas = await this.service.ejecucion(request.all(), payload)
    return encuestas   
  }


  public async respuestasEjecucion({ request, response }: HttpContextContract) {
   
    const payload = await request.obtenerPayloadJWT()
    const respuesta = await this.service.guardarEjecucion(JSON.stringify(request.all()), payload)

    response.status(200).send(respuesta)
  }

  public async enviarEjecucion({ request, response }: HttpContextContract) {    
    const payload = await request.obtenerPayloadJWT()
    try {
      const enviado = await this.service.enviarStEjecucion(request.all(), payload)
      return enviado
      
    } catch (error) {
      return response.status(400).send("se presento un error en el servidor")
      
    }
   /*  if (enviado && !enviado.aprobado) {
    } */
  }

}
