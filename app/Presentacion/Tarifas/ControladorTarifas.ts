import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { ServicioTarifas } from "App/Dominio/Datos/Servicios/ServicioTarifas";
import { RepositorioTarifasDB } from "App/Infraestructura/Implementacion/Lucid/RepositorioTarifasDB";
import { validadorCrearTarifa } from "./Validadores/ValidadorCrearTarifa";
import { validadorFiltrosTarifas } from "./Validadores/ValidadorFiltrosTarifas";

export default class ControladorTarifas{
    private servicio: ServicioTarifas

    constructor(){
        this.servicio = new ServicioTarifas(new RepositorioTarifasDB())
    }

    async obtener({request, response}: HttpContextContract){
        const pagina = Number(request.param('pagina'))
        const limite = Number(request.param('limite')) 
        const peticion = await request.validate({ schema: validadorFiltrosTarifas })
        const respuesta = await this.servicio.obtenerTarifas(pagina, limite, peticion)
        response.status(200).send(respuesta)
    }

    async guardar({request, response}: HttpContextContract){
        const peticion = await request.validate({ schema: validadorCrearTarifa })
        const tarifa = await this.servicio.guardarTarifa(peticion)
        response.status(201).send(tarifa)
    }

    async eliminar({ request, response }: HttpContextContract){
        const tarifaId = Number(request.param('tarifaId'))
        await this.servicio.eliminarTarifa(tarifaId)
        response.status(200).send({
            mensaje: 'Tarifa eliminada',
            estado: 200
        })
    }
}