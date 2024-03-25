'use client';
import "../../css/todo.css";
import axios, { all } from 'axios';

import { useState, useEffect } from "react";
import { calendarData, adminPower } from "./page";
import { ComponentTodoList } from "./ComponentsTodoList";

interface calObject {                     // json으로 받는 객체 타입 정의
    id: number;
    field: number;
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
const calendarDayBox = "h-[100px] bg-deepBlue flex-col items-center justify-between mr-[5px] mb-[5px] rounded"
const dayOfWeekBox = "bg-deepBlue justify-between mr-[5px] text-center text-white text-[16ypx] rounded-md"
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth() + 1;
const todayDay = today.getDate();     /****** 한달을 모두 29로 살고 싶은 것이 아니면 이거 꼭 각주 표시랑 29 제거하기 ******/
function setMontCalendarData(calData: calObject[], month: number, year: number) {
    let t = calData.filter((e: { day: string; field:number; }) => (Number(e.day.slice(5, 7)) == month) && (Number(e.day.slice(0, 4)) == year) && (Number(e.day.slice(8, 10)) == 1) && (e.field === 1));
    t = t.concat(calData.filter((e: { day: string; field:number; }) => (Number(e.day.slice(5, 7)) == month) && (Number(e.day.slice(0, 4)) == year) && (Number(e.day.slice(8, 10)) == 1) && (e.field === 3)));
    t = t.concat(calData.filter((e: { day: string; field:number; }) => (Number(e.day.slice(5, 7)) == month) && (Number(e.day.slice(0, 4)) == year) && (Number(e.day.slice(8, 10)) == 1) && (e.field === 2)));
    for (let i = 2; i <= 31; i++) {
        t = t.concat(calData.filter((e: { day: string; field:number; }) => (Number(e.day.slice(5, 7)) == month) && (Number(e.day.slice(0, 4)) == year) && (Number(e.day.slice(8, 10)) == i) && (e.field === 1)));
        t = t.concat(calData.filter((e: { day: string; field:number; }) => (Number(e.day.slice(5, 7)) == month) && (Number(e.day.slice(0, 4)) == year) && (Number(e.day.slice(8, 10)) == i) && (e.field === 3)));
        t = t.concat(calData.filter((e: { day: string; field:number; }) => (Number(e.day.slice(5, 7)) == month) && (Number(e.day.slice(0, 4)) == year) && (Number(e.day.slice(8, 10)) == i) && (e.field === 2)));
    }
    return t;
}
export function moveMonth(plus: boolean, year: number, month: number) {
    if (plus) {
        if (month == 12) {
            year += 1; month = 1;
        }
        else month += 1;
    } else {
        if (month == 1) {
            year -= 1; month = 12;
        }
        else month -= 1;
    }
    return [year, month];
}
function showLastAndNextMonthTodoInCalendar(lastOrNext: string, day: number, month: number, year: number, allCount: number, certCount: number, devCount: number) {      //lastOrNext : last나 next 입력
    const dayHandle = (whatDay: string) => {
        console.log(whatDay)
    }
    return (
        <button className={`${calendarDayBox}`} id={`${lastOrNext}calendarDay${year}-${month}-${day}`} onClick={() => dayHandle(`${lastOrNext}calendarDay${year}${month}${day}`)}>
            <div className="">{day}</div>
            <div className="flex-auto flex items-center space-x-[10px] place-items-center">
                {Boolean(allCount) && <div className="">A</div>}
                {Boolean(certCount) && <div className="">C</div>}
                {Boolean(devCount) && <div className="">D</div>}
            </div>
        </button>
    )
}/*
function showTodoInCalendar(lastOrNext:boolean, day:number, month:number, year:number, onClickEventFuntion:Function) {
    return (
        <button className={`${calendarDayBox}`} id={`calendarDay${day}`} onClick={() => onClickEventFuntion(true, day, month, year)}>
            <div className="">{day}</div>
            <div className="flex-auto flex items-center space-x-[10px]">
                {Boolean(allCount) && <div className="">A</div>}
                {Boolean(certCount) && <div className="">C</div>}
                {Boolean(devCount) && <div className="">D</div>}
            </div>
        </button>
    )
}*/
function setCalendar(calData: calObject[], month: number, year: number, onClickEventFuntion: Function) {
    const lastMonth = moveMonth(false, year, month);
    const afterMonth = moveMonth(true, year, month);
    const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
    const lastDayOfLastMonth = new Date(lastMonth[0], lastMonth[1], 0).getDate();
    const lastDay = new Date(year, month, 0).getDate();
    let lastDayOfWeek = new Date(year, month - 1, lastDay).getDay();
    let itemOfCalendar = [];
    for (let beforeDay = lastDayOfLastMonth - firstDayOfWeek + 1; beforeDay <= lastDayOfLastMonth; beforeDay++) {
        let countByCondition = calendarData.reduce((data: any, lastMonthData: calObject) => {
            if (Number(lastMonthData.day.slice(5, 7)) == lastMonth[1] && Number(lastMonthData.day.slice(0, 4)) == lastMonth[0] && (Number(lastMonthData.day.slice(8, 10)) == beforeDay)) {
                console.log(calData)
                if (lastMonthData.field == 1) {
                    data.allCount += 1;
                } else if (lastMonthData.field == 3) {
                    data.certCount += 1;
                } else if (lastMonthData.field == 2) {
                    data.devCount += 1;
                }
            }
            return data;
        }, { allCount: 0, certCount: 0, devCount: 0 });
        itemOfCalendar.push(
            <button className={`${calendarDayBox} opacity-50`} onClick={() => onClickEventFuntion(true, beforeDay, lastMonth[1], lastMonth[0])}>
                <div className="">{beforeDay}</div>
                <div className="flex justify-center font-bold items-center">
                    <div className="flex flex-row space-x-[10px]">
                        {Boolean(countByCondition.allCount) && <div className="text-orange">A</div>}
                        {Boolean(countByCondition.certCount) && <div className="text-skyblue">C</div>}
                        {Boolean(countByCondition.devCount) && <div className="text-green">D</div>}
                    </div>
                </div>
            </button>)
    }

    let allCount = 0;
    let certCount = 0;
    let devCount = 0;
    let searchCalData = 0;
    for (let day = 1; day <= lastDay; day++) {
        while (calData.length != searchCalData && Number(calData[searchCalData].day.slice(8, 10)) == day) {
            switch (calData[searchCalData++].field) {
                case 1:
                    allCount++;
                    break;
                case 3:
                    certCount++;
                    break;
                default:
                    devCount++;
            }
        }
        itemOfCalendar.push(
            <button className={`${calendarDayBox}`} onClick={() => onClickEventFuntion(false, day, month, year)}>
                <div className="">{day}</div>
                <div className="flex justify-center font-bold">
                    <div className="flex flex-row space-x-[10px]">
                        {Boolean(allCount) && <div className="text-orange">A</div>}
                        {Boolean(certCount) && <div className="text-skyblue">C</div>}
                        {Boolean(devCount) && <div className="text-green">D</div>}
                    </div>
                </div>
            </button>)
        allCount = 0;
        certCount = 0;
        devCount = 0;
    }

    for (let afterDay = 1; lastDayOfWeek++ < 6; afterDay++) {
        let countByCondition = calendarData.reduce((data: any, lastMonthData: calObject) => {
            if (Number(lastMonthData.day.slice(5, 7)) == afterMonth[1] && Number(lastMonthData.day.slice(0, 4)) == afterMonth[0] && (Number(lastMonthData.day.slice(8, 10)) == afterDay)) {
                console.log(calData)
                if (lastMonthData.field == 1) {
                    data.allCount += 1;
                } else if (lastMonthData.field == 3) {
                    data.certCount += 1;
                } else if (lastMonthData.field == 2) {
                    data.devCount += 1;
                }
            }
            return data;
        }, { allCount: 0, certCount: 0, devCount: 0 });
        itemOfCalendar.push(
            <button className={`${calendarDayBox} opacity-50`} onClick={() => onClickEventFuntion(true, afterDay, afterMonth[1], afterMonth[0])}>
                <div className="">{afterDay}</div>
                <div className="flex justify-center font-bold">
                    <div className="flex flex-row space-x-[10px]">
                        {Boolean(countByCondition.allCount) && <div className="text-orange">A</div>}
                        {Boolean(countByCondition.certCount) && <div className="text-skyblue">C</div>}
                        {Boolean(countByCondition.devCount) && <div className="text-green">D</div>}
                    </div>
                </div>
            </button>)
    }
    return (
        <div className="flex-col items-center justify-between rounded-md">
            <div className="h-[25px] mb-[10px] grid grid-cols-7">
                <div className={`${dayOfWeekBox}`}>일</div>
                <div className={`${dayOfWeekBox}`}>월</div>
                <div className={`${dayOfWeekBox}`}>화</div>
                <div className={`${dayOfWeekBox}`}>수</div>
                <div className={`${dayOfWeekBox}`}>목</div>
                <div className={`${dayOfWeekBox}`}>금</div>
                <div className={`${dayOfWeekBox}`}>토</div>
            </div>
            <div className="w-full grid grid-cols-7">
                {itemOfCalendar}
            </div>
        </div>
    )
}
export function Calendar(/*calendarData:calObject[]*/): JSX.Element {
    let [monthOrDay, setMonthOfDay] = useState(true);    // true = month, false = day
    let [month, setMonth] = useState(todayMonth);
    let [year, setYear] = useState(todayYear);
    let [selectDay, setSelectDay] = useState(0);
    let [selectMonth, setSelectMonth] = useState(0);
    let [selectYear, setSelectYear] = useState(0);
    let [monthCalendarData, setCalendarData] = useState<calObject[]>(setMontCalendarData(calendarData, todayMonth, todayYear));
    let [dayCalendarData, setDayData] = useState<calObject[]>([]);
    let [countMoveMonth, setCountMoveMonth] = useState(0);
    const selectDayHandle = (lastOrNext: Boolean, calendarDay: number, calendarMonth: number, calendarYear: number) => {
        if (selectDay == calendarDay) setSelectDay(0);
        else /*if (lastOrNext)*/ {
            setSelectYear(calendarYear);
            setSelectMonth(calendarMonth);
            setSelectDay(calendarDay);
            setDayData(calendarData.filter((e: { day: string; }) => (Number(e.day.slice(5, 7)) == calendarMonth && Number(e.day.slice(0, 4)) == calendarYear && Number(e.day.slice(8, 10)) == calendarDay)).map((key: any) => key))
        }
    }
    const monthHandle = (plus: boolean) => {          // true = 다음 달, false = 그전 달
        if ((!plus && countMoveMonth>-12) || (plus && countMoveMonth<6)){
            plus ? setCountMoveMonth(countMoveMonth+1) : setCountMoveMonth(countMoveMonth-1)
            if (plus) {
                if (month == 12) {
                    setYear(year + 1); setMonth(1);
                }
                else setMonth(month + 1);
            } else {
                if (month == 1) {
                    setYear(year - 1); setMonth(12);
                }
                else setMonth(month - 1);
            }
            setSelectDay(0);
        }
        else {
            alert("더 이상 이동할 수 없습니다") /*************** 이거 모달이나 팝업으로 수정할 것 ***************/
        }
        
    }
    useEffect(() => {
        setCalendarData(setMontCalendarData(calendarData, month, year))
    }, [month]);
    return (
        <div className="w-full flex py-[20px] justify-normal">
            <div className="flex-auto h-auto mr-[24px]">
                <div className="flex-auto flex items-center justify-end space-x-[10px] mb-[15px]">
                    <button className="w-[30px] h-[30px] bg-deepBlue rounded-[10px]" onClick={() => monthHandle(false)}>
                        <img src="/arrowRight.svg" alt="설명" />
                    </button>
                    <div className="w-[180px] text-[26px] text-white text-center">{year}년 {month}월</div>
                    <button className="w-[30px] h-[30px] bg-deepBlue rounded-[10px]" onClick={() => monthHandle(true)}>
                        <img src="/arrowRight.svg" alt="설명" className="rotate-180" />
                    </button>
                </div>
                {setCalendar(monthCalendarData, month, year, selectDayHandle)}
            </div>
            {Boolean(!selectDay) && ComponentTodoList(year, month, 0, monthCalendarData)}
            {Boolean(selectDay) && ComponentTodoList(selectYear, selectMonth, selectDay, dayCalendarData)}
        </div>
    )
}
