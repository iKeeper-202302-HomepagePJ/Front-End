'use client';
import Image from 'next/image';
import { closeSync } from 'fs';
import { useState } from "react";
import { createPortal } from "react-dom";
import ReactDOM from 'react-dom';
import Header from "../../app/ComponentsHeader";
import { setFieldDesign, } from '../(Header)/calendarPage/ComponentsTodoList'
import { api } from "@/lib/axios";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


interface fieldInterface {
  id: number;
  name: string;
}
interface calObject {                     // json으로 받는 객체 타입 정의
  id?: number;
  field: {
    id: number,
  };
  title: string;
  place: string;
  day: string;
  time: string;
  check?: boolean;
}
type writeTodoBoxProps = {
  year: string;
  month: string;
  day: string;
  calData: calObject;
}

const todoListContainer = "w-[530px] h-auto";
const todoBox = "w-[400px] h-[400px] my-[15px] p-[40px] bg-deepBlue border-separate rounded-[10px] text-white text-[16px]";
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth() + 1;
const todayDay = today.getDate();
export function WriteTodoBox({year, month, day, calData} : writeTodoBoxProps) {  // 시간, 장소 나중에 미정 설정하기ㅣㅣㅣㅣㅣ
  const inputBox = "bg-deepBlue";
  const [todoTitle, setTodoTitle] = useState(calData.title)
  const [todoDayYear, setTodoYear] = useState(Number(year))
  const [todoDayMonth, setTodoMonth] = useState(Number(month))
  const [todoDayDay, setTodoDay] = useState(Number(day))
  const [todoField, setTodoField] = useState(calData.field.id)
  const [todoTimeCheck, setTodoTimeCheck] = useState(calData.time.slice(6, 8))
  const [todoTimeHour, setTodoTimeHour] = useState(()=>todoTimeCheck == "01" ? "선택 안 함" : calData.time.slice(0, 2))
  const [todoTimeMinute, setTodoTimeMinute] = useState(todoTimeCheck == "01" ? "" : calData.time.slice(3, 5))
  const [todoPlace, setTodoPlace] = useState(calData.place)
  const [todoCheck, setTodoCheck] = useState(calData.check)
  const lastDay = new Date(Number(year), Number(month), 0).getDate();
  
  const userToken = useSelector((state:RootState) => state.user.token);
  const noSelectTime = () => {
    setTodoTimeCheck("01");
    setTodoTimeHour("선택 안 함")
    setTodoTimeMinute("")
  }
  const saveTodo = async () => {
    const todoTime = todoTimeCheck == "01" ? "00:00:01" : todoTimeHour + ":" + todoTimeMinute + ":00";
    let transferTodoData: calObject = {
      "field": {
        id: todoField
      },
      "title": todoTitle,
      "place": todoPlace,
      "day": todoDayYear + "." + `${todoDayMonth < 10 ? '0' + todoDayMonth : todoDayMonth}` + "." + `${todoDayDay < 10 ? '0' + todoDayDay : todoDayDay}`,
      "time": todoTime
    }
    if (calData.id) {
      try {
        // 서버로 로그인 요청 보내기
        console.log(calData.id);
        transferTodoData.check = todoCheck;
        console.log("asdf");
        const response = await api.patch(`/api/calendars/${calData.id}`, transferTodoData,
        { headers: 
          { 
            Authorization: `Bearer ${userToken}`
          }
        }).then(res => {
          console.log('캘린더 수정 성공', res.data);
          window.close();  
        }) 
      } catch (error) {
        console.error('캘린더 수정 실패:', error);
      }
    }
    else {
    try {
      // 서버로 로그인 요청 보내기
      const response = await api.post(`/api/calendars`, transferTodoData,
      { headers: 
        { 
          Authorization: `Bearer ${userToken}`
        }
      }).then(res => {
        console.log('캘린더 추가 성공', res.data);
        window.close();  
      })
    } catch (error) {
      console.error('캘린더 추가 실패:', error);
    }
  }
}
const selectFieldHandler = (field: number) => {
  setTodoField(field);
}
return (
  <div className="popup-overlay">
    <div className="popup">
      <div className={`${todoBox} text-skyblue text-orange text-green space-y-[20px]`}>
        <div className='flex items-center w-[300px]'>
          <div className='w-auto whitespace-pre'>일정 제목 : </div>
          <div>
            <input name="todoTitle" className={`${inputBox} w-full`} type="text" defaultValue={todoTitle} onChange={(e) => { setTodoTitle(e.target.value) }} />
            <hr className="w-full h-1 bg-blue border-0"></hr>
          </div>
        </div>
        <div>
          <div className={`group relative dropdown text-[18px] cursor-pointer flex justify-normal`}>
            <div className="mr-[10px]">
              {setFieldDesign(todoField)}
            </div>
            <div className="group-hover:block dropdown-menu absolute hidden font-semibold z-10">
              <ul className="mt-[50px] ml-[30px] rounded-[10px] px-[10px] bg-blue shadow text-[18px] lefx-col items-center justify-between">
                <div className="block text-orange hover:bg-black cursor-pointer" onClick={() => selectFieldHandler(1)}>ALL</div>
                <div className="block text-skyblue hover:bg-black cursor-pointer" onClick={() => selectFieldHandler(2)}>CERT</div>
                <div className="block text-green hover:bg-black cursor-pointer" onClick={() => selectFieldHandler(3)}>DEV</div>
              </ul>
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <div className='w-auto whitespace-pre'>날짜 : </div>
          <div className={`group relative dropdown cursor-pointer flex justify-normal`}>
            <div className={`w-auto whitespace-pre`}>{todoDayYear}년 </div>
            <div className="group-hover:block dropdown-menu absolute hidden z-10">
              <ul className="mt-[20px] rounded-[10px] px-[10px] bg-blue shadow lefx-col items-center justify-between">
                <div className="block hover:bg-black cursor-pointer" onClick={() => setTodoYear(todayYear - 1)}>{todayYear - 1}</div>
                <div className="block hover:bg-black cursor-pointer" onClick={() => setTodoYear(todayYear)}>{todayYear}</div>
                {todayMonth > 6 && <div className="block hover:bg-black cursor-pointer" onClick={() => setTodoYear(todayYear + 1)}>{todayYear + 1}</div>}
              </ul>
            </div>
          </div>
          <div className={`group relative dropdown cursor-pointer flex justify-normal`}>
            <div className={`w-auto whitespace-pre`}>{todoDayMonth}월 </div>
            <div className="group-hover:block dropdown-menu absolute hidden z-10">
              <ul className="mt-[20px] rounded-[10px] px-[10px] bg-blue shadow lefx-col items-center justify-between z-10">
                {todoDayYear == todayYear - 1 && Array.from({ length: 13 - todayMonth }, (_, i) => (
                  <div key={i} className="block hover:bg-black cursor-pointer" onClick={() => setTodoMonth(i + todayMonth)}>
                    {i + todayMonth}
                  </div>
                ))}
                {todoDayYear == todayYear && Array.from({ length: todayMonth < 7 ? todayMonth + 6 : 12 }, (_, i) => (
                  <div key={i} className="block hover:bg-black cursor-pointer" onClick={() => setTodoMonth(i + 1)}>
                    {i + 1}
                  </div>
                ))}
                {todoDayYear == todayYear + 1 && Array.from({ length: todayMonth - 6 }, (_, i) => (
                  <div key={i} className="block hover:bg-black cursor-pointer" onClick={() => setTodoMonth(i + 1)}>
                    {i + 1}
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div className={`group relative dropdown cursor-pointer flex justify-normal`}>
            <div className={`w-auto whitespace-pre`}>{todoDayDay}일</div>
            <div className="group-hover:block dropdown-menu absolute hidden z-10">
              <ul className="mt-[20px] rounded-[10px] px-[10px] bg-blue shadow lefx-col items-center justify-between">
                {Array.from({ length: new Date(todoDayYear, todoDayMonth, 0).getDate() }, (_, i) => (
                  <div key={i} className="block hover:bg-black cursor-pointer" onClick={() => setTodoDay(i + 1)}>
                    {i + 1}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <div className='w-auto whitespace-pre'>시간 : </div>
          <div className={`group relative dropdown cursor-pointer flex justify-normal`}>
            <div className={`w-auto whitespace-pre`}>{todoTimeHour} </div>
            <div className="group-hover:block dropdown-menu absolute hidden z-10">
              <ul className="mt-[20px] mr-[50px] rounded-[10px] px-[10px] bg-blue shadow lefx-col items-center justify-between">
                <div className="w-auto whitespace-pre block hover:bg-black cursor-pointer" onClick={() => noSelectTime()}>선택 안 함</div>
                {Array.from({ length: 24 }, (_, i) => (
                  <div key={i} className="block hover:bg-black cursor-pointer" onClick={() => { setTodoTimeHour(i < 10 ? "0" + i : "" + i); setTodoTimeCheck("00"); { todoTimeMinute == "" && setTodoTimeMinute("00") } }}>
                    {i < 10 ? "0" + i : "" + i}
                  </div>
                ))}
              </ul>
            </div>
          </div>
          {(todoTimeCheck == ("00")) && ':'}
          <div className={`group relative dropdown cursor-pointer flex justify-normal`}>
            <div className={`w-auto whitespace-pre`}> {todoTimeMinute}</div>
            <div className="group-hover:block dropdown-menu absolute hidden">
              <ul className="mt-[20px] rounded-[10px] px-[10px] bg-blue shadow lefx-col items-center justify-between">
                {Array.from({ length: 60 }, (_, i) => (
                  <div key={i} className="block hover:bg-black cursor-pointer" onClick={() => setTodoTimeMinute(i < 10 ? "0" + i : "" + i)}>
                    {i < 10 ? "0" + i : "" + i}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className='flex items-center w-[300px]'>
          <div className='w-auto whitespace-pre'>장소 : </div>
          <div>
            <input name="todoPlace" className={`${inputBox} w-full focus:outline-none`} type="text" defaultValue={todoPlace} onChange={(e) => { setTodoPlace(e.target.value) }} />
            <hr className="h-1 bg-blue border-0"></hr>
          </div>
        </div>
        <div className='flex items-center w-[300px]'>
          <div className='w-auto whitespace-pre'>완료 여부 : </div>
          <div>
            <input id="default-checkbox" type="checkbox" defaultChecked={calData.check} value="clear" className="w-[20px] h-[20px] mt-[5px]bg-pink border-deepBlue ring-blue rounded focus:ring-blue-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-blue-100 dark:border-gray-600 disabled:bg-red" onClick={(e) => { setTodoCheck(!todoCheck) }} />
          </div>
        </div>
        <button className="w-[150px] h-[40px] font-bold bg-green rounded-lg text-black content-center" onClick={saveTodo} >저장하기
        </button>
      </div>
    </div>
  </div>
);
}
