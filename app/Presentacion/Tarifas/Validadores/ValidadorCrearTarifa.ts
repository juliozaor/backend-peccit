import { schema } from "@ioc:Adonis/Core/Validator"
export const validadorCrearTarifa = schema.create({
    idServicioModalidad: schema.number(),
    idVigilado: schema.string({ trim: true }),
    vigencia: schema.number(),
    tarifaAutorizada: schema.number(),

    actoAdministrativoDocumento: schema.string({trim: true}),
    actoAdministrativoRuta: schema.string({trim: true}),
    actoAdministrativoOriginal: schema.string({trim: true}),

    estructuraCostosDocumento: schema.string({trim: true}),
    estructuraCostosRuta: schema.string({trim: true}),
    estructuraCostosOriginal: schema.string({trim: true})
})