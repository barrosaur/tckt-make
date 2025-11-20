import { NextRequest } from 'next/server'
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

// change the name so that what we get is the same column names as the database
export async function GET() {
  try {

    const query = 'SELECT * FROM ticket'
    const [results] = await db.query(query)

    const transformedResults = results.map((row: any) => ({
      id: row.id,
      eventName: row.event_name,
      date: row.event_date,
      time: row.event_time,
      name: row.attendee_name,
      email: row.attendee_email
    }))

    return new Response(
      JSON.stringify({results: transformedResults, message: 'Fetch: Successful!' }),
      {
        status: 200,
        headers: { 'Content-type': 'application/json'}
      }
    )

  } catch(err) {
    console.error("Error retrieving data: ", err);
    return new Response(
      JSON.stringify({ message: 'Data retrieval error', status: 500 })
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    const query = `DELETE FROM ticket WHERE id = ?`
    const [result] = await db.query(query, [id])

    return new Response(
      JSON.stringify({ message: 'OK'}),
      { status: 200 }
    )

  } catch (err) {
    console.error("Error delete: ", err);
    return new Response(
      JSON.stringify({ message: 'Data remove error', status: 500 })
    )
  }
}