import Wrapper from '../components/Wrapper'
import MyCalendar from '../myCalenar/page'

//3. 캘린더화면
export default function Calendar() {
  return (
    <>
      <Wrapper>
        <MyCalendar initialYear={2023} initialMonth={8} />
      </Wrapper>
    </>
  )
}
