import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Indicadores/ControladorIndicador'

Route.group(() => {
  Route.post('/', accion_path + '.listarReportesIndicador')
  Route.get('/formularios', accion_path + '.formularios')
  Route.post('/respuestas', accion_path + '.respuestas')
  Route.post('/respuestasEjecucion', accion_path + '.respuestasEjecucion')
  Route.post('/enviar', accion_path + '.enviar')
  Route.post('/enviarEjecucion', accion_path + '.enviarEjecucion')
  Route.get('/ejecucion', accion_path + '.ejecucion')
}).prefix('api/v1/inidicador').middleware('autenticacionJwt')
