import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_usuarios'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('departamento_id')
      table.integer('municipio_id')
      table.integer('es_departamental').defaultTo(0)
      table.boolean('modal').defaultTo(false)
      table.boolean('reporta_otro_municipio').defaultTo(false)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('departamento_id')
      table.dropColumn('municipio_id')
      table.dropColumn('es_departamental')
      table.dropColumn('modal')
      table.dropColumn('reporta_otro_municipio')
    })
  }
}
