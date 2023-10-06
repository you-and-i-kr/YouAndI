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
  console.log('넘어온 이미지', images)
  const closeBtnHandler = () => {
    setContentClicked(false)
  }

  return (
    <div className="AlbumPopup">
      <div className="popup-content">
        <div>{images.name}</div>
        <div className="content-img">
          <img src={URL.createObjectURL(images)} alt={`Image ${images.name}`} />
        </div>
        <div className="popup-comment">
          <AlbumComment />
        </div>
      </div>
      <div className="popup-btn">
        <button
          onClick={() => {
            closeBtnHandler()
          }}
        >
          Close
        </button>
      </div>

      <style jsx>
        {`
          .AlbumPopup {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
          }
          .popup-content {
            width: 50%;
            height: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
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
