import React from 'react'
import AlbumComment from './comment'

interface AlbumPopupProps {
  contents: File
  setContentClicked: (value: boolean) => void
  comments: Comment[]
  setComments: (comments: Comment[]) => void
}

const AlbumPopup: React.FC<AlbumPopupProps> = ({
  contents,
  setContentClicked,
  comments,
  setComments,
}) => {
  return (
    <div className="AlbumPopup">
      <div className="popup-content">
        <div className="content-con">
          <div className="content-img">
            {contents.type.startsWith('image/') ? (
              <img src={URL.createObjectURL(contents)} alt={contents.name} />
            ) : contents.type.startsWith('video/') ? (
              <video controls src={URL.createObjectURL(contents)} />
            ) : null}
          </div>
        </div>
      </div>
      <div className="popup-comment">
        <AlbumComment
          setContentClicked={setContentClicked}
          comments={comments}
          setComments={setComments}
        />
      </div>
      <style jsx>
        {`
          .AlbumPopup {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
          }

          .popup-content {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .content-con {
            display: flex;
            flex-direction: column;
            margin-bottom: 30px;
          }
          .content-name {
            margin-bottom: 20px;
          }
          .content-name {
            color: white;
          }
          .content-img {
            max-height: 500px;
            max-width: 500px;
            overflow: hidden;
          }

          .content-img img {
            width: 100%;
            height: 100%;
          }

          .popup-comment {
            height: 100%;
            display: flex;
            justify-content: flex-start;
            margin-left: 20px;
          }

          .popup-btn {
          }
        `}
      </style>
    </div>
  )
}

export default AlbumPopup
