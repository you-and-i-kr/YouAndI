'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <>
      <header>
        <Link href={'/'}>
          <div className="logo">
            <img className="logo-img" src="/images/logo.png"></img>
          </div>
        </Link>
        <button className="logout">로그아웃</button>
      </header>

      <style jsx>{`
        header {
          height: 100px;
          background-color: #eeb9be;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          height: 60px;
          margin: 20px;
          padding: 5px;
          background-color: #fff;
          border-radius: 10px;
          cursor: pointer;
        }
        .logo-img {
          width: 100%;
          height: 100%;
        }
        .logout {
          all: unset;
          cursor: pointer;
          margin-right: 20px;
          color: #fff;
        }
      `}</style>
    </>
  )
}
