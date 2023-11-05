//2. 일기장 및 앨범 화면
'use client'
import React, { useCallback, useRef, useState } from 'react'
import Wrapper from '../components/Wrapper'
import Album from './album'

import Axios from 'axios'

const History = () => {
  const [filter, setFilter] = useState('all') // 'all', 'photos', 'videos'
  const [contents, setContents] = useState<File[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const handleFilterChange = (type: string) => {
    setFilter(type)
  }
  const contentNumber = contents && contents.length

  const images = contents.filter((file) => file.type.startsWith('image/'))
  const imagesNumber = images && images.length
  const videos = contents.filter((file) => file.type.startsWith('video/'))
  const videosNumber = videos.length

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return
      }
      const files = Array.from(e.target.files)
      setContents((prevContents) => [...prevContents, ...files])
    },
    [],
  )

  const handleUploadButtonClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }, [])

  const filteredImages = contents.filter((file) => {
    if (filter === 'all') {
      return true
    } else if (filter === 'photos') {
      return file instanceof File && file.type.startsWith('image/')
    } else if (filter === 'videos') {
      return file instanceof File && file.type.startsWith('video/')
    }
    return false
  })

  return (
    <Wrapper>
      <div className="History">
        <div className="history-wrapper">
          <div className="history-title-con">
            <div className="filter-buttons">
              <button onClick={() => handleFilterChange('all')}>
                All ({contentNumber})
              </button>
              <button onClick={() => handleFilterChange('photos')}>
                Photos ({imagesNumber})
              </button>
              <button onClick={() => handleFilterChange('videos')}>
                Videos ({videosNumber})
              </button>
            </div>
            <div className="history-plus-btn">
              <button onClick={handleUploadButtonClick}>+</button>
            </div>
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
            <Album contents={filteredImages} setContents={setContents} />
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
          .filter-buttons {
            margin-bottom: 30px;
          }

          .filter-buttons button {
            border: none;
            background-color: transparent;
            font-size: 20px;
            color: #eeb9be;
          }
          .history-plus-btn button {
            border: none;
            background-color: transparent;
            font-size: 30px;
            color: #eeb9be;
          }
        `}</style>
      </div>
    </Wrapper>
  )
}

export default History
