import { RepositorioEmpresaInterface } from 'app/Dominio/Repositorios/RepositorioEmpresaInterface';
import axios from 'axios'; 
import Env from '@ioc:Adonis/Core/Env';

export class ServicioEmpresa {
    constructor (private repositorio: RepositorioEmpresaInterface) { }

    public async listar(query: any) {
        try {
            let array_empresas = await this.repositorio.listar(query);

            // Usamos un bucle for...of para iterar sobre las empresas
            for (const empresa of array_empresas) {
                const output_poliza = await this.validarPoliza(empresa.emp_nit);
    
                // Verificar si la póliza es válida o no
                empresa.poliza = output_poliza.out.code !== "ERR_BAD_REQUEST";
            }
    
            return array_empresas;
        } catch (error) {
            throw new Error(`Error al listar empresas: ${error.message}`);
        }
    }

    public async validarPoliza(nit:string)
    {
        try
        {
            const apiResponse = await axios.get(Env.get('URL_POLIZAS')+'/api/v1/poliza/usuario/'+nit, {
                headers: {
                  Authorization: 'Bearer 2c9b417a-75af-46c5-8ca0-340d3acdb3c7', // Token Bearer
                  'Content-Type': 'application/json',
                },
              });
    
            return {
                out: apiResponse.data,
                status: 200,
                msn: 'Consulta exitosa en Polizas'
            };
        } 
        catch (error)
        {
            return {
                out: error,
                status: 500,
                msn: 'Error al consulta Polizas'
            };
        }
    }
    
    public async listarpoliza(query: any) {
        try
        {
            const apiResponse = await axios.get(Env.get('URL_POLIZAS')+'/filtrarPolizas', {
                params: {
                    usn_identificacion: query.usn_identificacion, // Parámetro del documento en la URL
                    pol_numero: query.pol_numero,
                    limit: query.limit,
                    page:query.page
                },
                headers: {
                  Authorization: 'Bearer 2c9b417a-75af-46c5-8ca0-340d3acdb3c7', // Token Bearer
                  'Content-Type': 'application/json',
                },
              });
    
            return {
                out: apiResponse.data,
                status: 200,
                msn: 'Consulta exitosa en Polizas'
            };
        } 
        catch (error)
        {
            return {
                out: error,
                status: 500,
                msn: 'Error al consulta Polizas'
            };
        }
    }

    public async novedadespoliza(query: any) {
        try
        {
            const apiResponse = await axios.get(Env.get('URL_POLIZAS')+'/novedades_polizapeccit', {
                params: {
                    poliza: query.poliza,
                    tipoPoliza: query.tipoPoliza,
                    page: query.page,
                    numero_items:query.numero_items
                },
                headers: {
                  Authorization: 'Bearer 2c9b417a-75af-46c5-8ca0-340d3acdb3c7', // Token Bearer
                  'Content-Type': 'application/json',
                },
              });
    
            return {
                out: apiResponse.data,
                status: 200,
                msn: 'Consulta exitosa en novedades'
            };
        } 
        catch (error)
        {
            return {
                out: error,
                status: 500,
                msn: 'Error al consulta novedades'
            };
        }
    }

    public async amparospoliza(query: any) {
        try
        {
            const apiResponse = await axios.get(Env.get('URL_POLIZAS')+'/listaramparo', {
                params: {
                    poliza_id: query.poliza_id,
                    page: query.page,
                    numero_items:query.numero_items
                },
                headers: {
                  Authorization: 'Bearer 2c9b417a-75af-46c5-8ca0-340d3acdb3c7', // Token Bearer
                  'Content-Type': 'application/json',
                },
              });
    
            return {
                out: apiResponse.data,
                status: 200,
                msn: 'Consulta exitosa en novedades'
            };
        } 
        catch (error)
        {
            return {
                out: error,
                status: 500,
                msn: 'Error al consulta novedades'
            };
        }
    }

    public async responsabilidadpoliza(query: any) {
        try
        {
            const apiResponse = await axios.get(Env.get('URL_POLIZAS')+'/consultarresponsabilidad', {
                params: {
                    poliza_id: query.poliza_id
                },
                headers: {
                  Authorization: 'Bearer 2c9b417a-75af-46c5-8ca0-340d3acdb3c7', // Token Bearer
                  'Content-Type': 'application/json',
                },
              });
    
            return {
                out: apiResponse.data,
                status: 200,
                msn: 'Consulta exitosa en responsabilidad'
            };
        } 
        catch (error)
        {
            return {
                out: error,
                status: 500,
                msn: 'Error al consulta responsabilidad'
            };
        }
    }
}