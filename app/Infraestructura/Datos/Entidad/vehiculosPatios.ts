import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { VehiculoPatio } from 'App/Dominio/Datos/Entidades/VehiculoPatio';
export class TblVehiculosPatios extends BaseModel {
  @column({ columnName: 'veh_id' })
  public id?: number;
  @column({ columnName: 'veh_placa' })
  public placa: string;
  @column({ columnName: 'veh_ingreso' })
  public ingreso: Date;
  @column({ columnName: 'veh_vigilado' })
  public vigilado: string;
  @column({ columnName: 'veh_patio_id' })
  public patioId: string;
  @column({ columnName: 'veh_vigencia' })
  public vigencia: number;
  @column({ columnName: 'veh_mes' })
  public mes: number;


  public estableceVehiculoConId(vehiculo: VehiculoPatio) {
    this.placa = vehiculo.placa
    this.ingreso = vehiculo.ingreso
    this.vigilado = vehiculo.vigilado
    this.patioId = vehiculo.patioId
    this.vigencia = vehiculo.vigencia
    this.mes = vehiculo.mes
  }

  public estableceVehiculo(vehiculo: VehiculoPatio) {
   this.id = vehiculo.id
   this.placa = vehiculo.placa
   this.ingreso = vehiculo.ingreso
  }



}


