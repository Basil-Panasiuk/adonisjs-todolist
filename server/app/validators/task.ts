import vine from '@vinejs/vine'
import { idParamSchema } from './common.js'

export const createTaskValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1),
    description: vine.string().trim().minLength(1).optional(),
    file: vine.file({ size: '1mb' }).optional(),
  })
)

export const updateTaskValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).optional(),
    description: vine.string().trim().minLength(1).optional(),
    file: vine.file({ size: '1mb' }).optional(),
    isCompleted: vine.boolean().optional(),
    params: idParamSchema,
  })
)
