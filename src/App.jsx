import { useEffect, useState } from 'react'
import { TaskCard } from './components/TaskCard'

import taskstodo from './mocks/tasks.json'
import { cardNames, cards } from './constants'
import { EditTask } from './components/EditTask'

function useTasks () {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setTasks(taskstodo)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const changeTask = ({ action, id, group, title = undefined, desc = undefined }) => {
    const newTasks = { ...tasks }
    const indexTask = tasks[group].findIndex(task => task.id === id)

    if (indexTask === -1 && action !== 'add') throw new Error(`Task with id ${id} was not found!`)

    switch (action) {
      case 'move': {
        // find index of key group
        const indexGroup = Object.keys(tasks).indexOf(group)

        // move task to the next group
        // (if it is the final group move back to the first)
        newTasks[cards[cards.length <= indexGroup + 1 ? 0 : (indexGroup + 1)]]
          .push(newTasks[group][indexTask])
      }
      // eslint-disable-next-line no-fallthrough
      case 'delete': {
        newTasks[group].splice(indexTask, 1)
        break
      }
      case 'edit': {
        if (title) newTasks[group][indexTask].title = title
        if (desc) newTasks[group][indexTask].desc = desc
        break
      }
      case 'add': {
        if (!title) break

        newTasks[group].push({
          id: Math.floor(Math.random() * 100000) * Date.now(),
          title: title,
          desc: desc
        })
      }
    }

    setTasks(newTasks)
  }

  return { tasks, loading, changeTask }
}

export function App () {
  const { tasks, loading, changeTask } = useTasks()
  const [editingTask, setEditingTask] = useState({editing: false, group: undefined})

  useEffect(() => {
    setEditingTask({editing: false, group: undefined})
  }, [tasks])

  return (
    <div className='mt-20 bg-stone-200 p-12 grid gap-y-10 max-w-fit rounded-lg content-center place-items-center'>
      <h1 className='text-5xl text-center font-black text-slate-800'>~ TODO LIST ~</h1>
      <main className='flex justify-center gap-x-16'>
        {
          loading
            ? <h1 className='text-2xl'>Cargando...</h1>
            : (
                cards.map(card => (
                  <TaskCard
                    key={card}
                    tasks={tasks[card]}
                    cardTitle={cardNames[card]}
                    changeTask={changeTask}
                    group={card}
                    setEditingTask={setEditingTask}
                  />
                ))
              )
        }
      </main>

      {editingTask.editing && (
        <EditTask title='Title' desc='Desc' group={editingTask.group} changeTask={changeTask} />
      )}
    </div>
  )
}
