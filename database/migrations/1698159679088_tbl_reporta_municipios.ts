import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_reporta_municipios'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('rmu_id')
      table.integer('rmu_departamento')
      table.integer('rmu_municipio')
      table.string('rmu_usuario')
      table.string('rmu_convenio')
      table.text('rmu_nombre_original')
      table.string('rmu_ruta')
      table.string('rmu_documento')
      table.boolean('rmu_estado').defaultTo(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
