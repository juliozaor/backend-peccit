import Excel from 'exceljs';

import * as path from 'path';
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';
import { VehiculoPatio } from '../Entidades/VehiculoPatio';
import { TblVehiculosPatios } from 'App/Infraestructura/Datos/Entidad/vehiculosPatios';
import { TblVehiculosModalidades } from 'App/Infraestructura/Datos/Entidad/vehiculosModalidades';
import { VehiculoModalidad } from '../Entidades/VehiculoModalidad';
import fs from 'fs';
export class ServicioImportarVehiculos {
  public async importDataXLSX(tipo: number, archivo: MultipartFileContract, idVigilado: string, vigencia: number, mes: number) {
    let rutaArchivo;
    try {
      const fname = `${new Date().getTime()}.${archivo.extname}`;
      const dir = 'uploads/';

      // Mueve el archivo cargado a la carpeta 'uploads' en la raíz del proyecto
      await archivo.move(path.resolve(dir), {
        name: fname
      });

      if (!archivo.isValid) {
        console.log('Error al mover el archivo');
        return ['Error moving files', 500];
      }

      const filePath = path.resolve(`${dir}${fname}`);
      rutaArchivo = filePath;
      // Resto de la lógica del servicio...
      let send = await this.importClassification(filePath, tipo, idVigilado, vigencia, mes)
      console.log(send)

      return [null, 'Archivo cargado exitosamente.'];
    } catch (error) {
      console.error(error);
      return [error, 'Error interno del servidor.'];
    }finally {
      // Eliminar el archivo, independientemente del resultado
      if (rutaArchivo) {
        try {
          await fs.promises.unlink(rutaArchivo);
          console.log('Archivo eliminado exitosamente.');
        } catch (unlinkError) {
          console.error('Error al eliminar el archivo:', unlinkError);
        }
      }
    }

  }

  importClassification = async (filelocation, tipo, idVigilado, vigencia, mes) => {
    let libro = new Excel.Workbook()

    libro = await libro.xlsx.readFile(filelocation)

    let hoja = libro.getWorksheet('Hoja1') // get sheet name

    let colComment = hoja.getColumn('A') //column name
    if (tipo == 1) {
      
      this.importPatios(colComment, idVigilado, hoja, vigencia, mes);
    } 
    
    if (tipo == 2) {
      this.importModalidades(colComment, idVigilado, hoja, vigencia, mes);
      
    }

  

  }

  importPatios = async (colComment, idVigilado, hoja, vigencia, mes) => {
    await TblVehiculosPatios.query().where({'veh_vigilado': idVigilado, 'veh_vigencia':vigencia, 'veh_mes':mes}).delete();
    colComment.eachCell(async (cell, rowNumber) => {
      if (rowNumber >= 2) {
        const patio = hoja.getCell('A' + rowNumber).value
        const placa = hoja.getCell('B' + rowNumber).value
        const ingreso = hoja.getCell('C' + rowNumber).value
        if (placa!== '' && patio !== '' && ingreso !== '') {

          //custom field name in database to variable
          const inputPlaca: VehiculoPatio = {
            patioId: patio,
            placa: placa.toString().toLocaleLowerCase(),
            ingreso: ingreso,
            vigilado: idVigilado,
            vigencia, mes
          }
          try {
            const vehiculo = new TblVehiculosPatios()
            vehiculo.estableceVehiculoConId(inputPlaca)
            await vehiculo.save()
            console.log(vehiculo.id);

          } catch (error) {
            console.log('la placa ya existe');

          }

        }

      }
    })


  }

  importModalidades = async (colComment, idVigilado, hoja, vigencia, mes) => {
    await TblVehiculosModalidades.query().where({'vep_vigilado': idVigilado, 'vep_vigencia':vigencia, 'vep_mes':mes}).delete();
    colComment.eachCell(async (cell, rowNumber) => {
      if (rowNumber >= 2) {
        const nit = hoja.getCell('A' + rowNumber).value
        const modalidad = hoja.getCell('B' + rowNumber).value
        const placa = hoja.getCell('C' + rowNumber).value
        if (placa!== '' && nit !== '' && modalidad !== '') {

          //custom field name in database to variable
          const inputPlaca: VehiculoModalidad = {
            nit,
            placa: placa.toString().toLocaleLowerCase(),
            modalidadId: modalidad,
            vigilado: idVigilado,
            vigencia,
            mes

          }
          try {
            const vehiculo = new TblVehiculosModalidades()
            vehiculo.estableceVehiculoConId(inputPlaca)
            await vehiculo.save()
            console.log(vehiculo.id);

          } catch (error) {
            console.log('la placa ya existe');

          }

        }

      }
    })


  }

}