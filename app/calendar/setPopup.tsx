import React, { useState } from 'react'
import { PlanContent } from './myCalendar'

interface SetPopupProps {
  onClose: () => void
  onSave: (editedPlan: PlanContent) => void
  onDelete: () => void
  plan: PlanContent
}

const SetPopup: React.FC<SetPopupProps> = ({
  onClose,
  onSave,
  onDelete,
  plan,
}) => {
  const [editedPlan, setEditedPlan] = useState<PlanContent>(plan)
  const [editMode, setEditMode] = useState(false)

  const handleEdit = () => {
    setEditMode(!editMode)
  }

  const handleSave = () => {
    onClose()
    onSave(editedPlan)
    setEditMode(false)
  }

  return (
    <div className="set-modal">
      <div className="set-modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2 className="content-type">일정</h2>

        <div className="content-element">
          {editMode ? (
            <input
              type="text"
              value={editedPlan.title}
              onChange={(e) =>
                setEditedPlan({ ...editedPlan, title: e.target.value })
              }
            />
          ) : (
            <div>{plan.title}</div>
          )}
          {editMode ? (
            <div>
              <input
                type="date"
                value={editedPlan.startDate}
                onChange={(e) =>
                  setEditedPlan({ ...editedPlan, startDate: e.target.value })
                }
              />
              <input
                type="date"
                value={editedPlan.endDate}
                onChange={(e) =>
                  setEditedPlan({ ...editedPlan, endDate: e.target.value })
                }
              />
            </div>
          ) : (
            <div className="content-element-date">
              <div>{plan.startDate}</div>~<div>{plan.endDate}</div>
            </div>
          )}
          {editMode ? (
            <textarea
              placeholder="Memo"
              value={editedPlan.memo}
              onChange={(e) =>
                setEditedPlan({ ...editedPlan, memo: e.target.value })
              }
            />
          ) : (
            <div>{plan.memo}</div>
          )}
          {editMode ? (
            <div>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          ) : (
            <div>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={onDelete}>Delete</button>
            </div>
          )}
        </div>
      </div>

      <style jsx>
        {`
          .set-modal {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .close {
            width: 50%;
            margin-bottom: 30px;
            color: white;
          }

          .content-type {
            margin-bottom: 30px;
          }
          .set-modal-content {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .content-element {
            width: 50%;
            height: 30%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
          }

          .content-element-date {
            width: 30%;
            justify-content: space-between;
            display: flex;
          }

          .content-element div {
            color: white;
          }
          .set-modal-content h2 {
            color: white;
          }
        `}
      </style>
    </div>
  )
}

export default SetPopup
