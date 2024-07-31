import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import ApplicantsList from './ComponentApplicantsList';
interface responseData {
  statusCode:number;
  responseMessage: string;
  data:any[];
}
let calendarData:any;
async function getCalenderData() {
  try {
    calendarData = (await axios.get('http://3.35.239.36:8080/api/calendars'));
    calendarData = calendarData.data;
    console.log(calendarData)
    return calendarData;
} catch (error) {
    console.error(error);
    throw error; // 에러를 다시 throw하여 에러 처리 가능하도록 함
}
}
export default async function Page() {
  return (
    <main className="min-h-screen w-full">
      {<ApplicantsList/>}
    </main >
  );
};