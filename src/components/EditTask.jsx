export function EditTask ({ group, id, title, desc, changeTask }) {
  return (
    <section className='bg-slate-900 w-[460px] h-fit shadow-[0px_0px_20px_0px] shadow-slate-600 rounded-md p-2 flex flex-col gap-3 text-slate-200 truncate'>
      <div className='flex flex-col gap-2'>
        <label htmlFor='title' className='text-2xl font-semibold'>Title</label>
        <input type='text' id='editTitle' className='outline-none text-lg font-medium bg-slate-400/5 p-2 rounded-md' />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='desc' className='text-xl font-semibold'>Description</label>
        <input type='text' id='editDesc' className='outline-none text-base  font-medium bg-slate-400/5 p-2 rounded-md' />
      </div>

      <button
        onClick={() => changeTask({
          action: id ? 'edit' : 'add',
          group,
          id,
          title: document.getElementById('editTitle').value,
          desc: document.getElementById('editDesc').value
        })}
        className='rounded-md bg-slate-200/80 hover:bg-slate-200/65 w-fit p-2 text-slate-800 text-base font-semibold transition'
      >
        Add
      </button>
    </section>
  )
}
