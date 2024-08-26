"use client"

import Image from 'next/image';
import "../../css/todo.css";
import axios from 'axios';
import { useEffect, useState } from 'react';

const header = "w-full h-[130px] mt-[10px] flex flex-row items-end mb-[80px]"
let shortCutList:any[] = []

export default function Header() {
    const [linkList, setLinkList] = useState([])
    useEffect(()=> {
        getShortcutList()
        
    }, [])
    const getShortcutList = async () => {
        try {
          const response = (await axios.get('http://3.35.239.36:8080/api/introduces/hyperlink')).data.data;
          console.log('하이퍼링크 :', response);
          setLinkList(response)
        } catch (error) {
          console.error('Failed to fetch dropdown options:', error);
        }
    };
    return (
        <div className={`${header}`}>
            <a className="h-[130px] aspect-square rounded-[10px]" href="/">
                <img className="size-full object-cover rounded-[10px]" src="/LOGO_Black.svg" alt="설명" />
            </a>
            <div className='flex flex-col justify-between w-full h-full'>
                <div className='flex h-1/3 mb-[5px] justify-end'>
                    {Boolean(linkList.length) && linkList.map((key) => (<a className='max-h-full h-100 aspect-square bg-blue rounded-lg font-semibold content-center text-center ml-[10px]' href={key.url}>{key.name}</a>))}
                </div>
                <div className="flex-1 mt-[5px] bg-deepBlue flex items-center justify-between px-[50px] rounded-lg">
                    <div className={`group relative dropdown text-[26px] cursor-pointer flex justify-center`}>
                        <div className={`w-[150px] text-white test-[26px] font-semibold`}>동아리 소개</div>
                        <div className="group-hover:block dropdown-menu absolute hidden font-semibold">
                            <ul className="mt-[40px] rounded-[10px] px-[10px] bg-blue shadow lefx-col items-center justify-between">
                            </ul>
                        </div>
                    </div>
                    <div className={`group relative dropdown text-[26px] cursor-pointer flex justify-center`}>
                        <div className={`w-[150px] text-white test-[26px] font-semibold`}>공지사항</div>
                        <div className="group-hover:block dropdown-menu absolute hidden font-semibold">
                            <ul className="mt-[40px] rounded-[10px] px-[10px] bg-blue shadow lefx-col items-center justify-between">
                                <a className="block hover:bg-black cursor-pointer" href="/noticeListPage/1">공지사항</a>
                                <a className="block hover:bg-black cursor-pointer" href="/calendarPage">일정</a>
                            </ul>
                        </div>
                    </div>
                    <div className={`group relative dropdown text-[26px] cursor-pointer flex justify-center`}>
                        <div className={`w-[150px] text-white test-[26px] font-semibold`}>세미나</div>
                        <div className="group-hover:block dropdown-menu absolute hidden font-semibold">
                            <ul className="mt-[40px] w-[250px] rounded-[10px] px-[10px] bg-blue shadow lefx-col items-center justify-between">
                                <a className="block hover:bg-black cursor-pointer" href="/postListPage/키퍼세미나/1/1">키퍼 세미나</a>
                                <a className="block hover:bg-black cursor-pointer" href="/postListPage/개발세미나/2/1">개발 세미나</a>
                                <a className="block hover:bg-black cursor-pointer" href="/postListPage/CERT세미나/3/1">CERT 세미나</a>
                            </ul>
                        </div>
                    </div>
                    <div className={`group relative dropdown text-[26px] cursor-pointer flex justify-center`}>
                        <div className={`w-[170px] text-white test-[26px] font-semibold`}>스터디/멘토링</div>
                        <div className="group-hover:block dropdown-menu absolute hidden font-semibold">
                            <ul className="mt-[40px] rounded-[10px] px-[10px] bg-blue shadow lefx-col items-center justify-between">
                                <a className="block hover:bg-black cursor-pointer" href="/CalendarPage">공지사항</a>
                                <a className="block hover:bg-black cursor-pointer" href="/CalendarPage">일정</a>
                            </ul>
                        </div>
                    </div>
                    <div className={`group relative dropdown text-[26px] cursor-pointer flex justify-center`}>
                        <div className={`w-[170px] text-white test-[26px] font-semibold text-center`}>기타</div>
                        <div className="group-hover:block dropdown-menu absolute hidden font-semibold w-full">
                            <ul className="w-full mt-[40px] rounded-[10px] px-[10px]  bg-blue shadow lefx-col items-center justify-between">
                                <a className="w-full block hover:bg-black cursor-pointer text-center" href="/library">도서관</a>
                                <a className="block hover:bg-black cursor-pointer text-center" href="/suggestions">건의함</a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
