import React from 'react'
import { CalendarProps } from './calendarPlan'

export const CalendarWithContent: React.FC<CalendarProps> = ({
  fixedPlans,
  planDate,
}) => {
  const plansForDate = fixedPlans.filter((plan) => plan.date === planDate)

  return (
    <div className="CalenderWithContent">
      <div className="popup">
        {plansForDate.length !== 0 && (
          <div className="popup-con">
            {plansForDate.map((content, index) => (
              <div key={index} className="popup-box">
                <h1 className="popup-title">제목: {content.title}</h1>
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
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .CalenderWithContent {
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
        .popup {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          background-color: #fff;
          padding: 40px 20px 0 20px;
          border-radius: 5px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
          width: 50%;
          height: 80%;
          text-align: center;
        }
        .popup h1 {
          margin-bottom: 20px;
        }

        .popup-con {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
        }

        .popup-box {
          width: 50%;
          height: 60%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
        }
        .popup-date {
          display: flex;
        }

        .popup-date .content {
          margin-right: 10px;
        }

        .popup-con .content {
          padding: 0;
          margin-bottom: 20px;
        }

        .content-memo {
          display: flex;
          flex-direction: column;
          justify-self: flex-start;
          align-items: center;
        }
        .content-title {
          font-weight: 700;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  )
}

export default CalendarWithContent
