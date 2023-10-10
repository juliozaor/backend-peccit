import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { Patio } from 'App/Dominio/Datos/Entidades/Patio';
export class TblPatios extends BaseModel {
  @column({ columnName: 'pat_id' })
  public id?: number;
  @column({ columnName: 'pat_nombre' })
  public nombre: string;
  @column({ columnName: 'pat_departamento' })
  public departamento: string;
  @column({ columnName: 'pat_municipio' })
  public municipio: string;
  @column({ columnName: 'pat_direccion' })
  public direccion: string;
  @column({ columnName: 'pat_encargado' })
  public encargado: string;
  @column({ columnName: 'pat_telefono' })
  public telefono: string;
  @column({ columnName: 'pat_correo' })
  public correo: string;
  @column({ columnName: 'pat_estado' })
  public estado: boolean;
  @column({ columnName: 'pat_usuario_id' })
  public usuarioId: string;

  public establecePatioConId(patio: Patio) {
    this.nombre = patio.nombre
    this.departamento = patio.departamento
    this.municipio = patio.municipio
    this.direccion = patio.direccion
    this.encargado = patio.encargado
    this.telefono = patio.telefono
    this.correo = patio.correo
    this.estado = patio.estado
  }

  public establecePatio(patio: Patio) {
    this.id = patio.id
    this.nombre = patio.nombre
    this.departamento = patio.departamento
    this.municipio = patio.municipio
    this.direccion = patio.direccion
    this.encargado = patio.encargado
    this.telefono = patio.telefono
    this.correo = patio.correo
    this.estado = patio.estado
    this.usuarioId = patio.usuarioId
  }



}


