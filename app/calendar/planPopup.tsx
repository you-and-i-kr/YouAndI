import React, { useState } from 'react'
import { PlanContent } from './myCalendar'

interface PlanPopupProps {
  onClose: () => void
  onSave: (newPlan: PlanContent) => void
  selectedDay: string
  plan: PlanContent | null
}

export const PlanPopup: React.FC<PlanPopupProps> = ({
  onClose,
  onSave,
  plan,
  selectedDay,
}) => {
  const [title, setTitle] = useState(plan ? plan.title : '')
  const [startDate, setStartDate] = useState(plan ? plan.startDate : '')
  const [endDate, setEndDate] = useState(plan ? plan.endDate : '')
  const [memo, setMemo] = useState(plan ? plan.memo : '')

  const minDate = new Date(selectedDay)
  minDate.setDate(minDate.getDate())
  const year = minDate.getFullYear()
  const month = String(minDate.getMonth() + 1).padStart(2, '0')
  const day = String(minDate.getDate()).padStart(2, '0')
  const minDateString = `${year}-${month}-${day}`

  const handleSave = () => {
    onSave({ title, startDate, endDate, memo })
    onClose()
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="content-type">일정</div>
        <div className="content-element-box">
          <input
            className="elements"
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="content-date-box">
            <input
              className="elements"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={minDateString}
            />
            <input
              className="elements"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={minDateString}
            />
          </div>
          <div className="elements-line"></div>

          <div className="elements">메모</div>
          <textarea
            placeholder="메모를 입력하세요"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
          <div className="content-button-box">
            <button className="content-button" onClick={handleSave}>
              저장
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .modal {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          position: relative;
          width: 40%;
          height: 60%;
          background-color: white;
          color: black;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }

        .content-type {
          color: #eeb9be;
          font-weight: 700;
          font-size: 20px;
          margin-top: 30px;
        }
        .content-element-box {
          position: relative;
          width: 65%;
          height: 80%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .content-element-box  textarea {
          border: none;
          background-color: #f7f7f7;

        }

        .content-date-box {
          width: 100%
          display: flex;
          flex-direction: column;
        }

        .elements-line {
            width: 100%;
            border-bottom: 2px solid #F7F7F7;
            margin-bottom: 20px;
          }

        .elements {
          color: black;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .modal-content input  {
          border: none;
          background-color: #f7f7f7;
          font-size: 14px;
        }
       
      
        .close {
          position: absolute;
          top: 10px;
          left: 10px;
        }
        .content-button-box {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .content-button{
          position: absolute;
          bottom: 50px;
          border: none;
          background-color: #f7f7f7;
        }
      `}</style>
    </div>
  )
}

export default PlanPopup
