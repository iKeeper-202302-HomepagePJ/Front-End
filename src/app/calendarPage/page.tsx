import Image from 'next/image';
import Header from "../ComponentsHeader";
import {Calendar} from './ComponentsCalendar';
import CalData from "../test.json";
import Footer from "../ComponentFooter"
import Link from 'next/link';
import axios from 'axios';
export const calendarData = JSON.parse(JSON.stringify(CalData)); // 로컬 json **수정**
interface calObject {                // json으로 받는 객체 타입 정의
  id: number;
  field: fieldInterface;
  title: string;
  place: string;
  day: string;
  time: string;
  check: boolean;
}
interface fieldInterface 
{
  id: number;
  name: string;
}
/*let calendarData:calObject[];
async function getCalenderData() {
  try {
    calendarData = (await axios.get('/read')).data;
    console.log("성공!!");
    return calendarData;
} catch (error) {
    console.error(error);
    throw error; // 에러를 다시 throw하여 에러 처리 가능하도록 함
}
}*/
//export const calendarData = getCalenderData();    
export const adminPower = true;           //***************************관리자 권한용 나중에 수정************************* */
//let c = calenderData[0];
/*export async function getCalenderData() {
  return await axios.get();
}*/
export default async function Page() {
  return (
    <main className="flex min-h-screen bg-black flex-col items-center justify-between">
      <div className="w-3/4 h-auto mr-100/4">
        {<Header />}
        <div className="w-full flex mt-10 justify-normal">
          {<Calendar/>}
        </div>
        {<Footer />}
      </div>
    </main>
  );
};
/*export default async function Page() {
  return (
    <main className="flex min-h-screen bg-black flex-col items-center justify-between">
      <div className="w-3/4 h-auto mr-100/4">
        {<Header />}
        <div className="w-full flex justify-normal">
          {Calendar(calendarData)}
        </div>
      </div>
    </main>
  );
};
 */