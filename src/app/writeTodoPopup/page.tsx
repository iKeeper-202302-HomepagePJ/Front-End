'use client';
import Image from 'next/image';
import { closeSync } from 'fs';
import { useState } from "react";
import { createPortal } from "react-dom";
import ReactDOM from 'react-dom';
import Header from "../../app/ComponentsHeader";
import { WriteTodoBox } from './writeTodo';
import { useRouter } from 'next/router';
//import WriteTodoPopup from '../writeTodoPopup';
interface fieldInterface {
  id: number;
  name:string;
}
interface calObject {                     // json으로 받는 객체 타입 정의
  id?: number;
  field: {
    id:number,    
  };
  title: string;
  place: string;
  day: string;
  time: string;
  check: boolean;
}

export default function page() {
  let data = new URLSearchParams(window.location.search);
  const dataYear : string = (data.get('year'))!
  const dataMonth : string = (data.get('month'))!
  let dataDay : string =  (data.get('day'))!
  let dataCalData: calObject = {
    field: {
      id:1
    },
    title: '',
    place: '',
    day: '',
    time: '',
    check: false
  }
  if (data.get('calData')) {
    dataCalData = JSON.parse(data.get('calData')!);
  }
  else {
    dataCalData.day = dataYear + '-' + dataMonth + '-' + dataDay;
    dataCalData.time = "00:00:01"
    if (dataDay == '0') dataDay = '1'
  }
  if (dataCalData.id) {
    return (
      <main className="flex min-h-screen bg-black flex-col items-center justify-between">
        <div className="w-3/4 h-auto mr-100/4">
          <WriteTodoBox year={dataYear} month={dataMonth} day={dataDay} calData={dataCalData}/>
        </div>
      </main>
    );
  }
  return (
    <main className="flex min-h-screen bg-black flex-col items-center justify-between">
      <div className="w-3/4 h-auto mr-100/4">
        <WriteTodoBox year={dataYear} month={dataMonth} day={dataDay} calData={dataCalData}/>
      </div>
    </main>
  );
}
