import React, { useEffect, useState } from 'react'
import { Comment } from './comment'

interface CommentRecordProps {
  comments: Comment[]
  setComments: (comments: Comment[]) => void
}

const CommentRecord: React.FC<CommentRecordProps> = ({
  comments,
  setComments,
}) => {
  const [commentoDelete, setCommentDelete] = useState<number | null>(null)

  const deleteHandler = (index: number) => {
    setCommentDelete(index)
  }

  const deleteComment = () => {
    if (commentoDelete !== null) {
      const updatedComments = comments.filter(
        (_, index) => index !== commentoDelete,
      )
      setComments(updatedComments)
      setCommentDelete(null)
    }
  }

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (
        commentoDelete !== null &&
        e.target instanceof Element &&
        !e.target.classList.contains('comment-record-delete-btn')
      ) {
        setCommentDelete(null)
      }
    }
    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [commentoDelete])

  return (
    <div className="records">
      {comments.map((comment, index) => (
        <div className="comment-records" key={index}>
          <div className="comment-record-con">
            {/* 나중에 여기다가 유저 닉네임이나 사진 첨부 */}
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
            <div className="delete-btn-comment" onClick={deleteComment}>
              삭제
            </div>
          )}
        </div>
      ))}
      <style jsx>
        {`
          .record {
            width: 100%;
            height: 100%;
          }
          .comment-records {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin: 20px 0 20px 0;
          }
          .comment-record-con {
            position: relative;
            display: flex;
            flex-direction: column;
            color: black;
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
            color: black;
          }
          .delete-btn-comment {
            position: absolute;
            right: 25px;
            color: black;
            border: none;
            font-size: 12px;
          }
        `}
      </style>
    </div>
  )
}

export default CommentRecord
