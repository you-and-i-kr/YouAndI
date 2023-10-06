import React, { useState } from 'react'

const AlbumComment: React.FC = () => {
  const [comment, setComment] = useState('')

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  const handleSubmit = () => {}

  return (
    <div className="AlbumComment">
      <div className="comment-container">
        <textarea
          placeholder="Write your comment here..."
          value={comment}
          onChange={handleCommentChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default AlbumComment
