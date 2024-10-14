import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioEmpresa } from 'App/Dominio/Datos/Servicios/ServicioEmpresa'
import { RepositorioEmpresa } from 'App/Infraestructura/Implementacion/Lucid/RepositorioEmpresa';
import Env from '@ioc:Adonis/Core/Env';
import Mail from '@ioc:Adonis/Addons/Mail'

export default class ControladorEncuesta {
  private service: ServicioEmpresa
  constructor () {
    this.service = new ServicioEmpresa(new RepositorioEmpresa())
  }

  public async listar ({ request, response }:HttpContextContract) {
    const array_empresas = await this.service.listar(request.all())
    return response.status(200).send(array_empresas);
  }


  public async listarpoliza ({ request, response }:HttpContextContract) {
    const array_empresas = await this.service.listarpoliza(request.all())
    return response.status(200).send(array_empresas);
  }

  public async novedadespoliza ({ request, response }:HttpContextContract) {
    const array_empresas = await this.service.novedadespoliza(request.all())
    return response.status(200).send(array_empresas);
  }

  public async amparospoliza ({ request, response }:HttpContextContract) {
    const array_empresas = await this.service.amparospoliza(request.all())
    return response.status(200).send(array_empresas);
  }

  public async responsabilidadpoliza ({ request, response }:HttpContextContract) {
    const array_responsabilidad = await this.service.responsabilidadpoliza(request.all())
    return response.status(200).send(array_responsabilidad);
  }

  public async test ({ request, response }:HttpContextContract) {
    Mail.send(mensaje => {
      mensaje
        .subject('Asunto de prueba')
        .from(Env.get('SMTP_USERNAME'), Env.get('EMAIL_ALIAS'))
        .to('jorgemdiazp@gmail.com')
        .htmlView("app/Dominio/Email/Templates/empresas.edge",
          { 
            clave: 'xxxx', 
            nombre: 'Jorge Diaz', 
            usuario: 'jorgediaz', 
            enviarcredenciales: false,
            textpoliza: 'Debe cargar las polizas en el aplicativo POLIZAS de la superintendencia de transporte',
            textvigia: 'Debe registrarse en el aplicativo VIGIA de la superintendencia de transporte',
            logo: Env.get('LOGO') 
          })
    });
  }
}