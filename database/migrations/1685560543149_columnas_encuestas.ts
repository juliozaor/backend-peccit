import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'encuestas'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('categorizable').defaultTo(true)
      table.boolean('observacion').defaultTo(false)
      table.boolean('logueo').defaultTo(true)

  })
}

public async down () {
  this.schema.alterTable(this.tableName, (table) => {
    table.dropColumn('categorizable')
    table.dropColumn('observacion')
    table.dropColumn('logueo')

})
}


}
