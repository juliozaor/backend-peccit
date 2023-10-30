import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { ReportaMunicipios } from 'App/Dominio/Datos/Entidades/ReportaMunicipios'
import { DateTime } from 'luxon'

export class TblReportaMunicipios extends BaseModel {
    @column({ columnName: 'tar_id', isPrimary: true })
    id?: number
    @column({ columnName: 'rmu_departamento', isPrimary: true })
    departamento: number
    @column({ columnName: 'rmu_municipio', isPrimary: true })
    municipio: number
    @column({ columnName: 'rmu_usuario', isPrimary: true })
    usuario: string
    @column({ columnName: 'rmu_convenio', isPrimary: true })
    convenio?: string
    @column({ columnName: 'rmu_ruta', isPrimary: true })
    ruta?: string
    @column({ columnName: 'rmu_documento', isPrimary: true })
    documento?: string
    @column({ columnName: 'rmu_nombre_original', isPrimary: true })
    nombreOriginal?: string
    @column({ columnName: 'rmu_estado', isPrimary: true })
    estado?: boolean

    public obtenerReportaMunicipios(): ReportaMunicipios {
        const reportaMunicipios = new ReportaMunicipios()
         reportaMunicipios.id = this.id
         reportaMunicipios.departamento = this.departamento
         reportaMunicipios.municipio = this.municipio
         reportaMunicipios.usuario = this.usuario
         reportaMunicipios.convenio = this.convenio
         reportaMunicipios.ruta = this.ruta
         reportaMunicipios.documento = this.documento
         reportaMunicipios.nombreOriginal = this.nombreOriginal
         reportaMunicipios.estado = this.estado
        return reportaMunicipios
    }



    establecerMunicipios(reportaMunicipios: ReportaMunicipios): void {
        this.departamento = reportaMunicipios.departamento
        this.municipio = reportaMunicipios.municipio
        this.usuario = reportaMunicipios.usuario
        this.convenio = reportaMunicipios.convenio
        this.ruta = reportaMunicipios.ruta
        this.documento = reportaMunicipios.documento
        this.nombreOriginal = reportaMunicipios.nombreOriginal

    }
}


