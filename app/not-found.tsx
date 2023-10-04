'use client'

export default function NotFound() {
  return (
    <>
      <img src={'/images/404.png'}></img>

      <style jsx>{`
        img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </>
  )
}
