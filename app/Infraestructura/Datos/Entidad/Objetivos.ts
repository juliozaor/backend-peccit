import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { Objetivo } from 'App/Dominio/Datos/Entidades/objetivo';
export class TblObjetivos extends BaseModel {
  @column({ columnName: 'obj_id' })
  public id?: number;
  @column({ columnName: 'obj_nombre' })
  public nombre: string; 
  @column({ columnName: 'obj_usuario_id' })
  public usuarioId: string; 
  @column({ columnName: 'obj_vigencia' })
  public vigencia: number; 
  @column({ columnName: 'obj_estado' })
  public estado: boolean; 

  public estableceObjetivoConId (objetivo: Objetivo) {
    this.nombre = objetivo.nombre
    this.usuarioId = objetivo.usuarioId
    this.vigencia = objetivo.vigencia
  }
}



