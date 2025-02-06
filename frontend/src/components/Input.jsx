import React from 'react'

const Input = (props) => {
  return (
    <>
       <input
              type='text'
              placeholder={props.placeholder}
              name={props.name}
              value={props.value}
              onChange={props.onChange}
              className="min-h-10 min-w-[50vw] md:min-w-[40vw] bg-transparent placeholder:text-black border-[2px] rounded-md px-2 border-purple-950 focus:border-[3px] focus:scale-100"
            />
    </>
  )
}

export default Input
