import React, { useState } from 'react'

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
      <style jsx>{`
        .plan {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .plan-popup {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          background-color: #fff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
          width: 50%;
          height: 80%;
          text-align: center;
        }

        .popup h1 {
          margin-bottom: 10px;
          font-weight: 700;
        }

        .popup-content {
          width: 50%;
          height: 70%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .popup-calendar {
          display: flex;
        }
        .calendar-period {
          display: flex;
          align-content: center;
        }

        .calendar-period {
          display: flex;
          align-items: center;
        }
        input {
          margin-bottom: 20px;
        }
        .popup-btn {
          width: 20%;
          justify-content: space-between;
          display: flex;
        }
      `}</style>
    </div>
  )
}

export default CalendarPlan
