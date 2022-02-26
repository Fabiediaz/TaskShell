const { program } = require('commander')
const { prompt } = require('inquirer')
const {
  newTask,
  listTask,
  removeTask,
  updateTask,
  findTask
} = require('./controllers/task.controllers')

program.version('1.0.0').description('Yours tool for task in your terminal :)')

const taskQuestions = [
  {
    type: 'input',
    message: 'task title',
    name: 'title'
  },
  {
    type: 'input',
    message: 'task description',
    name: 'description'
  }
]

program
  .command('save')
  .alias('s')
  .action(async () => {
    const answers = await prompt(taskQuestions)

    newTask(answers)
  })

program
  .command('list')
  .alias('l')
  .action(() => {
    listTask()
  })

program
  .command('delete <id>')
  .alias('d')
  .action((_id) => removeTask(_id))

program
  .command('update <id>')
  .alias('u')
  .action(async (_id) => {
    if (!_id) return console.log('Please provide an id')
    const answers = await prompt(taskQuestions)
    await updateTask(_id, answers)
  })

program
  .command('find <task>')
  .alias('f')
  .action((text) => findTask(text))

program.parse(process.argv)
