import Image from 'next/image';
import Header from "../../ComponentsHeader";
import { Calendar } from './ComponentsCalendar';
import CalData from "../../test.json";
import Footer from "../../ComponentFooter"
import Link from 'next/link';
import { api } from "@/lib/axios";
import { Suspense } from 'react';
//let calendarData = JSON.parse(JSON.stringify(CalData)); // 로컬 json **수정**
interface calObject {                     // json으로 받는 객체 타입 정의
  id: number;
  field: fieldInterface;
  title: string;
  place: string;
  day: string;
  time: string;
  check: boolean;
}
interface fieldInterface {
  id: number;
  name: string;
}
interface responseData {
  statusCode:number;
  responseMessage: string;
  data:calObject[];
}
let calendarData:any;
async function getCalenderData() {
  try {
    calendarData = (await api.get('/api/calendars'));
    calendarData = calendarData.data;
    console.log(calendarData)
    return calendarData;
} catch (error) {
    console.error(error);
    throw error; // 에러를 다시 throw하여 에러 처리 가능하도록 함
}
}

/*

const response = (await api.post('https://4a26c935-10b4-4195-a293-2e78b6965b48.mock.pstmn.io/api/calendars')).data;
    calendarData = response.data.map
let test;
*/
//export const calendarData = getCalenderData();    
//let c = calenderData[0];
/*export async function getCalenderData() {
  return await api.get();
}*/
export default async function Page() {
  await getCalenderData();
  return (
    <main className="min-h-screen">
      {<Calendar calendarData={calendarData.data}/>}
    </main >
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