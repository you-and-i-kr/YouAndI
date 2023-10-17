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
  const [record, setRecord] = useState<Comment[]>([])
  const handleCommentChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setComment(e.target.value)
  }
  console.log(comments)

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
        <textarea
          placeholder="댓글을 작성해주세요"
          value={comment}
          onChange={handleCommentChange}
        />
        <div className="comment-record-component">
          <CommentRecord comments={comments} setComments={setComments} />
        </div>
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
          justify-content: flex-start;
        }

        .comment-container textarea {
          margin-bottom: 20px;
        }

        .comment-record-component {
          height: 80%;
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
