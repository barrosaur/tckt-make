'use client'
import React, { useState } from "react";
import TicketForm from "@/components/TicketForm";

export default function Home() {
  const buttonStyle = "cursor-pointer px-10 py-5\
  rounded-md font-bold text-2xl outline-none bg-blue-700 hover:bg-blue-800 w-75"

  const [form, setForm] = useState<boolean>(false)

  return (
    <div className="flex justify-center items-center w-full h-screen bg-white gap-10 text-background">
      {form ? (
        <TicketForm/>
      ) : (
        <>
          <button 
            className={buttonStyle}
            onClick={() => setForm(!form)}
          >Form for ticket
          </button>
          <button
            className={buttonStyle}
          >Ticket List</button>
        </>
      )}
    </div>
  );
}
