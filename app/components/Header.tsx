'use client'

import Link from 'next/link'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { auth } from '../../firebase'

export default function Header() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await auth.signOut()
      router.push('/sign-in')
    } catch (error: any) {
      console.error('Error during logout:', error.message)
    }
  }

  return (
    <>
      <header>
        <Link href={'/'}>
          <div className="logo">
            <img className="logo-img" src="/images/logo.png"></img>
          </div>
        </Link>
        {user ? (
          <button className="logout" onClick={handleLogout}>
            로그아웃
          </button>
        ) : (
          <Link href={'/sign-in'}>
            <button className="logout">로그인</button>
          </Link>
        )}
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
