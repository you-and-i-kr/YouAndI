import React from 'react'

const Album = ({ images }) => {
  console.log(images)
  return (
    <div className="Album">
      <div className="album-grid">
        {images.length > 0 &&
          images.map((content, index) => (
            <div key={index} className="content-item">
              {content.type.startsWith('image/') ||
              content.type.startsWith('video/') ? (
                <div className="media-container">
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
        }

        .media-container img,
        .media-container video {
          width: 100%;
          height: 100%;
        }
        .content-item {
        }
      `}</style>
    </div>
  )
}

export default Album
