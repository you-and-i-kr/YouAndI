'use client'

export default function Loading() {
  return (
    <>
      <img src={'/images/loading.png'}></img>

      <style jsx>{`
        img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </>
  )
}
