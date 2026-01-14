import { api } from "@/lib/axios";

export default async function getCalenderData() {
    try {
      const calendarData = (await api.get('/read')).data;
      console.log("성공!!");
      return calendarData;
  } catch (error) {
      console.error(error);
      throw error; // 에러를 다시 throw하여 에러 처리 가능하도록 함
  }
}