import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
export class TblServiciosModalidades extends BaseModel {
  static readonly table = "tbl_servicios_modalidades"
  @column({ columnName: 'smo_id' })
  public id: number;
  @column({ columnName: 'smo_nombre' })
  public nombre: string; 
  @column({ columnName: 'smo_estado' })
  public estado: boolean; 
}


