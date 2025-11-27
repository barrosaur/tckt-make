'use client'
import React, { useState, useEffect } from 'react'
import Ticket, { TicketProps } from '@/components/Ticket'

const TicketListPage = () => {
  const [tcktList, setTcktList] = useState<TicketProps[]>([])

  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await fetch('/api/handler')
        const data = await res.json()

        setTcktList(data.results)
      } catch (err) {
        console.error("Error fetch data: ", err)
        return new Response(
          JSON.stringify({ message: 'ERROR fetching data' }),
          { status: 500 }
        )
      }
    }

    fetchData()

  }, [])

  const handleDelete = async (id: string) => {
    try {

      const res = await fetch(`/api/handler?id=${id}`, {
        method: 'DELETE'
      })

      setTcktList((prev) => prev.filter(tcktList => tcktList.id !== id))
      alert('Delete Successful')

    } catch (err) {
      alert(`Error deleting ${id}: ${err}`)
    }
  }

  return (
    <div className='bg-white w-full h-full flex flex-col justify-center p-10 gap-8'>
      {
        tcktList?.length > 0 ? 
        (tcktList.map((t) => (
          <Ticket
            key={t.id}
            eventName={t.eventName}
            date={new Date(t.date)}
            name={t.name}
            time={t.time}
            email={t.email}
            id={t.id}
            onDelete={() => handleDelete(t.id)}
          />
        ))) : (
          <div className='flex justify-center items-center h-full flex-col'>
            <h1 className='text-5xl font-bold'>List empty.</h1>
          </div>
        ) 
      }
    </div>
  )
}

export default TicketListPage