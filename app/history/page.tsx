//2. 일기장 및 앨범 화면
'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Wrapper from '../components/Wrapper'
import Album from './album'

const History = () => {
  const [filter, setFilter] = useState('all') // 'all', 'photos', 'videos'
  const [images, setImages] = useState<File[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const handleFilterChange = (type: string) => {
    setFilter(type)
  }

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return
      }
      const files = Array.from(e.target.files)
      setImages((prevImages) => [...prevImages, ...files])
    },
    [],
  )

  const handleUploadButtonClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }, [])

  const filteredImages = images.filter((file) => {
    if (filter === 'all') {
      return true
    } else if (filter === 'photos') {
      return file instanceof File && file.type.startsWith('image/')
    } else if (filter === 'videos') {
      return file instanceof File && file.type.startsWith('video/')
    }
    return false
  })

  const renderFilterButtons = () => {
    return (
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange('all')}>All</button>
        <button onClick={() => handleFilterChange('photos')}>Photos</button>
        <button onClick={() => handleFilterChange('videos')}>Videos</button>
      </div>
    )
  }
  return (
    <Wrapper>
      <div className="History">
        <div className="history-wrapper">
          <div className="history-title-con">
            <div className="history-title">{renderFilterButtons()}</div>
            <button onClick={handleUploadButtonClick}>+</button>
          </div>
          <input
            type="file"
            accept="image/*, video/*"
            style={{ display: 'none' }}
            multiple
            onChange={handleImageUpload}
            ref={inputRef}
            className="imageInput"
          />
          <label htmlFor="imageInput">
            <Album images={filteredImages} />
          </label>
        </div>
        <style jsx>{`
          .History {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .history-wrapper {
            width: 80%;
            height: 80%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .history-title-con {
            width: 80%;
            display: flex;
            justify-content: space-between;
          }
          .history-title {
            display: flex;
            width: 30%;
          }
        `}</style>
      </div>
    </Wrapper>
  )
}

export default History
