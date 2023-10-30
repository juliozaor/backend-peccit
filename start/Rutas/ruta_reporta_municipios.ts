import Route from '@ioc:Adonis/Core/Route'
const controlador = '../../../app/Presentacion/OtrosMunicipios/ControladorOtrosMunicipios'

Route.group(() => {
  Route.get('/', `${controlador}.obtener`)
  Route.post('/', `${controlador}.guardar`)
}).prefix('/api/v1/otros_municipios').middleware('autenticacionJwt')