const Task = require('../models/Task')
const { connection } = require('../db')
require('../models/Task')

const newTask = async (task) => {
  await Task.create(task)
  console.log('New Task Created')
  await connection.close()
}

const listTask = async () => {
  const tasks = await Task.find().lean()
  console.table(
    tasks.map((task) => ({
      id: task._id.toString(),
      title: task.title,
      description: task.description
    }))
  )
  await connection.close()
  process.exit(0)
}

const removeTask = async (_id) => {
  await Task.findByIdAndDelete(_id)
  console.log('Task deleted')
  await connection.close()
}

const updateTask = async (_id, newTask) => {
  await Task.updateOne({ _id }, newTask)
  console.log('Task updated')
  connection.close()
}

const findTask = async (text) => {
  const search = new RegExp(text, 'i')

  const tasks = await Task.find({
    $or: [{ title: search }, { description: search }]
  })

  if (tasks.length === 0) {
    console.log('No tasks foud')
    await connection.close()
    process.exit(0)
  }

  console.table({
    id: tasks[0]._id.toString(),
    title: tasks[0].title,
    description: tasks[0].description
  })
  await connection.close()
  process.exit(0)
}

module.exports = {
  newTask,
  listTask,
  removeTask,
  updateTask,
  findTask
}
