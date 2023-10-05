import React, { useEffect, useState } from 'react'
import '../calendarPlan/calendarPlan.css'

export interface CalendarProps {
  setDayClicked: () => void
  planDate: number
  month: number
  year: number
  title: string
  endDate: string
  memo: string
  onTitleChange: (newTitle: string) => void
  onEndDateChange: (newEndDate: string) => void
  onMemoChange: (newMemo: string) => void
  setSavePlan: (value: boolean) => void
  savePlanHandler: () => void
  setPlanContent: () => void
  setStartDate: (passedDate: string) => void
}
export const CalendarPlan: React.FC<CalendarProps> = ({
  setDayClicked,
  month,
  year,
  planDate,
  title,
  endDate,
  memo,
  onTitleChange,
  onEndDateChange,
  onMemoChange,
  savePlanHandler,
  setPlanContent,
  setStartDate,
}) => {
  const calendarMonth = month + 1
  const calendarYear = year

  const [passedDate, setPassedDate] = useState(
    new Date(calendarYear, month, planDate + 1).toISOString().substring(0, 10),
  )
  const closeBtnHandler = () => {
    setDayClicked(false)
  }

  const saveBtnHandler = () => {
    savePlanHandler()
    setStartDate(passedDate)
    closeBtnHandler(false)
  }

  return (
    <div className="plan">
      <div className="plan-popup">
        <h1>
          {calendarYear}년 {calendarMonth}월 {planDate}일 일정 추가
        </h1>
        <div className="popup-content">
          <input
            type="text"
            value={title}
            placeholder="제목"
            onChange={(e) => {
              onTitleChange(e.target.value)
            }}
          />
          <div className="popup-calendar">
            <div className="calendar-period">
              <input type="date" value={passedDate} />
            </div>
            <div>~</div>
            <div className="calendar-period">
              <input
                type="date"
                value={endDate}
                min={passedDate}
                onChange={(e) => {
                  onEndDateChange(e.target.value)
                }}
              />
            </div>
          </div>
          <input
            type="text"
            value={memo}
            placeholder="메모"
            onChange={(e) => {
              onMemoChange(e.target.value)
            }}
          />
        </div>
        <div className="popup-btn">
          <button
            onClick={() => {
              saveBtnHandler()
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              closeBtnHandler()
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default CalendarPlan
