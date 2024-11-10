import { useEffect, useState } from 'react'
import { cards, tasksStorage } from '../constants'
import taskstodo from '../mocks/tasksEmpty.json'

export function useTasks () {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setTasks(JSON.parse(window.localStorage.getItem(tasksStorage)) ?? taskstodo)
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
          title,
          desc
        })
      }
    }

    setTasks(newTasks)
    window.localStorage.setItem(tasksStorage, JSON.stringify(newTasks))
  }

  return { tasks, loading, changeTask }
}
