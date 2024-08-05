import vine from '@vinejs/vine'

export const idParamSchema = vine.object({
  id: vine.number().min(1),
})

export const idParamValidator = vine.compile(idParamSchema)
