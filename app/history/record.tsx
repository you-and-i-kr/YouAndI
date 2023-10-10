import React, { useState } from 'react'
import { Comment } from './comment'

interface CommentRecordProps {
  setRecord: (value: Comment[]) => void
  record: Comment[]
}

const CommentRecord: React.FC<CommentRecordProps> = ({ record, setRecord }) => {
  const [commentoDelete, setCommentDelete] = useState<number | null>(null)
  const deleteHandler = (index: number) => {
    setCommentDelete(index)
  }
  // console.log('받아온거', record)

  const deleteComment = () => {
    if (commentoDelete !== null) {
      const updatedComments = record.filter(
        (_, index) => index !== commentoDelete,
      )
      setRecord(updatedComments)
      setCommentDelete(null)
    }
  }

  return (
    <div>
      {record.map((comment, index) => (
        <div className="comment-records" key={index}>
          <div className="comment-record-con">
            <div className="comment-record-text">{comment.text}</div>
            <div className="comment-record-timestamp">{comment.timestamp}</div>
          </div>
          <button
            className="comment-record-delete-btn"
            onClick={() => {
              deleteHandler(index)
            }}
          >
            :
          </button>
          {commentoDelete === index && (
            <div className="delete-btn-content" onClick={deleteComment}>
              삭제
            </div>
          )}
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
