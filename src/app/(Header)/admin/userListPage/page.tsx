import Image from 'next/image';
import Link from 'next/link';
import { api } from "@/lib/axios";
import UserList from './ComponentUserList';
interface responseData {
  statusCode:number;
  responseMessage: string;
  data:any[];
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
export default async function Page() {
  await getCalenderData();
  return (
    <main className="min-h-screen w-full left-[-100]">
      {<UserList/>}
    </main >
  );
};