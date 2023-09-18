
import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm';
import { Pregunta } from 'App/Dominio/Datos/Entidades/Pregunta';
import Encuestas from './Encuesta';
import TbClasificacion from './Clasificacion';
import TblTiposPregunta from './TiposPregunta';
import Respuestas from './Respuesta';
import { TblSubTipoDatos } from './SubTipoDato';

export default class Preguntas extends BaseModel {
  public static table = 'preguntas';
  @column({ isPrimary: true, columnName: 'id_pregunta' })
  public id: number

  @column({ columnName: 'pregunta' }) public pregunta: string;
  @column({ columnName: 'estado' }) public estado: number;
  @column({ columnName: 'usuario_creacion' }) public usuarioCreacion: string;
  @column({ columnName: 'fecha_creacion' }) public fechaCreacion: DateTime;
  @column({ columnName: 'id_clasificacion' }) public idClasificacion: number;
  @column({ columnName: 'tipo_evidencia' }) public tipoEvidencia: string;
  @column({ columnName: 'id_encuesta' }) public idEncuesta: number;
  @column({ columnName: 'secuencia' }) public secuencia: string;

  @column({ columnName: 'tipo_pregunta_id' }) public tipoPreguntaId: number;
  @column({ columnName: 'adjuntable' }) public adjuntable: boolean;
  @column({ columnName: 'adjuntable_obligatorio' }) public adjuntableObligatorio: boolean;
  @column({ columnName: 'obligatoria' }) public obligatoria: boolean
  @column({ columnName: 'tiene_observacion' }) public tieneObservacion?: boolean
  @column({ columnName: 'sub_tipo_evidencia_id' }) public subTipoEvidenciaId?: number;
  @column({ columnName: 'tipo' }) public tipo?: number;
  @column({ columnName: 'max_observacion' }) public maxObservacion?: number;
  @column({ columnName: 'orden' }) public orden: number;
  @column({ columnName: 'tamanio' }) public tamanio?: number;
  @column({ columnName: 'padre' }) public padre?: number;
  @column({ columnName: 'respuesta_padre' }) public respuestaPadre?: JSON;

  public establecerPreguntaDb(pregunta: Pregunta) {
    this.id = pregunta.id
    this.pregunta = pregunta.pregunta
    this.estado = pregunta.estado
    this.usuarioCreacion = pregunta.usuarioCreacion
    this.fechaCreacion = pregunta.fechaCreacion
    this.idClasificacion = pregunta.idClasificacion
    this.tipoEvidencia = pregunta.tipoEvidencia
    this.idEncuesta = pregunta.idEncuesta
    this.secuencia = pregunta.secuencia
    this.tipoPreguntaId = pregunta.tipoPreguntaId
    this.adjuntable = pregunta.adjuntable
    this.adjuntableObligatorio = pregunta.adjuntableObligatorio
    this.obligatoria = pregunta.obligatoria
    this.orden = pregunta.orden
    this.tamanio = pregunta.tamanio
    this.subTipoEvidenciaId = pregunta.subTipoEvidenciaId
    this.maxObservacion = pregunta.maxObservacion
    this.tipo = pregunta.tipo
    this.tieneObservacion = pregunta.tieneObservacion
    this.padre = pregunta.padre
    this.respuestaPadre = pregunta.respuestaPadre
  }

  public establecePreguntaConId(pregunta: Pregunta) {
    this.pregunta = pregunta.pregunta
    this.estado = pregunta.estado
    this.usuarioCreacion = pregunta.usuarioCreacion
    this.fechaCreacion = pregunta.fechaCreacion
    this.idClasificacion = pregunta.idClasificacion
    this.tipoEvidencia = pregunta.tipoEvidencia
    this.idEncuesta = pregunta.idEncuesta
    this.secuencia = pregunta.secuencia
    this.tipoPreguntaId = pregunta.tipoPreguntaId
    this.adjuntable = pregunta.adjuntable
    this.adjuntableObligatorio = pregunta.adjuntableObligatorio
    this.obligatoria = pregunta.obligatoria
    this.orden = pregunta.orden
    this.tamanio = pregunta.tamanio
    this.subTipoEvidenciaId = pregunta.subTipoEvidenciaId
    this.maxObservacion = pregunta.maxObservacion
    this.tipo = pregunta.tipo
    this.tieneObservacion = pregunta.tieneObservacion
    this.padre = pregunta.padre
    this.respuestaPadre = pregunta.respuestaPadre
  }

  public obtenerPregunta(): Pregunta {
    const pregunta = new Pregunta()
    pregunta.id = this.id
    pregunta.pregunta = this.pregunta
    pregunta.estado = this.estado
    pregunta.usuarioCreacion = this.usuarioCreacion
    pregunta.fechaCreacion = this.fechaCreacion
    pregunta.idClasificacion = this.idClasificacion
    pregunta.tipoEvidencia = this.tipoEvidencia
    pregunta.idEncuesta = this.idEncuesta
    pregunta.secuencia = this.secuencia
    pregunta.tipoPreguntaId = this.tipoPreguntaId 
    pregunta.adjuntable = this.adjuntable 
    pregunta.adjuntableObligatorio = this.adjuntableObligatorio 
    pregunta.obligatoria = this.obligatoria 
    pregunta.orden = this.orden 
    pregunta.tamanio = this.tamanio 
    pregunta.subTipoEvidenciaId = this.subTipoEvidenciaId 
    pregunta.maxObservacion = this.maxObservacion 
    pregunta.tipo = this.tipo 
    pregunta.tieneObservacion = this.tieneObservacion 
    pregunta.padre = this.padre 
    pregunta.respuestaPadre = this.respuestaPadre 
    return pregunta
  }



  @belongsTo(() => Encuestas, {
    localKey: 'id',
    foreignKey: 'idEncuesta',
  })
  public encuesta: BelongsTo<typeof Encuestas>

  @belongsTo(() => TbClasificacion, {
    localKey: 'id',
    foreignKey: 'idClasificacion',
  })
  public clasificacion: BelongsTo<typeof TbClasificacion>

  @belongsTo(() => TblTiposPregunta, {
    localKey: 'id',
    foreignKey: 'tipoPreguntaId',
  })
  public tiposPregunta: BelongsTo<typeof TblTiposPregunta>

  
  @hasMany(() => Respuestas, {
    localKey: 'id',
    foreignKey: 'idPregunta',
  })
  public respuesta: HasMany<typeof Respuestas>

  @belongsTo(() => TblSubTipoDatos, {
    localKey: 'id',
    foreignKey: 'subTipoEvidenciaId',
  })
  public subTiposdatos: BelongsTo<typeof TblSubTipoDatos>

}
