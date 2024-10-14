import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Empresa/ControladorEmpresa'

Route.group(() => {
  Route.get('/listarempresas', accion_path + '.listar')
  Route.get('/listarpoliza', accion_path + '.listarpoliza')
  Route.get('/novedades_poliza', accion_path + '.novedadespoliza')
  Route.get('/amparos_poliza', accion_path + '.amparospoliza')
  Route.get('/responsabilidad_poliza', accion_path + '.responsabilidadpoliza')
}).prefix('api/v1/empresas').middleware('autenticacionJwt')
