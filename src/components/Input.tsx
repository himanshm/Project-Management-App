import { ComponentPropsWithoutRef } from 'react';

type InputProps = {
  label: string;
  control: 'input' | 'textarea';
} & ComponentPropsWithoutRef<'input'> &
  ComponentPropsWithoutRef<'textarea'>;

function Input({ label, control, ...rest }: InputProps) {
  const inputClasses =
    'w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600';
  return (
    <p className='flex flex-col gap-1 my-4'>
      <label
        className='text-sm font-bold uppercase text-stone-500'
        htmlFor={rest.id}
      >
        {label}
      </label>
      {control === 'input' && <input className={inputClasses} {...rest} />}
      {control === 'textarea' && (
        <textarea className={inputClasses} {...rest} />
      )}
    </p>
  );
}

export default Input;
