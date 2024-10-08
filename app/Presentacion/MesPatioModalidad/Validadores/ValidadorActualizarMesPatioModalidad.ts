import { schema } from "@ioc:Adonis/Core/Validator"
export const ValidadorActualizarMesPatioModalidad = schema.create({
    estado: schema.boolean.optional(),
    mensaje: schema.string.optional({ trim: true })
})