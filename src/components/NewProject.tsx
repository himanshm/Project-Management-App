import { useRef } from 'react';
import Input from './Input.tsx';
import { Project } from '../App.tsx';
import Modal, { type ModalRef } from './Modal.tsx';

type NewProjectProps = {
  onAddProject: (projectData: Project) => void;
};

function NewProject({ onAddProject }: NewProjectProps) {
  const modal = useRef<ModalRef>(null);
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const dueDate = useRef<HTMLInputElement>(null);

  function handleSave() {
    if (!title.current || !description.current || !dueDate.current) {
      console.error('One of the inputs is not available.');
      return;
    }

    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = new Date(dueDate.current.value); // Input always returns a string

    if (
      enteredDescription.trim() === '' ||
      enteredTitle.trim() === '' ||
      !enteredDueDate
    ) {
      modal.current?.open();
      return;
    }
    if (isNaN(enteredDueDate.getTime())) {
      // Ensure the date conversion results in a valid date
      console.error('Invalid date entered.');
      return;
    }

    // Lift the state up to the app component to send the collected input data there to be used in other components
    onAddProject({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption='Close'>
        <h2>Invalid Input</h2>
        <p>Oops.. looks like you forgot to enter a value!</p>
        <p>Please make sure you provide a valid value for every input field.</p>
      </Modal>
      <div className='w-[35rem] mt-16'>
        <menu className='flex items-center justify-end gap-4 my-4'>
          <li>
            <button className='text-stone-800 hover:text-stone-950'>
              Cancel
            </button>
          </li>
          <li>
            <button
              className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950'
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>

        <div>
          <Input type='text' label='Title' control='input' ref={title} />
          <Input label='Description' control='textarea' ref={description} />
          <Input type='date' label='Due Date' control='input' ref={dueDate} />
        </div>
      </div>
    </>
  );
}

export default NewProject;
