import Route from '@ioc:Adonis/Core/Route'
const controlador = '../../../app/Presentacion/Tarifas/ControladorTarifas'

Route.group(() => {
  Route.post('/obtener', `${controlador}.obtener`)
  Route.post('/', `${controlador}.guardar`)
  Route.delete('/:tarifaId', `${controlador}.eliminar`)
}).prefix('/api/v1/tarifas').middleware('autenticacionJwt')