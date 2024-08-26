'use client';
import Image from 'next/image';
import { adminPower } from "./page";
import { closeSync } from 'fs';
import { useState } from "react";
import { createPortal } from "react-dom";
import ReactDOM from 'react-dom';
import { moveMonth } from './ComponentsCalendar'
import { iconIKeeper, iconDev, iconCert } from '../../SvgIcons'
import Link from 'next/link'

const todoListContainer = "w-[450px] h-auto";
const todoBox = "w-full h-[150px] my-[15px] px-[40px] bg-deepBlue border-separate rounded-[10px] flex items-center";
//let data = JSON.parse(Data);
// json 데이터 받아오기. ***로컬이므로 나중에 수정하기***

interface calObject {                // json으로 받는 객체 타입 정의
  id?: number;
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
interface fieldDesign {
  icon: string;
  fieldColor: string;
  fieldString: string;
}

let fieldCSS = {
  icon: "",
  fieldColor: "",
  fieldString: ""
}

function setFieldString(field: number) {
  switch (field) {                        // 일정분야에 따른 일정리스트 디자인 변경 (분야문자열, 문자색깔, 아이콘)
    case 2:
      fieldCSS.icon = "lock-alt.svg";
      fieldCSS.fieldColor = "skyblue";
      fieldCSS.fieldString = "CERT"
      break;
    case 3:
      fieldCSS.icon = "laptop.svg";
      fieldCSS.fieldColor = "green";
      fieldCSS.fieldString = "DEV"
      break;
    case 1:
      fieldCSS.icon = "iKeeperLogo.svg";
      fieldCSS.fieldColor = "orange";
      fieldCSS.fieldString = "ALL"
      break;
  }
}
export function setFieldDesign(field: number, clear?: boolean) {
  switch (field) {                        // 일정분야에 따른 일정리스트 디자인 변경 (분야문자열, 문자색깔, 아이콘)
    case 2:
      if (clear) {
        return (
          <div className='flex items-center'>
            {iconCert("mr-[10px]", "gray")}
            <div className={`w-[65px] text-gray-500 font-bold text-[26px] ml-[5px]`}>CERT</div>
          </div>
        );
      }
      return (
        <div className='flex items-center'>
          {iconCert("mr-[10px]", "skyblue")}
          <div className={`w-[65px] text-skyblue font-bold  text-[26px] ml-[5px]`}>CERT</div>
        </div>
      );
    case 3:
      if (clear) {
        return (
          <div className='flex items-center'>
            {iconDev("mr-[10px]", "gray")}
            <div className={`w-[65px] text-gray-500 font-bold  text-[26px] ml-[5px]`}>DEV</div>
          </div>
        );
      }
      return (
        <div className='flex items-center'>
          {iconDev("mr-[10px]", "green")}
          <div className={`w-[65px] text-green font-bold  text-[26px] ml-[5px]`}>DEV</div>
        </div>
      );
    default:
      if (clear) {
        return (
          <div className='flex items-center'>
            {iconIKeeper("mr-[10px]", "gray")}
            <div className={`w-[65px] text-gray-500 font-bold  text-[26px] ml-[5px]`}>ALL</div>
          </div>
        );
      }
      return (
        <div className='flex items-center'>
          {iconIKeeper("mr-[10px]", "orange")}
          <div className={`w-[65px] text-orange font-bold  text-[26px] ml-[5px]`}>ALL</div>
        </div>
      );
  }
}
function Todo({ calData, clear, checkedFunction }: { calData: calObject, clear: boolean, checkedFunction:Function }) {
  setFieldString(calData.field.id);
  const [isModify, setIsModify] = useState(false);
  const modifying = () => {
    setIsModify(!isModify);
  }
  //let modifyTodo = writeTodoBox(calData.day.slice(0, 4), calData.day.slice(5, 7), calData.day.slice(8, 10), calData = calData);
  return (
    <div className='w-full'>
      {!isModify && <div className={`${todoBox} text-skyblue text-orange text-green`}>
        {setFieldDesign(calData.field.id, clear)}
        <div className="text-white ml-[20px]">
          <div className="text-[20px]">{calData.title}</div>
          <div className="text-[16px] flex items-center space-x-[10px]">
            <div>
              {calData.day?.slice(5, 7) + '/' + calData.day?.slice(8, 10)}
            </div>
            <div>
              {(calData.time?.slice(6, 8) == "00") && calData.time?.slice(0, 5)}
            </div>
            <div>
              {calData.place}
            </div>
          </div>
        </div>
        <div className='flex-auto flex justify-end space-x-[10px]'>
          {/*<Link
            href={{
              pathname: '/writeTodoPopup',
              query: { year: calData.day.slice(0, 4), month: calData.day.slice(5, 7), day: calData.day.slice(8, 10), calData: JSON.stringify(calData) },
            }}
            as={`/writeTodoPopup`}
            target='_blank'
          >
            <img src="ICON_pencile.svg" alt="image description" />
          </Link>*/}
          <button className="w-[30px]" onClick={() => window.open(`/writeTodoPopup?year=${calData.day.slice(0, 4)}&month=${calData.day.slice(5, 7)}&day=${calData.day.slice(8, 10)}&calData=${JSON.stringify(calData)}`,'_blank','width=550, height=500')} >
            <img src="IconPencile.svg" alt="image description" />
          </button>
          <div className="flex items-center mb-[4px]">
            <input id={`${calData.id}todoBoxCheckBox`} type="checkbox" value="" className="w-[20px] h-[20px] bg-pink border-deepBlue ring-blue rounded focus:ring-blue-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-blue-100 dark:border-gray-600 disabled:bg-red" onClick={(e) => {checkedFunction(calData.id) }}/>
          </div>
        </div>
      </div>}
      {/*isModify && modifyTodo*/}
    </div>
  )
}

function TodoList(calData: calObject[], setDay?: number, todoCheckList?:Function) {
  const [isModify, setIsModify] = useState(false);
  const [checkTodoList, setCheckTodoList] = useState([]);
  let modifying = () => {
    setIsModify(!isModify);
  }
  /*setFieldString(1);
  let allTodo = calData.filter((e: { field: { id: number; }; check: boolean; }) => (e.field.id.id === 1) && (!e.check)).map((key: calObject) => (<div id={`${key.id}`}><Todo calData={key} /></div>));
  setFieldString(3);
  let certTodo = calData.filter((e: { field: { id: number; }; check: boolean; }) => (e.field.id.id === 3) && (!e.check)).map((key: calObject) => (<div id={`${key.id}`}><Todo calData={key} /></div>));
  setFieldString(2);
  let devTodo = calData.filter((e: { field: { id: number; }; check: boolean; }) => (e.field.id.id === 2) && (!e.check)).map((key: calObject) => (<div id={`${key.id}`}><Todo calData={key} /></div>));
  let clearTodo = calData.filter((e: { check: boolean; }) => (e.check)).map((key: calObject) => ClearTodo(key));
  setFieldString(1);*/
  //todo.push(calData.map((row: calObject[]) => row.filter((e: {check: boolean;}) => (!e.check)).map((key: calObject) => (key))));
  let todo = /*setDay ? calData.filter((e: { check: boolean; day: string }) => (!e.check && (Number(e.day.slice(8, 10)) == setDay))).map((key: calObject) => (<div id={`${key.id}`}><Todo calData={key} /></div>)) : */calData.filter((e: { check: boolean; }) => (!e.check)).map((key: calObject) => (<div id={`todoComponent${key.id}`}><Todo calData={key} clear={false} checkedFunction={setCheckTodoList}/></div>));
  let clearTodo = /*setDay ? calData.filter((e: { check: boolean; day:string}) => (e.check && (Number(e.day.slice(8, 10)) == setDay))).map((key: calObject) => (<div id={`${key.id}`}><ClearTodo calData={key} /></div>)) : */calData.filter((e: { check: boolean; }) => (e.check)).map((key: calObject) => (<div id={`todoComponent${key.id}`}><Todo calData={key} clear={true} checkedFunction={setCheckTodoList} /></div>));
  //console.log(todo);
  return (
    <div className='w-full flex-col items-center justify-between'>
      {todo}
      {clearTodo}
    </div>
  );
}
export function ComponentTodoList(year: number, month: number, day: number, calendarData: calObject[]) {
  const [showNewTodo, setVisible] = useState(false);
  const [checkTodoList, setCheckTodoList] = useState<Number[]>([]);
  const setCheckTodoListHandler = (id:number) => {
    !checkTodoList.includes(id) && setCheckTodoList(checkTodoList.concat([id]))
  }
  const changeShowNewTodoHandler = () => {
    setVisible(!showNewTodo);
  }
  const setClearTodo = () => {
    console.log(checkTodoList)
    setCheckTodoList([])
  }
  const setDeleteTodo = () => {
    console.log(checkTodoList)
    setCheckTodoList([])
  }
  //let createTodo = writeTodoBox("" + year, "" + month, "" + day);
  let count = (calendarData.length);                // 일정 개수 확인
  return (
    <div className={`w-[200px] ${todoListContainer} koreanFont`}>
      <div className="flex justify-normal">
        <div className="flex text-[26px] text-orange w-[200px] font-semibold">
          <div className="mr-[10px]">
            <Image width={40} height={40} src="/IconCalendar.svg" alt="image description" className='w-auto h-full'></Image>
          </div>
          {!Boolean(day) && `${month}월 일정`}
          {Boolean(day) && `${month}월 ${day}일 일정`}
        </div>
        {adminPower && <div className="flex-auto flex justify-end space-x-[10px]">
          <button className="">
            <img src="/BTN_delete.svg" alt="설명" />
          </button>
          <button className="">
            <img src="/BTN_check.svg" alt="설명" />
          </button>
          <button className="" onClick={() => window.open(`/writeTodoPopup?year=${year}&month=${month}&day=${day}`,'_blank','width=550, height=500')}>
            <img src="/IconWrite.svg" alt="설명" />
          </button>
        </div>}
      </div>
      {/*showNewTodo && createTodo*/}
      {TodoList(calendarData, day, setCheckTodoList)}
      {(count == 0) && !showNewTodo && <div className={`w-[200px] ${todoListContainer} flex koreanFont`}>
        <div className="mt-[100px] text-center text-[26px] text-center">일정이 없습니다.</div>
      </div>}
    </div>
  );
}

export function TodayComponentTodoList(calendarData: calObject[]) {
  const [showNewTodo, setVisible] = useState(false);
  const [checkTodoList, setCheckTodoList] = useState<Number[]>([]);
  const setCheckTodoListHandler = (id:number) => {
    !checkTodoList.includes(id) && setCheckTodoList(checkTodoList.concat([id]))
  }
  const changeShowNewTodoHandler = () => {
    setVisible(!showNewTodo);
  }
  const setClearTodo = () => {
    console.log(checkTodoList)
    setCheckTodoList([])
  }
  const setDeleteTodo = () => {
    console.log(checkTodoList)
    setCheckTodoList([])
  }
  //let createTodo = writeTodoBox("" + year, "" + month, "" + day);
  let count = (calendarData.length);                // 일정 개수 확인
  return (
    <div className={`w-[200px] ${todoListContainer} koreanFont`}>
      <div className="flex justify-normal">
        <div className="flex text-[26px] text-orange w-[250px] font-semibold">
          <div className="mr-[10px]">
            <Image width={40} height={40} src="/IconCalendar.svg" alt="image description" className='w-auto h-full'></Image>
          </div>
          {`오늘의 일정`}
        </div>
      </div>
      {/*showNewTodo && createTodo*/}
      {TodoList(calendarData)}
      {(count == 0) && !showNewTodo && <div className={`w-[200px] ${todoListContainer} flex koreanFont`}>
        <div className="mt-[100px] text-center text-[26px] text-center">일정이 없습니다.</div>
      </div>}
    </div>
  );
}