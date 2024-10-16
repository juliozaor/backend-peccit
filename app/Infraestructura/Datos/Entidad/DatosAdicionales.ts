import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { TblDetallesAdicionales } from './DetalleAdicionales';
export class TblDatosAdicionales extends BaseModel {

  @column({ columnName: 'dad_id' }) public id?: number;
  @column({ columnName: 'dad_nombre' }) public nombre: string;
  @column({ columnName: 'dad_adicional_id' }) public adicionalId: number;
  @column({ columnName: 'dad_orden' }) public orden: number;
  @column({ columnName: 'dad_visible' }) public visible: boolean;
  @column({ columnName: 'dad_meses' }) public meses: string;
  @column({ columnName: 'dad_estado' }) public estado: boolean;



  @hasMany(() => TblDetallesAdicionales, {
    localKey: 'id',
    foreignKey: 'datoAdicionalId',
  })
  public detalleAdicional: HasMany<typeof TblDetallesAdicionales>
}
