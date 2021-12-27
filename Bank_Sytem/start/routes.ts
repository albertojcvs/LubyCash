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
