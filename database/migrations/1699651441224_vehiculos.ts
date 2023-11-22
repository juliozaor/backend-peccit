import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_vehiculos_patios'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('veh_id')
      table.string('veh_placa')
      table.date('veh_ingreso')
      table.string('veh_vigilado')      
      table.integer('veh_vigencia')      
      table.integer('veh_mes')      
      table.integer('veh_patio_id').references('pat_id').inTable('tbl_patios').onDelete('cascade').onUpdate('cascade')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
