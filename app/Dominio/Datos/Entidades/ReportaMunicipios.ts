import { DateTime } from 'luxon'
export class ReportaMunicipios {
  id?: number
  departamento: number
  municipio: number
  usuario: string
  convenio?: string
  ruta?: string
  documento?: string
  nombreOriginal?: string
  estado?: boolean
}
