import { useState } from 'react'
import { DeleteIcon } from './icons/DeleteIcon'
import { EditIcon } from './icons/EditIcon'
import { RightArrow } from './icons/RightArrow'

export function Task ({ id, title, desc, changeTask, setEditingTask, group }) {
  const [showDesc, setShowDesc] = useState(false)

  return (
    <div
      className='flex flex-col w-full gap-1 bg-slate-400/35 hover:bg-slate-400/50 p-2 rounded-md cursor-pointer transition'
      onClick={() => setShowDesc(!showDesc)}
    >
      <div className='flex justify-between items-center w-full gap-1'>
        <p className='text-xl text-slate-200 truncate'>{title}</p>
        <div className='flex items-stretch gap-1'>
          <span onClick={() => setEditingTask({editing: true, group: group, id: id})}><EditIcon /></span>
          <span onClick={() => changeTask({ id, group, action: 'delete' })}><DeleteIcon /></span>
          <span onClick={() => changeTask({ id, group, action: 'move' })}><RightArrow /></span>
        </div>
      </div>

      {showDesc && (
        <p className='text-slate-300'>
          {desc}
        </p>
      )}
    </div>
  )
}
