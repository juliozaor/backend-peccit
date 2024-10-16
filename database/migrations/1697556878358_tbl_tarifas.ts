import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_tarifas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tar_id')
      table.integer('tar_id_servicio_modalidad').unsigned()
      table.integer('tar_vigencia')
      table.string('tar_id_vigilado')
      table.bigInteger('tar_tarifa_autorizada')

      table.string('tar_acto_administrativo_documento')
      table.string('tar_acto_administrativo_ruta')
      table.string('tar_acto_administrativo_original')

      table.string('tar_estructura_costos_documento')
      table.string('tar_estructura_costos_ruta')
      table.string('tar_estructura_costos_original')

      table.timestamp('tar_creado', { useTz: true })
      table.timestamp('tar_actualizado', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
