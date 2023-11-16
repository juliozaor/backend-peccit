/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioIndicadores } from 'App/Dominio/Datos/Servicios/ServicioIndicadores'
import { ServicioImportarVehiculos } from 'App/Dominio/Datos/Servicios/ServicioImportarVehiculos'
import { RepositorioIndicadoresDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioIndicadoresDB'
import fs from 'fs';
const path = require('path');
/* import { ServicioRespuestas } from 'App/Dominio/Datos/Servicios/ServicioRespuestas'
import { RepositorioRespuestasDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioRespuestasDB' */

export default class ControladorReporte {
  private service: ServicioIndicadores;
  private servicioImportacionVehiculos
  constructor() {
    this.service = new ServicioIndicadores(
      new RepositorioIndicadoresDB()
    );
    this.servicioImportacionVehiculos = new ServicioImportarVehiculos()

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
    const enviado = await this.service.enviarSt(request.all(), payload)
    if (enviado && !enviado.aprobado) {
      return response.status(400).send(enviado)
    }
    return enviado
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
    const enviado = await this.service.enviarStEjecucion(request.all(), payload)
    if (enviado && !enviado.aprobado) {
      return response.status(400).send(enviado)
    }
    return enviado
  }

  public async patios({ request, response }: HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    const encuestas = await this.service.patios(request.all(), payload)
    return encuestas
  }

  public async empresas({ request, response }: HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    const encuestas = await this.service.empresas(request.all(), payload)
    return encuestas
  }

  public async importar({ request, response }: HttpContextContract) {
    const { tipo, idVigilado } = request.all() //1:patios, 2:empresas
    const archivo = request.file('archivo', {
      extnames: ['xlsx', 'xls'],
    })
    if (!archivo) {
      return response.status(400).send({ mensaje: 'No se encontro archivo' })
    }

    if (!archivo.isValid) {
      return response.status(415).send({ mensaje: `Formato inválido: no se puede cargar el archivo seleccionado. Inténtalo nuevamnte` })
    }
    try {
      const respuesta = await this.servicioImportacionVehiculos.importDataXLSX(tipo, archivo, idVigilado)
      return response.status(200).send(respuesta)

    } catch (error) {
      return response.status(400).send({ mensaje: 'Se presento un error al cargar el archivo' })
    }

  }

  

  async obtener({ params }: HttpContextContract){    
    const {archivo} = params
    
    const relativePath = 'uploads/plantillas/'; 

    if(archivo){
      try {
          const absolutePath = path.resolve(`${relativePath}${archivo}`);
          console.log(absolutePath);
          
  
          let archivoDescargar = fs.readFileSync(`${absolutePath}`, 'base64');          
          return { archivoDescargar }
      } catch (error) {
          return {
              mensaje: `No se encontro el archivo solicitado`,
              error
          }
  
      }

    }


}

}
