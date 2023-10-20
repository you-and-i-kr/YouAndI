import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
async function Test() {
  const data = await getServerSession(authOptions)

  console.log(authOptions)
  console.log(data, 'ss')

  return <></>
}

export default Test
