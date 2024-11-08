import { AddIcon } from './icons/addIcon'
import { Task } from './Task'

export function TaskCard ({ tasks, cardTitle, changeTask, group }) {
  return (
    <section className='bg-slate-900 w-[460px] h-fit shadow-[0px_0px_8px_-1px] shadow-black rounded-md p-2 flex flex-col gap-2'>
      <h2 className='text-2xl text-center font-bold text-slate-200 border-2 border-slate-200/75 rounded-md p-[2px]'>
        {cardTitle}
      </h2>
      {
        tasks.map(task => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            desc={task.desc}
            changeTask={changeTask}
            group={group}
          />
        ))
      }
      <div className='flex flex-row w-full gap-1 bg-slate-400/35 hover:bg-slate-400/50 p-2 rounded-md cursor-pointer justify-center transition'>
        <AddIcon />
      </div>
    </section>
  )
}
