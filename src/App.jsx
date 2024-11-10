import { useEffect, useState } from 'react'
import { TaskCard } from './components/TaskCard'

import { cardNames, cards } from './constants'
import { EditTask } from './components/EditTask'
import { useTasks } from './hooks/useTasks'

export function App () {
  const { tasks, loading, changeTask } = useTasks()
  const [editingTask, setEditingTask] = useState({ editing: false, group: undefined, id: undefined })

  useEffect(() => {
    setEditingTask({ editing: false, group: undefined, id: undefined })
  }, [tasks])

  return (
    <div className='bg-slate-900 p-12 flex flex-col gap-y-24 min-h-screen w-screen rounded-lg items-center'>
      <h1 className='text-5xl text-center font-black text-slate-200'>~ TODO LIST ~</h1>
      <main className='grid grid-cols-3 gap-6 gap-x-16'>
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
        <EditTask
          title='Title'
          desc='Desc'
          group={editingTask.group}
          id={editingTask.id}
          changeTask={changeTask}
        />
      )}
    </div>
  )
}
