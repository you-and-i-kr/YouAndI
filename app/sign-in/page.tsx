'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

//로그인 화면
export default function SignIn() {
  const router = useRouter()

  const { data: session } = useSession()

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  // const handleInputForOnlyNumber = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     e.target.value = e.target.value.replace(/[^0-9]/g, '')
  //   },
  //   [],
  // )

  const handleLogin = useCallback(async () => {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.status === 200) {
      router.replace('/')
    } else {
      setErrorMessage(
        `전화번호, 이메일 또는 비밀번호를 잘못 입력하였습니다.\n \n다시 입력해 주세요.`,
      )
    }
  }, [email, password, router])

  useEffect(() => {
    if (session?.user) {
      router.replace('/')
    } else {
    }
  }, [session, router])

  return (
    <>
      <div className="sign-in">
        <div className="inputs">
          {/* <input
            type="tel"
            placeholder="휴대폰 번호 (11자리 '-' 없이 입력)"
            maxLength={11}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onInput={handleInputForOnlyNumber}
          /> */}
          <input
            type="email"
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {errorMessage && <p className="errorMessage">{errorMessage}</p>}

        <button
          className="sign-in-btn"
          disabled={!email || !password}
          onClick={handleLogin}
        >
          로그인
        </button>
        <Link href={'/sign-up'} style={{ textDecoration: 'none' }}>
          <button className="sign-up-btn">회원가입</button>
        </Link>
      </div>
      <style jsx>{`
        .sign-in {
          width: 100%;
          height: calc(100vh - 100px);
          background: #f7f7f7;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .inputs {
          width: 500px;
          display: flex;
          flex-direction: column;
          margin-bottom: 50px;
        }

        .inputs input {
          width: 100%;
          border: none;
          background: none;
          outline: none;
          margin: 10px 0;
          padding-bottom: 10px;
          border-bottom: 1px solid #000;
        }

        .errorMessage {
          color: red;
          font-weight: 300;
          white-space: pre-wrap;
          text-align: center;
          margin-bottom: 10px;
        }

        .sign-in-btn,
        .sign-up-btn {
          border: none;
          width: 500px;
          height: 40px;
          display: block;
          background: #fff;
          border-radius: 5px;
          margin: 10px 0;
          cursor: pointer;
        }

        .sign-in-btn {
          background-color: #eeb9be;
          color: #ffff;
        }
        .sign-in-btn:disabled {
          background-color: transparent;
          border: 1px solid #ccc;
          color: #000;
        }

        .sign-up-btn {
          background-color: #ecedf1;
        }

        @media screen and (max-width: 525px) {
          .inputs {
            width: 300px;
          }

          .sign-in-btn,
          .sign-up-btn {
            width: 300px;
          }
        }
      `}</style>
    </>
  )
}
