import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { TblCiudades } from './Ciudades';
export class TblDepartamentos extends BaseModel {

  @column({ columnName: 'id' }) public id?: number;
  @column({ columnName: 'name' }) public name: string;
  @column({ columnName: 'description' }) public description: string;
  @column({ columnName: 'status' }) public status: boolean;


  @hasMany(() => TblCiudades, {
    localKey: 'id',
    foreignKey: 'departmentId',
  })
  public ciudades: HasMany<typeof TblCiudades>

}
