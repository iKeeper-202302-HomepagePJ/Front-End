'use client';
import Image from 'next/image';
import { useEffect, useState } from "react";
import axios from 'axios';
interface formDataObject {
    name: string;
    birth: string;
    pnumber: string;
    email: string;
    field: {
        id: number;
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
    studentId: string;
}
export default function ApplicantsList() {
    const [applicatsData, setApplicatsData] = useState<formDataObject[]>([])
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
            birth: "030324",
            pnumber: "010203034953",
            email: "asdf@gmail.com",
            field: {
                id: 2,
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
            studentId: "22331242"
        }])
    };
    const applicatsList = applicatsData.map((key: formDataObject) => (<div id={`applicat${key.studentId}`} className='w-full h-auto text-wrap justify-center text-[16px] px-[10px] mb-[5px]'>
        <hr className="w-full h-[2px] bg-blue border-0 mb-[5px]"/>
        <div className='w-full py-[5px] h-auto flex flex-row justify-between'>
            <div className='w-[100px] h-full text-center content-center'>{key.name}</div>
            <div className='w-[100px] h-full text-center content-center'>{key.field.id == 1 ? <div className='text-green'>CERT</div> : <div className='text-skyblue'>개발</div>}</div>
            <div className='w-[150px] h-full text-center content-center'>{key.pnumber}</div>
            <div className='w-[150px] h-full text-center content-center'>{key.birth}</div>
            <div className='w-[200px] h-full text-center content-center'>{key.email}</div>
            <div className='w-[100px] h-full text-center content-center'>{key.studentId}</div>
            <div className='w-[200px] h-full text-center content-center'>{key.major1.name}</div>
            <div className='w-[150px] h-full text-center content-center'>{key.grade.name}</div>
            <div className='flex flex-row w-[150px] h-full justify-center text-center content-center font-black'>
                <button className='text-green'>O</button>
                <div className='w-[5px]'></div>
                <button className='text-red'>X</button>
            </div>

        </div>
    </div>));
    useEffect(() => {
        getApplicatsList();
    }, []);
    return (
        <div className='w-full h-auto'>
            <div className="flex text-[20px] text-pink font-bold items-center w-full">
                <img src="/IconFile.svg" className="mr-[5px]" />관리자페이지 {`>`} 회원가입 신청 승인
            </div>
            <div className='bg-deepBlue rounded-lg w-full h-auto mt-[20px]'>
                <div className='flex text-orange test-[20px] font-bold w-auto h-[50px] justify-between px-[10px]'>
                    <div className='w-[100px] h-full text-center content-center'>이름</div>
                    <div className='w-[100px] h-full text-center content-center'>분야</div>
                    <div className='w-[150px] h-full text-center content-center'>전화번호</div>
                    <div className='w-[150px] h-full text-center content-center'>생년월일</div>
                    <div className='w-[200px] h-full text-center content-center'>e-mail</div>
                    <div className='w-[100px] h-full text-center content-center'>학번</div>
                    <div className='w-[200px] h-full text-center content-center'>학부/학과(전공)</div>
                    <div className='w-[150px] h-full text-center content-center'>학년 및 학차</div>
                    <div className='w-[150px] h-full text-center content-center'>수락/거부</div>
                </div>
                {applicatsData.length ? applicatsList : <div className='w-full h-auto px-[10px] pb-[10px]'><hr className="w-full h-[2px] bg-blue border-0 my-[10px]"/>신청자가 없습니다.</div>}
            </div>
        </div>
    )
}