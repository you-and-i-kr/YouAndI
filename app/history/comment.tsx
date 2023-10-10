import React, { useState } from 'react'
import CommentRecord from './record'

interface AlbumCommentProps {
  setContentClicked: (value: boolean) => void
}

export interface Comment {
  member_id: number
  text: string
  timestamp: string
}

const AlbumComment: React.FC<AlbumCommentProps> = ({ setContentClicked }) => {
  const [comment, setComment] = useState('')
  const [record, setRecord] = useState<Comment[]>([])
  // console.log('주는쪽', record)

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

    setRecord([...record, newComment])

    setComment('')
  }

  const closeBtnHandler = () => {
    setContentClicked(false)
  }

  return (
    <div className="AlbumComment">
      <div className="comment-container">
        <textarea
          placeholder="댓글을 작성해주세요"
          value={comment}
          onChange={handleCommentChange}
        />
        <CommentRecord record={record} setRecord={setRecord} />
        <div className="comment-btn">
          <button
            onClick={() => {
              closeBtnHandler()
            }}
          >
            Close
          </button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <style jsx>{`
        .AlbumComment {
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
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .comment-btn {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  )
}

export default AlbumComment
