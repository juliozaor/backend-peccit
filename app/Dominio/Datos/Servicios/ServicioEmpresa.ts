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
            const apiResponse = await axios.get(Env.get('URL_POLIZAS')+'/poliza/usuario', {
                params: {
                  documento: nit, // Parámetro del documento en la URL
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
    
    public async listarpoliza(query: any) {
        try
        {
            const apiResponse = await axios.get(Env.get('URL_POLIZAS')+'/poliza/filtrarPolizas', {
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

}