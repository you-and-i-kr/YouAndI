'use client'

import React, { useEffect, useState } from 'react'
import '../myCalenar/myCalendar.css'
import CalendarPlan from '../calendarPlan/calendarPlan'
import CalendarWithContent from '../calendarWithContent/calendarWithContent'

interface CalendarProps {
  initialYear: number
  initialMonth: number
}

export interface PlanContent {
  date: number
  title: string
  startDate: string
  endDate: string
  memo: string
}
export const MyCalendar = ({ initialYear, initialMonth }: CalendarProps) => {
  const [year, setYear] = useState(initialYear)
  const [month, setMonth] = useState(initialMonth)
  const [dayClicked, setDayClicked] = useState(false)
  const [planDate, setPlanDate] = useState(0) //어떤 날짜가 클릭됐는지
  const [dayWContent, setDayWContent] = useState(false) //일정있는 날
  const [plancontent, setPlanContent] = useState({
    title: '',
    startDate: '',
    endDate: '',
    memo: '',
  })

  const [fixedPlans, setFixedPlans] = useState<{
    [key: string]: PlanContent
  }>({})

  const handleTitleChange = (newTitle: string) => {
    setPlanContent({ ...plancontent, title: newTitle })
  }

  const handleStartDateChange = (newStartDate: string) => {
    setPlanContent({ ...plancontent, startDate: newStartDate })
  }

  const handleEndDateChange = (newEndDate: string) => {
    setPlanContent({ ...plancontent, endDate: newEndDate })
  }

  const handleMemoChange = (newMemo: string) => {
    setPlanContent({ ...plancontent, memo: newMemo })
  }
  const dayWithContentHandler = (e) => {
    setPlanDate(e)
    setDayWContent(true)
  }
  const dayClickHandler = (e) => {
    setDayClicked(!dayClicked)
    setPlanDate(e)

    //초기화
    setPlanContent({
      title: '',
      startDate: '',
      endDate: '',
      memo: '',
    })
  }

  const savePlanHandler = () => {
    const key = plancontent.startDate
    setFixedPlans((prevPlans) => ({ ...prevPlans, [key]: plancontent }))

    setPlanContent({
      title: '',
      startDate: '',
      endDate: '',
      memo: '',
    })
  }

  useEffect(() => {
    const key = plancontent.startDate
    const planForDay = fixedPlans[key]
    if (planForDay) {
      // If there's a plan for the selected day, populate plancontent
      setPlanContent(planForDay)
    } else {
      // If there's no plan for the selected day, reset plancontent
      setPlanContent({
        title: '',
        startDate: '',
        endDate: '',
        memo: '',
      })
    }
  }, [plancontent.startDate, fixedPlans])

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
          <div key={index} className="calendar-cells">
            <div
              className="cells-days"
              onClick={() => {
                dayClickHandler(day)
              }}
            >
              {day}
            </div>
            {fixedPlans
              .filter((plan) => plan.date === day)
              .map((plan, index) => (
                <div
                  key={index}
                  className="plan-info"
                  onClick={() => {
                    dayWithContentHandler(day)
                  }}
                >
                  <p>{plan.title}</p>
                </div>
              ))}
          </div>
        ))}
      </div>
      {dayWContent && (
        <CalendarWithContent fixedPlans={fixedPlans} planDate={planDate} />
      )}
      {dayClicked && (
        <div className="calendar-plan-popup">
          <CalendarPlan
            month={month}
            year={year}
            planDate={planDate}
            setDayClicked={setDayClicked}
            setPlanContent={setPlanContent}
            title={plancontent.title}
            startDate={plancontent.startDate}
            endDate={plancontent.endDate}
            memo={plancontent.memo}
            onTitleChange={handleTitleChange}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
            onMemoChange={handleMemoChange}
            savePlanHandler={savePlanHandler}
          />
        </div>
      )}
    </div>
  )
}

export default MyCalendar
