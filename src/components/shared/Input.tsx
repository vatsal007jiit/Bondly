import { FC } from 'react'

interface InputInterface {
  name: string
  type?: string
  placeholder?: string
  value?:string
}

const Input: FC<InputInterface> = ({name, placeholder, value, type="text"}) => {
  return (
    <input 
        required
        className='w-full rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 outline-none'
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
    />
  )
}

export default Input