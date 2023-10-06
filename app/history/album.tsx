import React from 'react'

const Album = ({ images }) => {
  return (
    <div className="Album">
      <div className="album-grid">
        {images.length > 0 &&
          images.map((content, index: number) => (
            <div key={index} className="content-item">
              {content.type.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(content)}
                  alt={`Image ${index}`}
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                />
              ) : content.type.startsWith('video/') ? (
                <video
                  controls
                  src={URL.createObjectURL(content)}
                  alt={`Video ${index}`}
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                />
              ) : null}
            </div>
          ))}
      </div>
      <style jsx>{`
        .Album {
          /* Add styles for the Album container */
        }

        .album-grid {
          display: grid;
          grid-template-columns: repeat(
            4,
            1fr
          ); /* Adjust the number of columns as needed */
          gap: 10px;
        }

        .content-item {
          /* Add styles for each content item */
        }
      `}</style>
    </div>
  )
}

export default Album
