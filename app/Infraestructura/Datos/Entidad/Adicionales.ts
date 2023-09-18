import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { TblSubTipoDatos } from './SubTipoDato';
import TblTiposPregunta from './TiposPregunta';
import { TblDatosAdicionales } from './DatosAdicionales';
export class TblAdicionales extends BaseModel {

  @column({ columnName: 'adi_id' }) public id?: number;
  @column({ columnName: 'adi_nombre' }) public nombre: string;
  @column({ columnName: 'adi_periodo_id' }) public periodoId: number;
  @column({ columnName: 'adi_tiene_observacion' }) public tieneObservacion: boolean;
  @column({ columnName: 'adi_max_observacion' }) public maxObservacion: string;
  @column({ columnName: 'adi_orden' }) public orden: number;
  @column({ columnName: 'adi_tipo' }) public tipo: number;
  @column({ columnName: 'adi_obligatorio' }) public obligatorio?: boolean;
  @column({ columnName: 'adi_tipo_evidencia' }) public tipoEvidencia: string;
  @column({ columnName: 'adi_adjuntable' }) public adjuntable: boolean;
  @column({ columnName: 'adi_adjuntable_obligatorio' }) public adjuntableObligatorio: boolean;
  @column({ columnName: 'adi_tamanio' }) public tamanio?: number;
  @column({ columnName: 'adi_tipo_dato_id' }) public subTipoDatoId: number;
  @column({ columnName: 'adi_tipo_pregunta_id' }) public tipoPreguntaId: number;
  @column({ columnName: 'adi_estado' }) public estado: boolean;
  @column({ columnName: 'adi_formulario_id' }) public formularioId: number;

  @belongsTo(() => TblTiposPregunta, {
    localKey: 'id',
    foreignKey: 'tipoPreguntaId',
  })
  public tipoPregunta: BelongsTo<typeof TblTiposPregunta>

  @belongsTo(() => TblSubTipoDatos, {
    localKey: 'id',
    foreignKey: 'subTipoDatoId',
  })
  public subTipoDato: BelongsTo<typeof TblSubTipoDatos>

  @hasMany(() => TblDatosAdicionales, {
    localKey: 'id',
    foreignKey: 'adicionalId',
  })
  public datosAdicionales: HasMany<typeof TblDatosAdicionales>

}
