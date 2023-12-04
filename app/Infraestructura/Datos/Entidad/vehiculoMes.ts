import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
export class TblVehiculosMeses extends BaseModel {
  @column({ columnName: 'vem_id' })
  public id?: number;
  @column({ columnName: 'vem_tipo' })
  public tipo: number; 
  @column({ columnName: 'vem_mes' })
  public mes: number; 
  @column({ columnName: 'vem_estado' })
  public estado: boolean; 
  @column({ columnName: 'vem_mensaje' })
  public mensaje: string; 
}


