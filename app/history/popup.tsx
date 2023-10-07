import React from 'react'
import AlbumComment from './comment'

interface AlbumPopupProps {
  images: File
  setContentClicked: (value: boolean) => void
}

const AlbumPopup: React.FC<AlbumPopupProps> = ({
  images,
  setContentClicked,
}) => {
  return (
    <div className="AlbumPopup">
      <div className="popup-content">
        <div className="content-con">
          <div className="content-img">
            <img
              src={URL.createObjectURL(images)}
              alt={`Image ${images.name}`}
            />
          </div>
        </div>
      </div>
      <div className="popup-comment">
        <AlbumComment setContentClicked={setContentClicked} />
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
