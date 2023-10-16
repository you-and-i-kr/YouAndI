'use client'

import Wrapper from '../components/Wrapper'
import ChatMessage from './message'

export type ChatType = {
  id: string
  sender: string
  createdAt: string
  content: string
  sameTime: number
}

//4. 채팅화면
export default function Chat() {
  const chatting = [
    {
      id: 'a1',
      sender: '1',
      receiver: '2',
      createdAt: '15:01',
      content: '나 지금 도착했어',
    },
    {
      id: 'a2',
      sender: '2',
      receiver: '1',
      createdAt: '15:04',
      content: '아 진짜?',
    },
    {
      id: 'a3',
      sender: '2',
      receiver: '1',
      createdAt: '15:04',
      content: '난 아직 버스야 ㅠㅠ',
    },
    {
      id: 'a4',
      sender: '2',
      receiver: '1',
      createdAt: '15:05',
      content:
        '추우면 먼저 들어가있어! 옆에 아마 우리 얼마 전에 봤던 카페 있을텐데 자리가 있을지는 모르겠당',
    },
  ]

  let previousTime = ''
  const newChatData = chatting.map((chat) => {
    const sameTime = chat.createdAt === previousTime ? 0 : 1
    previousTime = chat.createdAt

    return { ...chat, sameTime }
  })

  return (
    <Wrapper>
      <div className="chatting">
        <div className="chatting-wrapper">
          {newChatData.map((chat) => (
            <ChatMessage key={chat.id} chat={chat}></ChatMessage>
          ))}
        </div>

        <div className="chatting-input">
          <input type="file" style={{ display: 'none' }} id="input-file" />
          <label className="input-file__label" htmlFor="input-file">
            <img src="image-upload.svg" />
          </label>
          <input
            className="chatting-input__text"
            placeholder="메시지를 입력해주세요!"
          />
          <div className="send-chat-wrapper">
            <img src="send-chat.svg" />
          </div>
        </div>
      </div>
      <style jsx>{`
        .chatting {
          width: 90%;
          height: 80vh;
          padding: 30px 40px;
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          justify-content: space-between;
        }

        .chatting-wrapper {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .chatting-input {
          position: sticky;
          height: 25px;
          top: 85vh;
          background-color: #ecedf1;
          padding: 10px 20px;
          border-radius: 20px;
          font-size: 14px;

          display: flex;
          align-items: center;
          gap: 20px;
        }

        .chatting-input img {
          width: 20px;
        }

        .input-file__label {
          cursor: pointer;
        }

        .chatting-input__text {
          width: calc(100% - 40px);
          height: fit-content;
          border: none;
          background-color: transparent;
          overflow: auto;
          resize: none;
        }

        .chatting-input__text:hover,
        .chatting-input__text:focus {
          outline: none;
        }

        .send-chat-wrapper {
          width: 15px;
          height: 15px;
          background-color: #df5b7b;
          padding: 5px;
          border-radius: 45px;
        }

        .send-chat-wrapper img {
          width: 15px;
        }
      `}</style>
    </Wrapper>
  )
}
