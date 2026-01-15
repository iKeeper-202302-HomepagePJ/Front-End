'use client';
import Image from 'next/image';
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { IconCheck } from '../../../SvgIcons';
interface userDataObject {
    name: string;
    field: {
        id: number;
        name: string;
    };
    status: {
        id: number;
        name: string;
    };
    grade: {
        id: number;
        name: string;
    };
    major1: {
        id: number;
        name: string;
    };
    major2: {
        id: number, name: string
    };
    major3: {
        id: number, name: string
    };
    minor: {
        id: number, name: string
    };
    studentId: string;
}
export default function ApplicantsList() {
    const [applicatsData, setApplicatsData] = useState<userDataObject[]>([])
    const [studentID, setStudentID] = useState("")
    const getApplicatsList = async () => {
        try {
          const response = (await api.get('/api/members')).data.data;
          console.log('응답 데이터:', response);
          setApplicatsData(response);
        } catch (error) {
          console.error('Failed to fetch dropdown options:', error);
        }
        
    };
    const applicatsList = applicatsData.length ? applicatsData.map((key: userDataObject) => (<div id={`applicat${key.studentId}`} className='w-full h-auto text-wrap justify-center text-[16px] px-[10px] mb-[5px]'>
        <hr className="w-full h-[2px] bg-blue border-0 mb-[5px]"/>
        <div className='w-full py-[5px] h-auto flex flex-row justify-between'>
            <div className='w-[100px] h-full text-center content-center'>{key.name}</div>
            <div className='w-[50px] h-full text-center content-center'>{key.field.id == 3 ? <div className='text-green'>CERT</div> : <div className='text-skyblue'>개발</div>}</div>
            <div className='w-[100px] h-full text-center content-center'>{key.studentId}</div>
            <div className='w-[200px] h-full text-center content-center'>{key.major1.name}</div>
            <div className='w-[200px] h-full text-center content-center'>{key.major2.name}</div>
            <div className='w-[200px] h-full text-center content-center'>{key.major3.name}</div>
            <div className='w-[150px] h-full text-center content-center'>{key.grade.name}</div>
            <button className='flex w-[80px] h-full justify-center content-center' onClick={()=>setStudentID(key.studentId)}>
                {IconCheck("w-[20px] h-auto", `${studentID == key.studentId ? 'gray' : 'green'}`)}
            </button>
            <div className='w-[100px] h-full text-center content-center'>100%(1/1)</div>


        </div>
    </div>)) : [];
    useEffect(() => {
        getApplicatsList();
    }, []);
    return (
        <div className='w-full h-auto'>
            <div className="flex text-[20px] text-pink font-bold items-center w-full h-[30px] mb-[20px]">
                <img src="/IconFile.svg" className="mr-[5px]" /><a className='mr-[5px]' href='/admin'>관리자페이지</a> {` > `} <a className='mr-[5px]' href=''>회원 출석 관리</a>
            </div>
            <div className='bg-deepBlue rounded-lg w-full h-auto mt-[20px]'>
                <div className='flex text-orange test-[20px] font-bold w-auto h-[50px] justify-between px-[10px]'>
                    <div className='w-[100px] h-full text-center content-center'>이름</div>
                    <div className='w-[50px] h-full text-center content-center'>분야</div>
                    <div className='w-[100px] h-full text-center content-center'>학번</div>
                    <div className='w-[200px] h-full text-center content-center'>주전공</div>
                    <div className='w-[200px] h-full text-center content-center'>복수전공1</div>
                    <div className='w-[200px] h-full text-center content-center'>복수전공2</div>
                    <div className='w-[150px] h-full text-center content-center'>학년 및 학차</div>
                    <div className='w-[80px] h-full text-center content-center'>출석 여부</div>
                    <div className='w-[100px] h-full text-center content-center'>출석률</div>
                </div>
                {Boolean(applicatsData.length) ? applicatsList : <div className='w-full h-auto px-[10px] pb-[10px]'><hr className="w-full h-[2px] bg-blue border-0 my-[10px]"/>회원이 없습니다.</div>}
            </div>
        </div>
    )
}