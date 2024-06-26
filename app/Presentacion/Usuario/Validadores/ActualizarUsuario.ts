import { schema, rules } from "@ioc:Adonis/Core/Validator"

export const validarActualizarUsuario = schema.create({
    nombre: schema.string.optional({ trim: true }),
    apellido: schema.string.optional({ trim: true }),
    telefono: schema.string.optional({ trim: true }),
    correo: schema.string.optional({ trim: true },),
    fechaNacimiento: schema.string.optional({ trim: true }),
    departamentoId: schema.number.optional(),
    municipioId: schema.number.optional(),
    idRol: schema.string.optional({ trim: true }),
    identificacion: schema.string.optional({ trim: true }),
    esDepartamental:schema.number.optional()
}) 