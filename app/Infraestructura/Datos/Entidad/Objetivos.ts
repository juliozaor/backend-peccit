import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
export class TblObjetivos extends BaseModel {
  @column({ columnName: 'obj_id' })
  public id?: number;
  @column({ columnName: 'obj_nombre' })
  public nombre: string; 
  @column({ columnName: 'obj_usuario_id' })
  public usuarioId: string; 
  @column({ columnName: 'obj_vigencia' })
  public vigencia: string; 
  @column({ columnName: 'obj_estado' })
  public estado: boolean; 
}


