import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
export class TblSedesOperativas extends BaseModel {
  @column({ columnName: 'seo_id' })
  public id?: number;
  @column({ columnName: 'seo_usuario_id' })
  public usuarioId: string; 
  @column({ columnName: 'seo_nombre' })
  public nombre: string; 
  @column({ columnName: 'seo_departamento' })
  public departamento: string; 
  @column({ columnName: 'seo_municipio' })
  public municipio: string; 
  @column({ columnName: 'seo_estado' })
  public estado: boolean; 
}


