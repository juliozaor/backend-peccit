import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';
import { DetalleAdicional } from '../../../Dominio/Datos/Entidades/DetalleAdicional';
export class TblDetallesAdicionales extends BaseModel {
  @column({ columnName: 'dda_id' }) public id?: number;
  @column({ columnName: 'dda_dato_adicional_id' }) public datoAdicionalId: number;
  @column({ columnName: 'dda_anio_activo_id' }) public anioActivoId: number;
  @column({ columnName: 'dda_reporte_id' }) public reporteId: number;
  @column({ columnName: 'dda_fecha_actualizacion' }) public fechaActualizacion: DateTime;
  @column({ columnName: 'dda_documento' }) public documento?: string;
  @column({ columnName: 'dda_ruta' }) public ruta?: string;
  @column({ columnName: 'dda_nombredoc_original' }) public nombredocOriginal?: string;
  @column({ columnName: 'dda_valor' }) public valor?: string;
  @column({ columnName: 'dda_estado' }) public estado?: boolean;
  @column({ columnName: 'dda_observacion' }) public observacion?: string;



  public establecerDetalleAdicionalDb(detalleAdicional: DetalleAdicional) {
    this.id = detalleAdicional.id
    this.datoAdicionalId = detalleAdicional.datoAdicionalId
    this.estado = detalleAdicional.estado
    this.anioActivoId = detalleAdicional.anioActivoId
    this.reporteId = detalleAdicional.reporteId
    this.fechaActualizacion = detalleAdicional.fechaActualizacion
    this.documento = detalleAdicional.documento
    this.ruta = detalleAdicional.ruta
    this.valor = detalleAdicional.valor
    this.nombredocOriginal = detalleAdicional.nombredocOriginal
    this.observacion = detalleAdicional.observacion
  }

  public estableceDetalleAdicionalConId(detalleAdicional: DetalleAdicional) {
    this.datoAdicionalId = detalleAdicional.datoAdicionalId
    this.estado = detalleAdicional.estado
    this.anioActivoId = detalleAdicional.anioActivoId
    this.reporteId = detalleAdicional.reporteId
    this.fechaActualizacion = detalleAdicional.fechaActualizacion
    this.documento = detalleAdicional.documento
    this.ruta = detalleAdicional.ruta
    this.valor = detalleAdicional.valor
    this.nombredocOriginal = detalleAdicional.nombredocOriginal
    this.observacion = detalleAdicional.observacion
  }


  public obtenerDetalleAdicional(): DetalleAdicional {
    const detalleAdicional = new DetalleAdicional()
    detalleAdicional.datoAdicionalId = this.datoAdicionalId
    detalleAdicional.estado = this.estado
    detalleAdicional.anioActivoId = this.anioActivoId
    detalleAdicional.reporteId = this.reporteId
    detalleAdicional.fechaActualizacion = this.fechaActualizacion
    detalleAdicional.documento = this.documento
    detalleAdicional.ruta = this.ruta
    detalleAdicional.valor = this.valor
    detalleAdicional.nombredocOriginal = this.nombredocOriginal
    detalleAdicional.observacion = this.observacion
    return detalleAdicional
  }



}

