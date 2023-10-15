import Wrapper from '../components/Wrapper'
import MyCalendar from './myCalendar'

//3. 캘린더화면
export default function Calendar() {
  const currentDate = new Date()

  const initialYear = currentDate.getFullYear()
  const initialMonth = currentDate.getMonth()
  return (
    <>
      <Wrapper>
        <MyCalendar initialYear={initialYear} initialMonth={initialMonth} />
      </Wrapper>
    </>
  )
}
