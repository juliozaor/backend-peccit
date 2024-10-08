import { ServicioMesPatioModalidad } from "App/Dominio/Datos/Servicios/ServicioMesPatioModalidad";
import { RepositorioMesPatioModalidadDB } from "App/Infraestructura/Implementacion/Lucid/RepositorioMesPatioModalidadDB";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { ValidadorActualizarMesPatioModalidad } from "./Validadores/ValidadorActualizarMesPatioModalidad";
import { Respuesta } from "../Compartido/Respuesta";
import { TipoPatioModalidad } from "App/Dominio/TipoPatioModalidad";

export default class ControladorPatioModalidad{
    private servicio: ServicioMesPatioModalidad

    constructor(){
        this.servicio = new ServicioMesPatioModalidad( new RepositorioMesPatioModalidadDB())
    }

    async filtrar({ request, response }: HttpContextContract){
        let qTipo = request.qs()['tipo']
        if(!qTipo){
            const respuesta = new Respuesta({ 
                estado: 400, 
                mensaje: 'Debe envíar un tipo (modalidad (2) o patio (1))' 
            })
            return response.status(respuesta.estado).send(respuesta)
        }
        if(Number(qTipo) !== 1 && Number(qTipo) !== 2){
            const respuesta = new Respuesta({
                estado: 400,
                mensaje: 'Tipo inválido.'
            })
            return response.status(respuesta.estado).send(respuesta)
        }
        const tipo = Number(qTipo) === 1 ? TipoPatioModalidad.PATIOS : TipoPatioModalidad.MODALIDADES
        const mesesPatioModalidad = await this.servicio.filtrar({ tipo })
        response.status(200).send(mesesPatioModalidad)
    }

    async actualizar({ request, response }: HttpContextContract){
        const id = Number(request.param('id'))
        const peticion = await request.validate({ schema: ValidadorActualizarMesPatioModalidad })
        const respuesta = await this.servicio.actualizar(id, peticion)
        response.status(respuesta.estado).send(respuesta.datos)
    }
}