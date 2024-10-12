import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { Empresa } from 'App/Dominio/Datos/Entidades/Empresa';
export class TblEmpresas extends BaseModel {

  @column({ columnName: 'emp_id' })
  public id: number;
  @column({ columnName: 'emp_nit' })
  public nit: number;
  @column({ columnName: 'emp_razon_social' })
  public razonSocial: string;
  @column({ columnName: 'emp_tipo_servicio' })
  public tipoServicio: number;
  @column({ columnName: 'emp_original_tipo_servicio' })
  public originalTipoServicio: string;
  @column({ columnName: 'emp_documento_tipo_servicio' })
  public documentoTipoServicio: string;
  @column({ columnName: 'emp_ruta_tipo_servicio' })
  public rutaTipoServicio: string;
  @column({ columnName: 'emp_capacidad_ta' })
  public capacidadTransportadoraA: number;
  @column({ columnName: 'emp_capacidad_tb' })
  public capacidadTransportadoraB: number;
  @column({ columnName: 'emp_capacidad_tc' })
  public capacidadTransportadoraC: number;
  @column({ columnName: 'emp_original_transportadora' })
  public originalTransportadora: string;
  @column({ columnName: 'emp_ruta_transportadora' })
  public rutaTransportadora: string;
  @column({ columnName: 'emp_documento_transportadora' })
  public documentoTransportadora: string;  
  @column({ columnName: 'emp_usuario_id' })
  public usuarioId: string;
  @column({ columnName: 'emp_departamento' })
  public departamento: number; 
  @column({ columnName: 'emp_municipio' })
  public municipio: number; 
  @column({ columnName: 'emp_estado' })
  public estado: boolean;

  @column({ columnName: "emp_original_placa"})
  public emp_original_placa: string;
  @column({ columnName: "emp_ruta_placa"})
  public emp_ruta_placa: string;
  @column({ columnName: "emp_documento_placa"})
  public emp_documento_placa: string;
  @column({ columnName: "correoelectronico"})
  public correoelectronico: string; 
  @column({ columnName: "smo_nombre"})
  public smo_nombre: string;
  @column({ columnName: "poliza"})
  public poliza: boolean;

  public estableceEmpresaConId(empresa: Empresa) {
    this.razonSocial = empresa.razonSocial
    this.tipoServicio = empresa.tipoServicio
    this.originalTipoServicio = empresa.originalTipoServicio
    this.documentoTipoServicio = empresa.documentoTipoServicio
    this.rutaTipoServicio = empresa.rutaTipoServicio
    this.capacidadTransportadoraA = empresa.capacidadTransportadoraA
    this.capacidadTransportadoraB = empresa.capacidadTransportadoraB
    this.capacidadTransportadoraC = empresa.capacidadTransportadoraC
    this.originalTransportadora = empresa.originalTransportadora
    this.rutaTransportadora = empresa.rutaTransportadora
    this.documentoTransportadora = empresa.documentoTransportadora
    this.departamento = empresa.departamento
    this.municipio = empresa.municipio
    this.estado = empresa.estado
  }

  public estableceEmpresa(empresa: Empresa) {
    this.nit = empresa.nit
    this.razonSocial = empresa.razonSocial
    this.tipoServicio = empresa.tipoServicio
    this.originalTipoServicio = empresa.originalTipoServicio
    this.documentoTipoServicio = empresa.documentoTipoServicio
    this.rutaTipoServicio = empresa.rutaTipoServicio
    this.capacidadTransportadoraA = empresa.capacidadTransportadoraA
    this.capacidadTransportadoraB = empresa.capacidadTransportadoraB
    this.capacidadTransportadoraC = empresa.capacidadTransportadoraC
    this.originalTransportadora = empresa.originalTransportadora
    this.rutaTransportadora = empresa.rutaTransportadora
    this.documentoTransportadora = empresa.documentoTransportadora
    this.departamento = empresa.departamento
    this.municipio = empresa.municipio
    this.estado = empresa.estado
    this.usuarioId = empresa.usuarioId
  }



}


