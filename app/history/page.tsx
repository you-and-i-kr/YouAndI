//2. 일기장 및 앨범 화면
'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Wrapper from '../components/Wrapper'
import Album from './album'

import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage'

import {
  getDatabase,
  ref as databaseRef,
  push,
  set,
  onValue,
} from 'firebase/database'

import app from '../../firebase'

const History = () => {
  const [filter, setFilter] = useState('all') // 'all', 'photos', 'videos'
  // const [contents, setContents] = useState<File[]>([])
  const [imagesData, setImagesData] = useState<any[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  console.log(imagesData)
  const storage = getStorage(app)
  const database = getDatabase(app)

  const handleFilterChange = (type: string) => {
    setFilter(type)
  }
  const contentNumber = imagesData && imagesData.length

  const images = imagesData.filter((file) => file.type.startsWith('image/'))
  const imagesNumber = images && images.length
  const videos = imagesData.filter((file) => file.type.startsWith('video/'))
  const videosNumber = videos.length

  useEffect(() => {
    const contentsRef = databaseRef(database, 'contents')
    const unsubscribe = onValue(contentsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const imagesArray = Object.values(data)
        setImagesData(imagesArray)
        console.log(images)
      }
    })

    return () => unsubscribe()
  }, [database])

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return
      }

      const files = Array.from(e.target.files)

      for (const file of files) {
        const storageRefInstance = storageRef(storage, `uploads/${file.name}`)

        try {
          // 파베 스토리지에 데이터 넣기
          await uploadBytes(storageRefInstance, file)

          const downloadURL = await getDownloadURL(storageRefInstance)

          // 리얼타임 데이터베이스에 넣기
          const contentsRef = databaseRef(database, 'contents')
          const newContentRef = push(contentsRef)

          const contentId = newContentRef.key

          const contentData = {
            contentId,
            name: file.name,
            type: file.type,
            downloadURL,
          }

          // 리얼타임 데이터베이스에 넣기
          await set(newContentRef, contentData)

          console.log('Data added to the Realtime Database:', contentData)
        } catch (error) {
          console.error('Error during file upload:', error)
        }
      }
    },
    [storage, database],
  )
  const handleUploadButtonClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }, [])

  const filteredImages = imagesData.filter((file) => {
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
            <Album contents={filteredImages} />
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
