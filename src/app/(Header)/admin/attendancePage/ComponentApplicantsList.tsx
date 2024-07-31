'use client';
import Image from 'next/image';
import { useEffect, useState } from "react";
import axios from 'axios';
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
    const getApplicatsList = async () => {
        /*try {
          const response = (await axios.get('http://3.35.239.36:8080/api/members/major')).data.data;
          console.log('응답 데이터:', response);
          setApplicatsData(response);
        } catch (error) {
          console.error('Failed to fetch dropdown options:', error);
        }*/
        setApplicatsData([{
            name: "신세미",
            field: {
                id: 2,
                name:"개발"
            },
            status: {
                id: 1,
                name: "재학",
            },
            grade: {
                id: 1,
                name: "1학년/2학차",
            },
            major1: {
                id: 1,
                name: "컴퓨터소프트웨어학부",
            },
            major2: {
                id: 1,
                name: "컴퓨터공학전공",
            },
            major3: {
                id: 0,
                name: "없음",
            },
            minor: {
                id: 0,
                name: "없음",
            },
            studentId: "22331242"
        }])
    };
    const applicatsList = applicatsData.map((key: userDataObject) => (<div id={`applicat${key.studentId}`} className='w-full h-auto text-wrap justify-center text-[16px] px-[10px] mb-[5px]'>
        <hr className="w-full h-[2px] bg-blue border-0 mb-[5px]"/>
        <div className='w-full py-[5px] h-auto flex flex-row justify-between'>
            <div className='w-[100px] h-full text-center content-center'>{key.name}</div>
            <div className='w-[50px] h-full text-center content-center'>{key.field.id == 1 ? <div className='text-green'>CERT</div> : <div className='text-skyblue'>개발</div>}</div>
            <div className='w-[100px] h-full text-center content-center'>{key.studentId}</div>
            <div className='w-[200px] h-full text-center content-center'>{key.major1.name}</div>
            <div className='w-[200px] h-full text-center content-center'>{key.major2.name}</div>
            <div className='w-[200px] h-full text-center content-center'>{key.major3.name}</div>
            <div className='w-[150px] h-full text-center content-center'>{key.grade.name}</div>
            <button className='flex w-[80px] h-full justify-center content-center'>
                {IconCheck("w-[20px] h-auto", `green`)}
            </button>
            <div className='w-[100px] h-full text-center content-center'>100%(10/10)</div>


        </div>
    </div>));
    useEffect(() => {
        getApplicatsList();
    }, []);
    return (
        <div className='w-full h-auto'>
            <div className="flex text-[20px] text-pink font-bold items-center w-full h-[30px]">
                <img src="/IconFile.svg" className="mr-[5px]" />관리자페이지 {`>`} 회원 출석 관리
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
                {applicatsData.length ? applicatsList : <div className='w-full h-auto px-[10px] pb-[10px]'><hr className="w-full h-[2px] bg-blue border-0 my-[10px]"/>신청자가 없습니다.</div>}
            </div>
        </div>
    )
}