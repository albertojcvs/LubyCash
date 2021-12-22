import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserPermissions extends BaseSchema {
  protected tableName = 'user_permissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .notNullable()
        .references('users.id')
        .unsigned()
        .notNullable()
        .onDelete('CASCADE')
      table
        .integer('permission_id')
        .references('permissions.id')
        .unsigned()
        .notNullable()
        .onDelete('CASCADE')

      table.unique(['user_id', 'permission_id'])

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
