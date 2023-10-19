import React, { useState } from 'react'
import CommentRecord from './record'

interface AlbumCommentProps {
  setContentClicked: (value: boolean) => void
  comments: Comment[]
  setComments: (comments: Comment[]) => void
}

export interface Comment {
  member_id: number
  text: string
  timestamp: string
}

const AlbumComment: React.FC<AlbumCommentProps> = ({
  setContentClicked,
  comments,
  setComments,
}) => {
  const [comment, setComment] = useState('')
  const handleCommentChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setComment(e.target.value)
  }

  const handleSubmit = () => {
    const newComment: Comment = {
      member_id: 1234,
      text: comment,
      timestamp: new Date().toLocaleString(),
    }

    // setRecord([...record, newComment])
    setComments([...comments, newComment])

    setComment('')
  }

  const closeBtnHandler = () => {
    setContentClicked(false)
  }

  return (
    <div className="AlbumComment">
      <div className="comment-container">
        <div className="comment-record-component">
          <CommentRecord comments={comments} setComments={setComments} />
        </div>
        <div className="record-writing-box">
          <textarea
            className="comment-record-textarea"
            placeholder="댓글 달기"
            value={comment}
            onChange={handleCommentChange}
          />
          <button
            className="writing-box-btn
          "
            onClick={handleSubmit}
          >
            ⬆
          </button>
        </div>
      </div>
      <style jsx>{`
        .AlbumComment {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .comment-container {
          width: 100%;
          height: 70%;
          background-color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .comment-record-component {
          width: 80%;
          height: 80%;
          overflow: scroll;
        }
        .record-writing-box {
          display: flex;
          width: 80%;
          height: 8%;
          align-items: center;
          justify-content: center;
          background-color: #ecedf1;
          border-radius: 30px;
        }
        .writing-box-btn {
          width: 30px;
          height: 30px;
          border-radius: 50px;
          border: none;
          color: white;
          background-color: #de5a7b;
        }
        .comment-record-textarea {
          border: none;
          width: 85%;
          height: 100%;
          line-height: 30px;
          height: 30px;
          background-color: transparent;
        }
      `}</style>
    </div>
  )
}

export default AlbumComment
