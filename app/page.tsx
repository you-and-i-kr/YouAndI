'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Wrapper from './components/Wrapper'
import axios from 'axios'

//1. 홈화면
export default function Home() {
  const router = useRouter()

  const alarms = [
    { content: '남자친구 님이 메모를 새로 작성했습니다.', isRead: false },
    { content: '남자친구님이 사진을 추가하셨습니다.', isRead: true },
    { content: '남자친구님이 사진에 댓글을 추가하셨습니다.', isRead: true },
    { content: '남자친구님이 일정을 등록하였습니다.', isRead: true },
  ]

  /**
   * 예시 fetch 입니다
   */
  const { data: session } = useSession()

  const [phontos, setPhotos] = useState()

  useEffect(() => {
    if (!session?.accessToken) {
      return router.replace('/sign-in')
    }
    async function getPhotos() {
      const result = await axios.get(`http://13.125.249.67:8080/api/photos`, {
        headers: {
          ACCESS_TOKEN: session?.accessToken,
        },
      })

      setPhotos(result.data)
    }
    getPhotos()
  }, [session, router])

  console.log(phontos)
  /**
   * 예시 fetch 입니다
   */

  return (
    <Wrapper>
      <div className="direction-changer">
        {/* header: 달력 아이콘, 하트 모으기 */}
        <header className="home-header">
          <div className="icon-wrapper">
            <Link href="/calendar" style={{ textAlign: 'center' }}>
              <img src="/calendar.svg" />
            </Link>
          </div>
          <div className="icon-wrapper">
            <Link href="/history" style={{ textAlign: 'center' }}>
              <img src="/image-upload.svg" />
            </Link>
          </div>
        </header>

        {/* main */}
        <main className="home-main">
          {/* 프로필 사진 & Link */}
          <div className="home-main__profile">
            <div className="home-main__image-wrapper">
              <img
                src="https://mblogthumb-phinf.pstatic.net/MjAyMjAxMDdfMjUg/MDAxNjQxNTQxMTU0NjQ5.wJF87eSDcrEaj-Q1qFAn6EXBYDn5Ky-96vd8JkcQjw4g.P09T_flYvkP8ornyd1eZgT2w938smesRrZBdwKTPc-cg.JPEG.41minit/1641533871473.jpg?type=w800"
                alt="상대방의 프로필 사진"
              />
            </div>
            <div className="home-main__counter-wrapper">
              <div className="home-main__counter-title">만난지</div>
              <div>
                <span style={{ color: '#DF5B7B', fontWeight: '600' }}>500</span>
                <span className="home-main__counter-counting">일 째</span>
              </div>
            </div>
            <div className="home-main__image-wrapper">
              <img
                src="https://post-phinf.pstatic.net/MjAyMjExMTdfMTk2/MDAxNjY4NjUwMjc5NDg3.eJQEdOpjRAniq4HQmFKfiQu3IfM6I2lia-TovWEzr1Ig.L9eqGwRs9gzkBxfWk3-AU3rvk1z5haAv093Isfvvr24g.JPEG/8d45fd407a3344b9b7457538ec64e0f8.jpg?type=w1200"
                alt="사용자의 프로필 사진"
              />
            </div>
          </div>

          {/* 새로운 활동 알림 */}
          <div className="home-main__alarm-wrapper">
            {alarms.map((alarm) => (
              <div
                key={alarm.content}
                className={
                  alarm.isRead === true
                    ? 'home-main__alarm-item home-main__alarm-item--read'
                    : 'home-main__alarm-item home-main__alarm-item--new'
                }
              >
                {alarm.content}
              </div>
            ))}
          </div>
        </main>
      </div>

      <style jsx>{`
        .direction-changer {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 70px;
        }

        // header
        .home-header {
          width: 100%;
          height: 35px;
          font-size: small;

          display: flex;
          flex-direction: row;
          justify-content: end;
          align-items: center;
          gap: 5px;
        }

        .icon-wrapper {
          width: 45px;
          height: 25px;
          background: #fbdbe0;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 20px;
          cursor: pointer;
          margin-right: 10px;
          box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        }

        .icon-wrapper a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .icon-wrapper img {
          width: 35%;
        }

        // main
        .home-main {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 80px;
          margin-bottom: 30px;
        }

        .home-main__profile {
          display: flex;
          align-items: center;
          gap: 50px;
        }

        .home-main__profile img {
          width: 100px;
        }

        .home-main__image-wrapper {
          width: 100px;
          height: 100px;
          overflow: hidden;
          border-radius: 50%;
        }

        .home-main__counter-wrapper {
          display: flex;
          flex-direction: column;
          justify-contents: center;
          align-items: center;
          gap: 5px;
        }

        .home-main__counter-title {
          font-size: small;
        }

        .home-main__alarm-wrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .home-main__alarm-item {
          width: fit-content;
          padding: 20px;
          color: white;
          border-radius: 20px;
        }

        .home-main__alarm-item--read {
          background-color: #eeb9be;
        }

        .home-main__alarm-item--new {
          background-color: #df5b7b;
        }
      `}</style>
    </Wrapper>
  )
}
