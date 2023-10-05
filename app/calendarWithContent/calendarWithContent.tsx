import React from 'react'
import { CalendarProps } from '../calendarPlan/calendarPlan'
import '../calendarWithContent/calendarWithContent.css'

export const CalendarWithContent: React.FC<CalendarProps> = ({
  dayPlans,
  planDate,
}) => {
  console.log(dayPlans[planDate])
  const content = dayPlans[planDate]
  return (
    <div className="CalenderWithContent">
      <div className="popup">
        {dayPlans[planDate] && (
          <div className="popup-con">
            <h1 className="popup-title">제목:{content.title}</h1>
            <div className="popup-date">
              <div className="content">{content.startDate}</div>
              <div className="content">~</div>
              <div className="content">{content.endDate}</div>
            </div>
            <div className="content-memo">
              <h2 className="content-title">메모</h2>
              <div className="content">{content.memo}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalendarWithContent
