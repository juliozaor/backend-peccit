import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { MesPatioModalidad } from 'App/Dominio/Datos/Entidades/MesPatioModalidad';
import { TipoPatioModalidad } from 'App/Dominio/TipoPatioModalidad';
export class TblVehiculosMeses extends BaseModel {
  @column({ columnName: 'vem_id' })
  public id?: number;
  @column({ columnName: 'vem_tipo' })
  public tipo: TipoPatioModalidad; 
  @column({ columnName: 'vem_mes' })
  public mes: number; 
  @column({ columnName: 'vem_estado' })
  public estado: boolean; 
  @column({ columnName: 'vem_mensaje' })
  public mensaje: string;

  obtenerMesPatioModalidad(): MesPatioModalidad{
    return new MesPatioModalidad({
      id: this.id,
      tipo: this.tipo,
      mes: this.mes,
      mensaje: this.mensaje,
      estado: this.estado
    })
  }

  establecerVehiculoMes(mesPatioModalidad: MesPatioModalidad, persistido: boolean = false){
    this.id = mesPatioModalidad.id
    this.tipo = mesPatioModalidad.tipo
    this.mes = mesPatioModalidad.mes
    this.mensaje = mesPatioModalidad.mensaje
    this.estado = mesPatioModalidad.estado
    this.$isPersisted = persistido
  }
}


