'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const TicketForm = () => {
  const router = useRouter()

  const [name, setName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<string>()
  const [event, setEvent] = useState<string>()
  
  const onClearInput = () => {
    setName("")
    setEmail("")
    setEvent("")
    setTime("")
    setDate(null)
  }

  const generateRandomId = (min=27, max=30) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    
    const randLength = Math.floor(Math.random() * (max - min + 1)) + min
    
    let result = ""
    
    for(let i = 0; i < randLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    
    return result
  }
  
  // ID
  const [id] = useState(() => generateRandomId())

  const handleDateChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDate(new Date(value))
  }

  const handleGoHome = () => {
    router.push('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formattedDate = date ? date.toISOString().split('T')[0] : null

    const data = {
      event,
      date: formattedDate,
      time,
      name,
      email,
      id,
    }

    const response = await fetch('/api/handler', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data) 
    })

    const result = await response.json()
    alert(result.message)

    onClearInput()
  }
  
  return (
    <form 
      className='p-10 rounded-2xl bx-shdw flex flex-col justify-center gap-8 w-2/5 text-black'
      onSubmit={handleSubmit}  
    >
      <div className='flex gap-10 items-center'>
        <button 
          className='bg-blue-700 outline-none brdr-50 px-3 py-1 text-white cursor-pointer hover:bg-blue-800 flex shrink-0'
          onClick={handleGoHome}
        > &lt; </button>
        <h1 className='font-bold text-2xl text-center'>Ticket Forms</h1>
      </div>
      <div className='flex flex-col gap-1'>
        <label className='font-bold'>Name</label>
        <input 
          type="text"
          placeholder='Enter name...'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className='border border-solid border-gray-800 outline-none px-2 py-0.5 rounded-sm'
          autoComplete='off'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <label className='font-bold'>Email</label>
        <input 
          type="email"
          placeholder='Enter email...'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          className='border border-solid border-gray-800 outline-none px-2 py-0.5 rounded-sm'
          autoComplete='off'
        />
      </div>
      <div className='flex w-full'>
        <select 
          className='px-2 py-1 border border-solid border-gray-800 flex justify-center rounded-sm'
          value={event}
          onChange={(e) => setEvent(e.target.value)}
        >
          <option value="null">Select Event</option>
          <option value="software engineering">Software Engineering</option>
          <option value="data stuff">The Data stuff</option>
          <option value="low level engineering">Low level engineering</option>
          <option value="full stack web development">Full stack web development</option>
          <option value="cybersecurity">Cybersecurity</option>
        </select>
      </div>
      <div className='flex flex-col gap-1'>
        <label className='font-bold'>Choose Date</label>
        <input 
          type='date'
          value={date ? date.toISOString().split('T')[0] : ''}
          onChange={handleDateChange} 
          required
          className='border border-solid border-gray-800 py-0.5 px-2 rounded-sm'
          autoComplete='off'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <label className='font-bold'>Select Time</label>
        <input 
          type="time"
          value={time} 
          required
          onChange={(e) => setTime(e.target.value)}
          className='border border-solid border-gray-800 py-0.5 px-2 rounded-sm'
          autoComplete='off'
        />
      </div>
      <div className='flex justify-center items-center'>
        <button
          className='bg-blue-700 text-white px-5 py-2 rounded-md font-bold outline-none cursor-pointer hover:bg-blue-800'
          type='submit'
        >Get Ticket</button>
      </div>
    </form>
  )
}

export default TicketForm