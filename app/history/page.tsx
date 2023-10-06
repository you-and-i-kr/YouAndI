//2. 일기장 및 앨범 화면
'use client'
import React, { useEffect, useRef, useState } from 'react'
import Wrapper from '../components/Wrapper'
import Album from './album'

const History = () => {
  const [filter, setFilter] = useState('all') // 'all', 'photos', 'videos'
  const [images, setImages] = useState([])
  const fileInputRef = useRef(null)

  useEffect(() => {
    fileInputRef.current = document.createElement('input')
    fileInputRef.current.type = 'file'
    fileInputRef.current.accept = 'image/*'
    fileInputRef.current.style.display = 'none'
    fileInputRef.current.multiple = true
    fileInputRef.current.addEventListener('change', handleImageUpload)
  }, [])

  const handleFilterChange = (type) => {
    setFilter(type)
  }

  const handleImageUpload = (e) => {
    const files = e.target.files
    if (files.length > 0) {
      const newImages = [...images]
      for (let i = 0; i < files.length; i++) {
        newImages.push(files[i])
      }
      setImages(newImages)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const filteredImages = images.filter((file) => {
    if (filter === 'all') {
      return file
    } else if (filter === 'photos') {
      return file.type.startsWith('image/')
    } else if (filter === 'videos') {
      return file.type.startsWith('video/')
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
            <button onClick={handleButtonClick}>+</button>
          </div>
          <input
            type="file"
            accept="image/*, video/*"
            style={{ display: 'none' }}
            multiple
            onChange={handleImageUpload}
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
