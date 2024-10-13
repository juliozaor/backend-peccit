import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Empresa/ControladorEmpresa'

Route.group(() => {
  Route.get('/listarempresas', accion_path + '.listar')
  Route.get('/listarpoliza', accion_path + '.listarpoliza')
  Route.get('/novedades_poliza', accion_path + '.novedadespoliza')

}).prefix('api/v1/empresas').middleware('autenticacionJwt')