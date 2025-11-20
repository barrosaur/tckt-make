'use client';
import React   from 'react'
import Image from 'next/image'

export interface TicketProps {
  eventName: string,
  date: Date,
  time: string,
  name: string,
  email: string,
  id: string,
  onDelete: () => void
}

const Ticket = ({ eventName, date, time, name, email, id, onDelete } : TicketProps) => {
  const size = 30;

  return (
    <div className='p-5 rounded-2xl bx-shdw flex'>
      <div className='flex flex-col flex-1'>
        <h1 className='font-bold text-2xl'>{eventName}</h1>
        <div className='flex gap-10'>
          {/* remember this will throw an error if you dont put anything */}
          <h3>{date.toLocaleDateString()}</h3>
          <h3>Time: {time}</h3>
        </div>
        <h1 className='mrtb-10-3 '>
          Attendee: <span className='font-bold'>{name}</span>
        </h1>
        <h3>{email}</h3>
        <h5 className='mrtb-20-3 text-sm text-gray-500'>{id}</h5>
      </div>  
      <div className='flex items-center justify-center'>
        <button 
          className='flex items-center justify-center cursor-pointer group'
          onClick={onDelete}
        >
          <Image
            width={size}
            height={size}
            alt='Delete'
            src="/trash-can.svg"
            className='group-hover:hidden'
          />
          <Image
            width={size}
            height={size}
            alt='Delete'
            src="/trashcan-hover.svg"
            className='hidden group-hover:block'
          />
        </button>
      </div>
    </div>
  )
}

export default Ticket