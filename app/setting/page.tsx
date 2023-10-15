'use client'

import Wrapper from '../components/Wrapper'

//환경설정/프로필 화면
export default function Setting() {
  return (
    <>
      <Wrapper>
        <div className="setting-list">
          <div className="setting-item title">
            <div>기록장 이름</div>
            <div className="user-title">
              <div>말랑콩떡</div>
              <button>수정</button>
            </div>
          </div>

          <div className="setting-item start-date">
            <div>기록장 생성일</div>
            <div>2022/01/01</div>
          </div>

          <div className="setting-item secession">
            <div>파트너와 헤어지기</div>
            <div>(데이터 영구삭제)</div>
          </div>
        </div>
      </Wrapper>

      <style jsx>{`
        .setting-list {
          width: 100%;
        }

        .setting-item {
          background: #f7f7f7;
          margin: 20px;
          padding: 20px;
        }

        .title,
        .start-date {
          display: flex;
          justify-content: space-between;
        }

        .user-title {
          display: flex;
          align-items: center;
        }

        .user-title button {
          margin-left: 10px;
          cursor: pointer;
        }

        .secession {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      `}</style>
    </>
  )
}
