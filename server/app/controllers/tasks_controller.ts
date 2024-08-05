import type { HttpContext } from '@adonisjs/core/http'
import TasksService from '#services/task_service'
import { inject } from '@adonisjs/core'
import { idParamValidator } from '#validators/common'
import { createTaskValidator, updateTaskValidator } from '#validators/task'
import { sep, normalize } from 'node:path'
import app from '@adonisjs/core/services/app'

const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/

@inject()
export default class TasksController {
  constructor(protected tasksService: TasksService) {}

  index() {
    return this.tasksService.findAll()
  }

  async show({ params }: HttpContext) {
    const { id } = await idParamValidator.validate(params)

    return this.tasksService.findOne(id)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createTaskValidator)

    const createdTask = await this.tasksService.create(payload)
    return response.status(201).json(createdTask)
  }

  async update({ request }: HttpContext) {
    const payload = await request.validateUsing(updateTaskValidator)

    return this.tasksService.update(payload)
  }

  async remove({ params, response }: HttpContext) {
    const { id } = await idParamValidator.validate(params)
    await this.tasksService.remove(id)

    return response.status(204)
  }

  async downloadFile({ request, response }: HttpContext) {
    const filePath = request.param('*').join(sep)
    const normalizedPath = normalize(filePath)

    if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
      return response.badRequest('Malformed path')
    }

    const absolutePath = app.makePath('uploads', normalizedPath)
    response.header('Content-Type', 'application/octet-stream')
    response.header('Content-Disposition', `attachment; filename="${request.param('*')}"`)
    return response.attachment(absolutePath)
  }
}
