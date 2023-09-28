'use client'

import React, { useState } from 'react'
import '../myCalenar/myCalendar.css'

interface CalendarProps {
  initialYear: number
  initialMonth: number
}
export const MyCalendar = ({ initialYear, initialMonth }: CalendarProps) => {
  const [year, setYear] = useState(initialYear)
  const [month, setMonth] = useState(initialMonth)

  const generateCalendar = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days: number[] = []

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(i)
    }
    return days
  }

  const daysInMonth = generateCalendar(year, month)

  const goToPreviousMonth = () => {
    if (month === 0) {
      setYear(year - 1)
      setMonth(11)
    } else {
      setMonth(month - 1)
    }
  }

  const goToNextMonth = () => {
    if (month === 11) {
      setYear(year + 1)
      setMonth(0)
    } else {
      setMonth(month + 1)
    }
  }

  return (
    <div className="MyCalendar">
      <div className="calendar-button">
        <button onClick={goToPreviousMonth}>Previous</button>
        <div>{`${year}-${month + 1}`}</div>
        <button onClick={goToNextMonth}>Next</button>
      </div>
      <div className="day-labels">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>
      <div className="calendar">
        {daysInMonth.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>

      {/* <style jsx>{`
        .MyCalendar {
          width: 100%;
        }
        .calendar-button {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin: 10px 0 10px 0;
        }
        .day-labels {
          width: 100%;
          display: flex;
          justify-content: space-around;
          background-color: #f0f0f0;
          font-weight: bold;
          padding: 8px;
        }

        .calendar {
          display: grid;
          height: 80%;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }

        .calendar div {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 4px;
          border: 1px solid #ccc;
          background-color: #fff;
        }
      `}</style> */}
    </div>
  )
}

export default MyCalendar
