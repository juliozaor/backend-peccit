import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { Sede } from 'App/Dominio/Datos/Entidades/Sede';
export class TblSedesOperativas extends BaseModel {
  @column({ columnName: 'seo_id' })
  public id?: number;
  @column({ columnName: 'seo_usuario_id' })
  public usuarioId: string; 
  @column({ columnName: 'seo_nombre' })
  public nombre: string; 
  @column({ columnName: 'seo_departamento' })
  public departamento: number; 
  @column({ columnName: 'seo_municipio' })
  public municipio: number; 
  @column({ columnName: 'seo_estado' })
  public estado: boolean; 
  @column({ columnName: 'seo_encargado' })
  public encargado: string;
  @column({ columnName: 'seo_telefono' })
  public telefono: string;
  @column({ columnName: 'seo_correo' })
  public correo: string;

  public estableceSedeConId (sede: Sede) {
    this.nombre = sede.nombre
    this.usuarioId = sede.usuarioId
    this.departamento = sede.departamento
    this.municipio = sede.municipio
    this.encargado = sede.encargado
    this.telefono = sede.telefono
    this.correo = sede.correo
  }


}


