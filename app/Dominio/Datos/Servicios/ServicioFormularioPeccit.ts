
import { Paginador } from "App/Dominio/Paginador";
import { RepositorioEncuesta } from 'App/Dominio/Repositorios/RepositorioEncuesta'
import { Reportadas } from "App/Dominio/Dto/Encuestas/Reportadas";
import { ServicioUsuario } from "./ServicioUsuario";
import { PayloadJWT } from "App/Dominio/Dto/PayloadJWT";

export class ServicioFormularioPeccit {
  constructor (private repositorio: RepositorioEncuesta, private servicioUsuarios: ServicioUsuario) { }
  
 
  async visualizar(params: any, payload:PayloadJWT): Promise<any> {
    params.idUsuario = payload.documento;
    params.idRol = payload.idRol;
    return this.repositorio.visualizar(params);
  }


}
