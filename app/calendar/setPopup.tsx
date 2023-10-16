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

        <div className="content-type">일정</div>

        <div className="content-element">
          {editMode ? (
            <input
              className="elements"
              type="text"
              value={editedPlan.title}
              onChange={(e) =>
                setEditedPlan({ ...editedPlan, title: e.target.value })
              }
            />
          ) : (
            <div className="elements">{plan.title}</div>
          )}
          {editMode ? (
            <div className="elements-edit-date">
              <input
                className="elements"
                type="date"
                value={editedPlan.startDate}
                onChange={(e) =>
                  setEditedPlan({ ...editedPlan, startDate: e.target.value })
                }
              />
              <input
                className="elements"
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
          <div className="elements-line"></div>
          <div className="elements">메모</div>
          {editMode ? (
            <textarea
              placeholder="Memo"
              value={editedPlan.memo}
              onChange={(e) =>
                setEditedPlan({ ...editedPlan, memo: e.target.value })
              }
            />
          ) : (
            <div className="elements-memo">{plan.memo}</div>
          )}
          {editMode ? (
            <div className="elements-buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          ) : (
            <div className="elements-buttons">
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

          .set-modal-content {
            position: relative;
            width: 40%;
            height: 60%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            background-color: white;
            color: black;
          }

          .content-type {
            color: #eeb9be;
            font-weight: 700;
            font-size: 20px;
            margin-top: 30px;
          }

          .close {
            position: absolute;
            top: 10px;
            left: 10px;
          }

          .content-element {
            position: relative;
            width: 65%;
            height: 80%;
            display: flex;
            flex-direction: column;
            align-items: flex-start
          }

          .content-element textarea {
           border: 1px solid #F7F7F7;;
          }
          .content-element input {
            border: 1px solid #F7F7F7;;
          }

          .elements {
            color: black;
            font-size: 14px;
            margin-bottom: 20px;
          }
           
          .elements-line {
            width: 100%;
            border-bottom: 2px solid #F7F7F7;
            margin-bottom: 20px;
          }

          .elements-memo {
            font-size: 12px;
            color: #A6A6A6;
            margin-bottom: 20px;
            
          }
          .elements-edit-date {
            width: 100%;
            display: flex;
            flex-direction: column;

          }

          .content-element-date {
            width: 100%
            justify-content: space-between;
            display: flex;
            color: black;
            margin-bottom: 20px;
            font-size: 12px;
            }
            
          .elements-buttons {
            position: absolute;
            bottom: 50px;
            display: flex;
            justify-content: space-between;
            width: 100%;
          }
          .elements-buttons button {
            border: none;
            background-color: #F7F7F7;;
          
          }

         
       
        `}
      </style>
    </div>
  )
}

export default SetPopup
