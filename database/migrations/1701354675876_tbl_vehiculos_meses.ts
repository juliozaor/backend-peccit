import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_vehiculos_meses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('vem_id')
      table.integer('vem_tipo')
      table.integer('vem_mes')
      table.boolean('vem_estado')
      table.string('vem_mensaje')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
