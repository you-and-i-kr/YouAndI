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
  const minDateString = minDate.toISOString().split('T')[0]
  //1의 자리수 날짜에는 지금 적용안되고 있음 나중에 고칠 것

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
        <h2>{plan ? 'Edit Plan' : 'Create Plan'}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min={minDateString}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={minDateString}
        />
        <textarea
          placeholder="Memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
        <button onClick={handleSave}>Save Plan</button>
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
          width: 50%;
          height: 60%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }

        .modal-content h2 {
          color: white;
        }
        .modal-content input {
          border: none;
        }
        .modal-content input:focus {
          outline: none;
        }
      `}</style>
    </div>
  )
}

export default PlanPopup
