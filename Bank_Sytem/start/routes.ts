import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'UsersController.store')

  Route.group(() => {
    Route.get('/', 'UsersController.index')
    Route.get('/:id', 'UsersController.show')
    Route.put('/:id', 'UsersController.update')
    Route.delete('/:id', 'UsersController.destroy')
  }).middleware('auth:api')
}).prefix('/users')

Route.group(() => {
  Route.get('/', 'PermissionsController.index')
  Route.get('/:id', 'PermissionsController.show')
  Route.post('/', 'PermissionsController.store')
  Route.delete('/:id', 'PermissionsController.destroy')
})
  .prefix('/permissions')
  .middleware('auth:api')
  .middleware('isAdmin')

Route.group(() => {
  Route.post('/', 'LoginController.login')
  Route.delete('/', 'LoginController.logout').middleware('auth:api')
}).prefix('/login')


Route.group(() => {
  Route.post('/', 'ResetPasswordController.store' )
  Route.put('/', 'ResetPasswordController.update' )
}).prefix('reset_password')

Route.group(() => {
  Route.get('/', 'AdminsController.index')
  Route.get('/:id', 'AdminsController.show')
  Route.post('/', 'AdminsCotroller.store')
  Route.put('/:id', 'AdminsCotroller.store')
  Route.delete('/:id', 'AdminsCotroller.store')
})
  .prefix('/admin')
  .middleware('auth:api')
  .middleware('isAdmin')
