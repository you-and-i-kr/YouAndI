import React, { useState } from 'react'
import { Comment } from './comment'

interface CommentRecordProps {
  record: Comment[]
}

const CommentRecord: React.FC<CommentRecordProps> = ({ record }) => {
  const [comentDelete, setCommentDelete] = useState(false)
  const deleteHandler = () => {
    setCommentDelete(!comentDelete)
  }

  console.log(setCommentDelete)
  const commentDeleteBtn = () => {}
  return (
    <div>
      {record.map((comment) => (
        <div className="comment-records">
          <div className="comment-record-con">
            <div className="comment-record-text">{comment.text}</div>
            <div className="comment-record-timestamp">{comment.timestamp}</div>
          </div>
          <button
            className="comment-record-delete-btn"
            onClick={() => {
              deleteHandler()
            }}
          >
            :
          </button>
          {comentDelete && <div className="delete-btn-content">삭제</div>}
        </div>
      ))}
      <style jsx>
        {`
          .comment-records {
            display: flex;
          }
          .comment-record-con {
            display: flex;
            flex-direction: column;
            color: white;
          }
          .comment-record-text {
            font-size: 15px;
            margin-bottom: 10px;
          }
          .comment-record-timestamp {
            font-size: 10px;
          }
          .comment-record-delete-btn {
            border: none;
            background-color: transparent;
            font-size: 15px;
            color: white;
          }
          .delete-btn-content {
            color: white;
            font-size: 15px;
          }
        `}
      </style>
    </div>
  )
}

export default CommentRecord
