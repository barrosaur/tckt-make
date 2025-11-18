import { db } from '../db'

export async function POST(req) {
  try {
    const body = await req.json()
    const { 
      event,
      date,
      time,
      name,
      email,
      id
    } = body

    const query = 'INSERT INTO ticket (event_name, event_date, event_time, attendee_name, attendee_email, id) VALUES (?, ?, ?, ?, ?, ?)'
    const [result] = await db.query(query, [event, date, time, name, email, id])

    return new Response(
      JSON.stringify({ message: 'Created' }),
      { status: 201, headers: { 'Content-type': 'application/json' }}
    )
  } catch (err) {
      console.error("Error POST: " ,err)
      return new Response(
        JSON.stringify({ message: 'Error post database' }),
        { status: 500 }
      )
  }
}