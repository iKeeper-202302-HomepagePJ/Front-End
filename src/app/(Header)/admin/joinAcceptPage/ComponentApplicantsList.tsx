'use client';
import Image from 'next/image';
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store';
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
    const userToken = useSelector((state: RootState) => state.user.token);
    const getApplicatsList = async () => {
        try {
            const response = (await api.get('/api/members/role/guest')).data.data;
            console.log('관리자 목록:', response);
            setApplicatsData(response)
        } catch (error) {
            console.error('Failed to fetch dropdown options:', error);
        }
    };
    const SetNewUser = async (id: string) => {
        try {
            const response = (await api.patch(`/api/members/role/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })).data.data
            console.log('응답 데이터ll:', response);
            getApplicatsList();
        } catch (error) {
            console.error('검색안됨', error);
        }
    }
    const applicatsList = applicatsData.map((key: formDataObject) => (<div id={`applicat${key.studentId}`} className='w-full h-auto text-wrap justify-center text-[16px] px-[10px] mb-[5px]'>
        <hr className="w-full h-[2px] bg-blue border-0 mb-[5px]"/>
        <div className='w-full py-[5px] h-[40px] flex flex-row justify-between'>
            <div className='w-[100px] h-full text-center content-center'>{key.name}</div>
            <div className='w-[100px] h-full text-center content-center'>{key.field.id == 3 ? <div className='text-skyblue'>CERT</div> : <div className='text-green'>개발</div>}</div>
            <div className='w-[150px] h-full text-center content-center'>{key.pnumber}</div>
            <div className='w-[150px] h-full text-center content-center'>{key.birth}</div>
            <div className='w-[250px] h-full text-center content-center'>{key.email}</div>
            <div className='w-[100px] h-full text-center content-center'>{key.studentId}</div>
            <div className='w-[200px] h-full text-center content-center'>{key.major1.name}</div>
            <div className='w-[150px] h-full text-center content-center'>{key.grade.name}</div>
            <div className='flex flex-row w-[150px] h-full justify-center text-center content-center items-center font-black'>
                <button className='text-green h-full mb-[1px]' onClick={() => SetNewUser(key.studentId)}>O</button>
                <div className='w-[5px]'></div>
                <button className='text-red h-full]'>X</button>
            </div>

        </div>
    </div>));
    useEffect(() => {
        getApplicatsList();
    }, []);
    return (
        <div className='w-full h-auto'>
            <div className="flex text-[20px] text-pink font-bold items-center w-full h-[30px] mb-[20px]">
                <img src="/IconFile.svg" className="mr-[5px]" /><a className='mr-[5px]' href='/admin'>관리자페이지</a> {` > `} <a className='mr-[5px]' href='/admin/adminManagement'>회원가입 신청 승인</a>
            </div>
            <div className='bg-deepBlue rounded-lg w-full h-auto mt-[20px]'>
                <div className='flex text-orange test-[20px] font-bold w-auto h-[50px] justify-between px-[10px]'>
                    <div className='w-[100px] h-full text-center content-center'>이름</div>
                    <div className='w-[100px] h-full text-center content-center'>분야</div>
                    <div className='w-[150px] h-full text-center content-center'>전화번호</div>
                    <div className='w-[150px] h-full text-center content-center'>생년월일</div>
                    <div className='w-[250px] h-full text-center content-center'>e-mail</div>
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