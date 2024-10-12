import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Maestras/ControladorMaestras'

Route.group(() => {
  Route.get('/meses', accion_path + '.listarMeses')
  Route.get('/servicios-modalidades', accion_path + '.servicioModalidad')
  Route.get('/departamentos', accion_path + '.listarDepartamentos')
  Route.get('/ciudades', accion_path + '.listarCiudades')
}).prefix('api/v1/maestras').middleware('autenticacionJwt')