import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/MesPatioModalidad/ControladorMesPatioModalidad'

Route.group(() => {
  Route.get('filtrar', accion_path + '.filtrar')
  Route.patch(':id', accion_path + '.actualizar')
}).prefix('api/v1/mes_patio_modalidad').middleware(['autenticacionJwt', 'administrador'])
