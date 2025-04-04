import { twMerge } from 'tailwind-merge'

export const ActionButton = ({ children, className, ...props }) => {
  return (
    <button
      className={twMerge(
        'px-6 py-4 border border-black  bg-indigo-500 hover:bg-indigo-700 text-white transition-colors duration-100 ',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}