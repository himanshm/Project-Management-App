import { ChangeEvent, useState } from 'react';

type NewTaskProps = {
  onAdd: (task: string) => void;
};

function NewTask({ onAdd }: NewTaskProps) {
  const [enteredTask, setEnteredTask] = useState<string>('');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEnteredTask(event.target.value);
  }

  function handleTask() {
    onAdd(enteredTask);
    setEnteredTask('');
  }
  return (
    <div className='flex items-center gap-4'>
      <input
        type='text'
        className='w-64 px-2 py-1 rounded-sm bg-stone-200'
        value={enteredTask}
        onChange={handleChange}
      />
      <button
        className='text-stone-700 hover:text-stone-950'
        onClick={handleTask}
      >
        Add Task
      </button>
    </div>
  );
}

export default NewTask;
