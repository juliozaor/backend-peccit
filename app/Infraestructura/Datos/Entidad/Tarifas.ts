import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { Tarifa } from 'App/Dominio/Datos/Entidades/Tarifa'
import { DateTime } from 'luxon'

export class TblTarifas extends BaseModel {
    @column({ columnName: 'tar_id', isPrimary: true })
    id?: number
    @column({ columnName: 'tar_id_servicio_modalidad' })
    idServicioModalidad: number
    @column({ columnName: 'tar_id_vigilado' })
    idVigilado: string
    @column({ columnName: 'tar_vigencia' })
    vigencia: number
    @column({ columnName: 'tar_tarifa_autorizada' })
    tarifaAutorizada: number
    @column({ columnName: 'tar_acto_administrativo_documento' })
    actoAdministrativoDocumento: string
    @column({ columnName: 'tar_acto_administrativo_ruta' })
    actoAdministrativoRuta: string
    @column({ columnName: 'tar_acto_administrativo_original' })
    actoAdministrativoOriginal: string
    @column({ columnName: 'tar_estructura_costos_documento' })
    estructuraCostosDocumento: string
    @column({ columnName: 'tar_estructura_costos_ruta' })
    estructuraCostosRuta: string
    @column({ columnName: 'tar_estructura_costos_original' })
    estructuraCostosOriginal: string
    @column.dateTime({ columnName: 'tar_creado', autoCreate: true })
    creado: DateTime
    @column.dateTime({ columnName: 'tar_actualizado', autoUpdate: true })
    actualizado: DateTime

    obtenerTarifa(): Tarifa {
        return new Tarifa({
            id: this.id,
            actoAdministrativoDocumento: this.actoAdministrativoDocumento,
            actoAdministrativoOriginal: this.actoAdministrativoOriginal,
            actoAdministrativoRuta: this.actoAdministrativoRuta,
            estructuraCostosDocumento: this.estructuraCostosDocumento,
            estructuraCostosOriginal: this.estructuraCostosOriginal,
            estructuraCostosRuta: this.estructuraCostosRuta,
            idServicioModalidad: this.idServicioModalidad,
            tarifaAutorizada: this.tarifaAutorizada,
            vigencia: this.vigencia,
            actualizado: this.actualizado,
            creado: this.creado,
            idVigilado: this.idVigilado
        })
    }

    establecerTarifa(tarifa: Tarifa, existente: boolean = false): void {
        this.id = tarifa.id
        this.idVigilado = tarifa.idVigilado
        this.actoAdministrativoDocumento = tarifa.actoAdministrativoDocumento
        this.actoAdministrativoOriginal = tarifa.actoAdministrativoOriginal
        this.actoAdministrativoRuta = tarifa.actoAdministrativoRuta
        this.estructuraCostosDocumento = tarifa.estructuraCostosDocumento
        this.estructuraCostosOriginal = tarifa.estructuraCostosOriginal
        this.estructuraCostosRuta = tarifa.estructuraCostosRuta
        this.idServicioModalidad = tarifa.idServicioModalidad
        this.tarifaAutorizada = tarifa.tarifaAutorizada
        this.vigencia = tarifa.vigencia
        this.actualizado = tarifa.actualizado
        this.creado = tarifa.creado
        this.$isPersisted = existente
    }
}


