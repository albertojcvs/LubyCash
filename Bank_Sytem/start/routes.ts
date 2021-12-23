import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/users', 'UsersController.store')

  Route.group(() => {
    Route.get('/users/:id', 'UsersController.show')
    Route.get('/users', 'UsersController.index')
    Route.put('/users', 'UsersController.update')
    Route.delete('/users', 'UsersController.destroy')
  }).middleware('auth:api')
}).prefix('/users')

Route.group(() => {
  Route.get('/permissions/:id', 'PermissionsController.show')
  Route.get('/permissions', 'PermissionsController.index')
  Route.post('/permissions', 'PermissionsController.store')
  Route.delete('/permissions', 'PermissionsController.destroy')
})
  .prefix('/permissions')
  .middleware('auth:api')
  .middleware('isAdmin')
