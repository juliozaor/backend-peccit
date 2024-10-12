import { RepositorioEmpresaInterface } from 'app/Dominio/Repositorios/RepositorioEmpresaInterface';
import {TblEmpresas} from 'App/Infraestructura/Datos/Entidad/Empresas';

export class RepositorioEmpresa implements RepositorioEmpresaInterface 
{
    async listar(obj_filter: any) {

        try {
            let query = TblEmpresas.query();
    
            query.leftJoin('tbl_servicios_modalidades',  'tbl_empresas.emp_tipo_servicio', 'tbl_servicios_modalidades.smo_id');
    
            if (obj_filter.find && obj_filter.find.trim().length > 0)
            {
                if (!isNaN(obj_filter.find))
                {
                    query.where('tbl_empresas.emp_nit', 'ILIKE', `%${obj_filter.find}%`);
                }
                else
                {
                    query.where('tbl_empresas.emp_razon_social', 'ILIKE', `%${obj_filter.find}%`);
                    query.orWhere('tbl_servicios_modalidades.smo_nombre', 'ILIKE', `%${obj_filter.find}%`);
                }
            }
    
            query.select("tbl_empresas.emp_nit",
                        "tbl_empresas.emp_razon_social",
                        "tbl_empresas.emp_tipo_servicio",
                        "tbl_servicios_modalidades.smo_nombre",
                        "tbl_empresas.emp_original_tipo_servicio",
                        "tbl_empresas.emp_documento_tipo_servicio",
                        "tbl_empresas.emp_ruta_tipo_servicio",
                        "tbl_empresas.emp_capacidad_ta",
                        "tbl_empresas.emp_capacidad_tb",
                        "tbl_empresas.emp_capacidad_tc",
                        "tbl_empresas.emp_original_transportadora",
                        "tbl_empresas.emp_ruta_transportadora",
                        "tbl_empresas.emp_documento_transportadora",
                        "tbl_empresas.emp_original_placa",
                        "tbl_empresas.emp_ruta_placa",
                        "tbl_empresas.emp_documento_placa",
                        "tbl_empresas.emp_estado",
                        "tbl_empresas.emp_usuario_id",
                        "tbl_empresas.emp_departamento",
                        "tbl_empresas.emp_municipio",
                        "tbl_empresas.correoelectronico"
                        );
    
            const array_tipoidentifacion = await query.paginate(obj_filter.page, obj_filter.numero_items);
    
            return array_tipoidentifacion;
        } 
        catch (error) {
            return { message: 'Error al listar empresas', error };
        }
    }
    
}
