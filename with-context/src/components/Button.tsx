import { ComponentPropsWithoutRef, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className='px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100'
    >
      {children}
    </button>
  );
}

export default Button;
