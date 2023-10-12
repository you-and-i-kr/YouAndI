'use client'

import React, { useState } from 'react'
import PlanPopup from './planPopup'

interface CalendarProps {
  initialYear: number
  initialMonth: number
}

export interface PlanContent {
  title: string
  startDate: string
  endDate: string
  memo: string
}
export const MyCalendar = ({ initialYear, initialMonth }: CalendarProps) => {
  const [year, setYear] = useState(initialYear)
  const [month, setMonth] = useState(initialMonth)

  const [selectedDay, setSelectedDay] = useState('')
  const [plans, setPlans] = useState([])
  console.log(plans)
  const [isPopupOpen, setPopupOpen] = useState(false)
  const [editPlan, setEditPlan] = useState(null)

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

  const openPopup = (day) => {
    setEditPlan(null)
    setSelectedDay(day)
    setPopupOpen(!isPopupOpen)
  }

  const openEditPopup = (plan) => {
    setEditPlan(plan)
    setPopupOpen(true)
  }

  const closePopup = () => {
    setSelectedDay('')
    setPopupOpen(false)
  }
  const handleSavePlan = (newPlan) => {
    const updatedPlans = plans.filter(
      (plan) => plan.startDate !== newPlan.startDate,
    )
    updatedPlans.push(newPlan)
    setPlans(updatedPlans)
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
        {daysInMonth.map((day, index) => {
          const currentDay = `${year}-${month + 1}-${day}`
          const planForDay = plans.find(
            (plan) =>
              plan.startDate <= currentDay && plan.endDate >= currentDay,
          )

          return (
            <div key={index} className="calendar-cells">
              <div className="cells-days" onClick={() => openPopup(currentDay)}>
                {day}
                {planForDay && <div>{planForDay.title}</div>}
              </div>
            </div>
          )
        })}
      </div>
      {isPopupOpen && (
        <div className="calendar-popup">
          <PlanPopup
            onClose={closePopup}
            onSave={(newPlan) => {
              if (editPlan) {
                const updatedPlans = plans.map((plan) =>
                  plan.startDate === editPlan.startDate ? newPlan : plan,
                )
                setPlans(updatedPlans)
              } else {
                setPlans([...plans, newPlan])
              }
              closePopup()
            }}
            selectedDay={selectedDay}
            plan={editPlan}
          />
        </div>
      )}
      <style jsx>{`
        .MyCalendar {
          width: 100%;
          height: 100%;
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
          padding: 8px 0 8px 0;
        }

        .calendar {
          display: grid;
          width: 100%;
          height: 80%;

          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }

        .calendar-cells {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-end;
          padding: 10px;
          border: 1px solid #ccc;
          background-color: #fff;
        }

        .cells-days {
        }

        .calendar-popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }
      `}</style>
    </div>
  )
}

export default MyCalendar
