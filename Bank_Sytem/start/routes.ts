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
  Route.post('/', 'ResetPasswordController.store')
  Route.put('/', 'ResetPasswordController.update')
}).prefix('/reset_password')

Route.group(() => {
  Route.get('/', 'AdminsController.index')
  Route.get('/:id', 'AdminsController.show')
  Route.post('/', 'AdminsController.store')
  Route.delete('/:id', 'AdminsController.destroy')
})
  .prefix('/admins')
  .middleware('auth:api')
  .middleware('isAdmin')

Route.group(() => {
  Route.post('/', 'ClientsController.store')

  Route.group(() => {
    Route.get('/', 'ClientsController.index')

    Route.group(() => {
      Route.get('/', 'StatementsController.show')
    }).prefix('/:cpf/statements')
  }).middleware('isAdmin')
})
  .prefix('/clients')
  .middleware('auth:api')

Route.group(() => {
  Route.post('/', 'PixController.store')
})
  .prefix('/pix')
  .middleware('auth:api')

Route.group(() => {
  Route.post('/', 'PromoteUsersController.promoteUser')
  Route.delete('/','PromoteUsersController.removePromotion')
})
  .prefix('promote_user')
  .middleware('auth:api')
  .middleware('isAdmin')
