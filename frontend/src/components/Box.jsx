import React from 'react'

const Box = (props) => {
  return (
    <>
      <div className='h-32 w-52 bg-purple-950 rounded-md flex flex-col justify-center text-white items-center '>
      <h1 className='text-[20px] font-bold text-center'>{props.title}</h1>
        <p className='text-[32px] font-extrabold text-center'>{props.number}</p>
      </div>
    </>
  )
}

export default Box
