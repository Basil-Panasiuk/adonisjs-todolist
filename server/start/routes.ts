/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const TasksController = () => import('#controllers/tasks_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('tasks', [TasksController, 'index'])
router.get('tasks/:id', [TasksController, 'show'])
router.post('tasks', [TasksController, 'store'])
router.put('tasks/:id', [TasksController, 'update'])
router.delete('tasks/:id', [TasksController, 'remove'])
router.get('/download/*', [TasksController, 'downloadFile'])
