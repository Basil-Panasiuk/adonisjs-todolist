import Task from '#models/task'
import { Exception } from '@adonisjs/core/exceptions'
import { CreateTask, UpdateTask } from '../interfaces/task.interface.js'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import fs from 'node:fs'

export default class TasksService {
  findAll() {
    return Task.all()
  }

  async findOne(id: number) {
    const task = await Task.find(id)
    if (!task) {
      throw new Exception('Task not found', { status: 404 })
    }

    return task
  }

  async create(payload: CreateTask) {
    if (payload.file) {
      await this.storeFile(payload.file)
    }

    return Task.create({
      title: payload.title,
      description: payload.description,
      filePath: payload.file?.fileName,
    })
  }

  async update(payload: UpdateTask) {
    const task = await this.findOne(payload.params.id)

    if (payload.file) {
      this.removeFile(task.filePath)
      await this.storeFile(payload.file)

      task.filePath = payload.file?.fileName as string
    }

    task.title = payload.title ? payload.title : task.title
    task.description = payload.description ? payload.description : task.description
    task.isCompleted =
      'isCompleted' in payload ? (payload.isCompleted as boolean) : task.isCompleted

    return task.save()
  }

  async remove(id: number) {
    const task = await this.findOne(id)

    return task.delete()
  }

  private storeFile(file: MultipartFile) {
    return file.move(app.makePath('uploads'), {
      name: `${cuid()}.${file.extname}`,
    })
  }

  private removeFile(name: string) {
    fs.unlink(app.makePath(`uploads/${name}`), (err) => {
      err && console.log('failed to remove file')
    })
  }
}
