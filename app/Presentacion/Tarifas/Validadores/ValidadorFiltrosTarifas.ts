import { schema } from "@ioc:Adonis/Core/Validator"
export const validadorFiltrosTarifas = schema.create({
    idVigilado: schema.string.optional({ trim: true }),
    vigencia: schema.number.optional()
})