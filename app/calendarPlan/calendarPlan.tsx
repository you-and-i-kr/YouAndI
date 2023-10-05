import React, { useState } from 'react'
import '../calendarPlan/calendarPlan.css'

export interface CalendarProps {
  setDayClicked: () => void
  planDate: number
  title: string
  startDate: string
  endDate: string
  memo: string
  onTitleChange: (newTitle: string) => void
  onStartDateChange: (newStartDate: string) => void
  onEndDateChange: (newEndDate: string) => void
  onMemoChange: (newMemo: string) => void
  setSavePlan: (value: boolean) => void // Add this prop
  savePlanHandler: () => void // Add this prop
}

export const CalendarPlan: React.FC<CalendarProps> = ({
  setDayClicked,
  planDate,
  title,
  startDate,
  endDate,
  memo,
  onTitleChange,
  onStartDateChange,
  onEndDateChange,
  onMemoChange,
  savePlanHandler,
}) => {
  const closeBtnHandler = () => {
    setDayClicked(false)
  }

  const saveBtnHandler = () => {
    savePlanHandler() // Call the savePlanHandler when the "Save" button is clicked
    closeBtnHandler(false) // Close the popup after saving
  }

  return (
    <div className="plan">
      <div className="plan-popup">
        <h1>{planDate}일 일정 추가</h1>
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
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  onStartDateChange(e.target.value)
                }}
              />
            </div>
            <div>~</div>
            <div className="calendar-period">
              <input
                type="date"
                value={endDate}
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
