import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { VehiculoModalidad } from 'App/Dominio/Datos/Entidades/VehiculoModalidad';
export class TblVehiculosModalidades extends BaseModel {
  @column({ columnName: 'vep_id' })
  public id?: number;
  @column({ columnName: 'vep_nit' })
  public nit: string;
  @column({ columnName: 'vep_placa' })
  public placa: string;
  @column({ columnName: 'vep_vigilado' })
  public vigilado: string;
  @column({ columnName: 'vep_modalidad_id' })
  public modalidadId: string;
  @column({ columnName: 'vep_vigencia' })
  public vigencia: number;
  @column({ columnName: 'vep_mes' })
  public mes: number;

  public estableceVehiculoConId(vehiculo: VehiculoModalidad) {
    this.nit = vehiculo.nit
    this.placa = vehiculo.placa
    this.vigilado = vehiculo.vigilado
    this.modalidadId = vehiculo.modalidadId
    this.vigencia = vehiculo.vigencia
    this.mes = vehiculo.mes
  }

  public estableceVehiculo(vehiculo: VehiculoModalidad) {
   this.id = vehiculo.id
   this.placa = vehiculo.placa
  }



}


