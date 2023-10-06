import React, { useState } from 'react'
import AlbumPopup from './popup'

export interface AlbumProps {
  images: File[]
}

const Album: React.FC<AlbumProps> = ({ images }) => {
  const [contentClicked, setContentClicked] = useState(false)
  const [clickedContentIndex, setClickedContentIndex] = useState<number | null>(
    null,
  )

  const contentClickHandler = (index: number) => {
    setContentClicked(!contentClicked)
    setClickedContentIndex(index)
  }

  return (
    <div className="Album">
      <div className="album-grid">
        {images.length > 0 &&
          images.map((content, index) => (
            <div key={index} className="content-item">
              {content.type.startsWith('image/') ||
              content.type.startsWith('video/') ? (
                <div
                  className="media-container"
                  onClick={() => contentClickHandler(index)}
                >
                  {content.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(content)}
                      alt={`Image ${index}`}
                    />
                  ) : content.type.startsWith('video/') ? (
                    <video
                      controls
                      src={URL.createObjectURL(content)}
                      alt={`Video ${index}`}
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          ))}
      </div>
      {contentClicked && (
        <div className="content-popup">
          <AlbumPopup
            setContentClicked={setContentClicked}
            images={images[clickedContentIndex]}
          />
        </div>
      )}
      <style jsx>{`
        .Album {
        }

        .album-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .media-container {
          max-height: 200px;
          max-width: 200px;
          overflow: hidden;
          position: relative;
        }

        .media-container img,
        .media-container video {
          width: 100%;
          height: 100%;
        }
        .content-item {
        }

        .content-popup {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 1000;
        }
      `}</style>
    </div>
  )
}

export default Album
