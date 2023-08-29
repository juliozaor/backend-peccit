import Route from '@ioc:Adonis/Core/Route'
const controlador = '../../../app/Presentacion/FormularioPeccit/ControladorFormulariosPeccit'

Route.group(() => {
  Route.get('/general', `${controlador}.visualizar`)
}).prefix('/api/v1/formulario').middleware('autenticacionJwt')
