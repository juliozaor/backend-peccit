import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {

  protected tableName = 'tbl_empresas'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('correoelectronico')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('correoelectronico')
    })
  }
}
