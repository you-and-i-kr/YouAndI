'use client'

import React, { useEffect, useState } from 'react'
import AlbumComment, { Comment } from './comment'
import DeleteConfirmation from './deleteConfirmation'

interface AlbumPopupProps {
  contents: File
  setContentClicked: (value: boolean) => void
  comments: Comment[]
  setComments: (comments: Comment[]) => void
  onDelete: () => void
}

const AlbumPopup: React.FC<AlbumPopupProps> = ({
  onDelete,
  contents,
  setContentClicked,
  comments,
  setComments,
}) => {
  const [deleteContent, setDeleteContent] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)

  const deleteHandler = () => {
    setDeleteContent(!deleteContent)
  }

  const closeWindowBtnHandler = () => {
    setContentClicked(false)
  }

  const confirmDelete = () => {
    onDelete()
    setDeleteConfirmation(false)
  }

  const cancelDelete = () => {
    setDeleteConfirmation(false)
  }

  useEffect(() => {
    const handleContentDelete = (e: MouseEvent) => {
      if (
        deleteContent &&
        e.target instanceof Element &&
        !e.target.classList.contains('content-delete-box')
      ) {
        setDeleteContent(false)
      }
    }
    document.addEventListener('click', handleContentDelete)
    return () => {
      document.removeEventListener('click', handleContentDelete)
    }
  }, [deleteContent])
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
      <div className="content-btns-box">
        <div className="content-delete-con">
          <button
            className="content-delete-box"
            onClick={() => {
              deleteHandler()
            }}
          >
            :
          </button>
          {deleteContent ? (
            <button
              className="content-delete-btn"
              onClick={() => setDeleteConfirmation(true)}
            >
              삭제
            </button>
          ) : (
            ''
          )}
        </div>

        <div className="content-close-box">
          <button
            className="close-box-btn"
            onClick={() => {
              closeWindowBtnHandler()
            }}
          >
            𝖷
          </button>
        </div>
      </div>
      {deleteConfirmation && (
        <div className="deleteConfirmation-box">
          <DeleteConfirmation
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
          />
        </div>
      )}
      <style jsx>
        {`
          .AlbumPopup {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
          }

          .popup-content {
            display: flex;
            position: relative;
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
            height: 500px;
            width: 500px;
          }

          .content-img img {
            height: 100%;
            width: 100%;     
            object-fit: contain;
            }
          
          .content-img video {
            height: 100%;
            width: 100%;     
            object-fit: contain;  
          }

          .popup-comment {
            display: flex;
            width: 30%;
            height: 100%;
            display: flex;
            justify-content: flex-start;
            margin-left: 20px;
          }
        .content-btns-box {
          display: flex;
          align-items: center;
          position: absolute;
          top: 70px;
          right: 170px;
        }
          .content-delete-box {
            font-weight: 700;
            font-size: 20px;
            color: white;
            border: none;
            background-color: transparent;
          }
          .content-delete-btn {
            position: absolute;
            top: 5px;
            left:20px;
            width: 50px;
            border: none;
            border-radius: 5px;
            color:black
            background-color: #ecedf1;
          }

          .content-close-box {
          display: flex;
          }
          .close-box-btn {
            font-size: 20px;
            color: white;
            border: none;
            background-color: transparent;
          }

          .deleteConfirmation-box {
            position: absolute;
            top: 300px;
            width: 20%;
            z-index: 1000;
          }
        `}
      </style>
    </div>
  )
}

export default AlbumPopup
