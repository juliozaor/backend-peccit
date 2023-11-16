import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_vehiculos_modalidades'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('vep_id')
      table.string('vep_nit')
      table.string('vep_placa')
      table.string('vep_vigilado')
      table.integer('vep_modalidad_id').references('smo_id').inTable('tbl_servicios_modalidades')    
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
