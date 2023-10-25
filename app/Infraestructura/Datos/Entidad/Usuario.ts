import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, HasMany, HasOne, ManyToMany, belongsTo, column, hasMany, hasOne, manyToMany } from '@ioc:Adonis/Lucid/Orm';
import { Usuario } from 'App/Dominio/Datos/Entidades/Usuario';
import TblRoles from './Autorizacion/Rol';
import TblClasificaciones from './Clasificaciones';
import TblEncuestas from 'App/Infraestructura/Datos/Entidad/Encuesta';
import TblEstadoVigilado from './EstadoVigilado';
import { TblObjetivos } from './Objetivos';
import { TblSedesOperativas } from './SedesOperativas';
import { TblPatios } from './Patios';
import { TblEmpresas } from './Empresas';
import { TblDepartamentos } from './Departamentos';
import { TblCiudades } from './Ciudades';

export default class TblUsuarios extends BaseModel {
  @column({ isPrimary: true, columnName: 'usn_id' })
  public id: string

  @column({ columnName: 'usn_nombre' }) public nombre: string

  @column({ columnName: 'usn_identificacion' }) public identificacion: string

  @column({ columnName: 'usn_usuario' }) public usuario: string

  @column({ columnName: 'usn_clave' }) public clave: string

  @column({ columnName: 'usn_estado' }) public estado: boolean

  @column({ columnName: 'usn_clave_temporal' }) public claveTemporal: boolean

  @column({ columnName: 'usn_telefono' }) public telefono: string

  @column({ columnName: 'usn_correo' }) public correo: string

  @column({ columnName: 'usn_fechaNacimiento' }) public fechaNacimiento: DateTime

  @column({ columnName: 'usn_cargo' }) public cargo: string

  @column({ columnName: 'usn_apellido' }) public apellido: string

  @column({ columnName: 'usn_rol_id' }) public idRol: string

  @column({ columnName: 'departamento_id' }) public departamentoId?: number

  @column({ columnName: 'municipio_id' }) public municipioId?: number

  @column({ columnName: 'es_departamental' }) public esDepartamental?: number

  @column({ columnName: 'modal' }) public abrirModal?: boolean

  @column({ columnName: 'reporta_otro_municipio' }) public reportaOtroMunicipio?: boolean

  @column.dateTime({ autoCreate: true, columnName: 'usn_creacion' }) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'usn_actualizacion' }) public updatedAt: DateTime

  public establecerUsuarioDb(usuario: Usuario) {
    this.id = usuario.id
    this.nombre = usuario.nombre
    this.usuario = usuario.usuario
    this.clave = usuario.clave
    this.claveTemporal = usuario.claveTemporal
    this.telefono = usuario.telefono
    this.correo = usuario.correo
    this.fechaNacimiento = usuario.fechaNacimiento
    this.cargo = usuario.cargo
    this.apellido = usuario.apellido
    this.identificacion = usuario.identificacion
    this.estado = usuario.estado
    this.idRol = usuario.idRol
    this.departamentoId = usuario.departamentoId
    this.municipioId = usuario.municipioId
    this.esDepartamental = usuario.esDepartamental
    this.abrirModal = usuario.abrirModal
    this.reportaOtroMunicipio = usuario.reportaOtroMunicipio
  }

  public estableceUsuarioConId(usuario: Usuario) {
    this.nombre = usuario.nombre
    this.usuario = usuario.usuario
    this.clave = usuario.clave
    this.claveTemporal = usuario.claveTemporal
    this.telefono = usuario.telefono
    this.correo = usuario.correo
    this.fechaNacimiento = usuario.fechaNacimiento
    this.cargo = usuario.cargo
    this.apellido = usuario.apellido
    this.identificacion = usuario.identificacion
    this.estado = usuario.estado
    this.idRol = usuario.idRol
    this.departamentoId = usuario.departamentoId
    this.municipioId = usuario.municipioId
    this.esDepartamental = usuario.esDepartamental
    this.abrirModal = usuario.abrirModal
    this.reportaOtroMunicipio = usuario.reportaOtroMunicipio
  }

  public actualizarRespuesta(respuesta: boolean) {    
    this.reportaOtroMunicipio = respuesta
    this.abrirModal = false
  }

  public obtenerUsuario(): Usuario {
    const usuario = new Usuario()
    usuario.id = this.id
    usuario.nombre = this.nombre
    usuario.usuario = this.usuario
    usuario.clave = this.clave
    usuario.estado = this.estado
    usuario.apellido = this.apellido
    usuario.cargo = this.cargo
    usuario.identificacion = this.identificacion
    usuario.claveTemporal = this.claveTemporal
    usuario.correo = this.correo
    usuario.fechaNacimiento = this.fechaNacimiento
    usuario.telefono = this.telefono
    usuario.idRol = this.idRol
    usuario.departamentoId = this.departamentoId 
    usuario.municipioId = this.municipioId 
    usuario.esDepartamental = this.esDepartamental 
    usuario.abrirModal = this.abrirModal 
    usuario.reportaOtroMunicipio = this.reportaOtroMunicipio 

    return usuario
  }

  @belongsTo(() => TblRoles, {
    localKey: 'id',
    foreignKey: 'idRol',
  })
  public rol: BelongsTo<typeof TblRoles>


  @manyToMany(() => TblClasificaciones, {
    localKey: 'id',
    pivotForeignKey: 'clu_usuario_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'clu_clasificacion_id',
    pivotColumns: ['clu_vehiculos', 'clu_conductores'],
    pivotTable: 'tbl_clasificacion_usuarios'
  })
  public clasificacionUsuario: ManyToMany<typeof TblClasificaciones>

  @manyToMany(() => TblEncuestas, {
    localKey: 'identificacion',
    pivotForeignKey: 'use_nitVigilado',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'use_idEncuesta',
    pivotColumns: ['use_creacion', 'use_estado_vigilado_id'],
    pivotTable: 'tbl_usuarios_encuestas'
  })
  public usuarioEncuesta: ManyToMany<typeof TblEncuestas>


  @manyToMany(() => TblEstadoVigilado, {
    localKey: 'identificacion',
    pivotForeignKey: 'use_nitVigilado',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'use_estado_vigilado_id',
    //pivotColumns: ['use_estado_vigilado_id'],
    pivotTable: 'tbl_usuarios_encuestas'
  })
  public usuarioEstadoVigilado: ManyToMany<typeof TblEstadoVigilado>

  @hasMany(() => TblObjetivos, {
    localKey: 'identificacion',
    foreignKey: 'usuarioId'
  })
  public objetivos: HasMany<typeof TblObjetivos>

  @hasMany(() => TblSedesOperativas, {
    localKey: 'identificacion',
    foreignKey: 'usuarioId'
  })
  public sedesOperativas: HasMany<typeof TblSedesOperativas>

  @hasMany(() => TblPatios, {
    localKey: 'identificacion',
    foreignKey: 'usuarioId'
  })
  public patios: HasMany<typeof TblPatios>

  @hasMany(() => TblEmpresas, {
    localKey: 'identificacion',
    foreignKey: 'usuarioId'
  })
  public empresas: HasMany<typeof TblEmpresas>

  @belongsTo(() => TblDepartamentos, {
    localKey: 'id',
    foreignKey: 'departamentoId',
  })
  public departamentos: BelongsTo<typeof TblDepartamentos>


  @belongsTo(() => TblCiudades, {
    localKey: 'id',
    foreignKey: 'municipioId'
  })
  public ciudades: BelongsTo<typeof TblCiudades>

}
