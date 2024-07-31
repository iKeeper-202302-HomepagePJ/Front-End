'use client';
import Image from 'next/image';
import { useEffect, useState } from "react";
import axios from 'axios';
import { IconWarining, iconPencil } from '@/app/SvgIcons';
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
    warning: boolean;
}
export default function UserList() {
    const [userData, setUserData] = useState<formDataObject[]>([])
    const [modifyUserData, setModifyUserData] = useState<formDataObject>()
    const [showToggle, setShowToggle] = useState<string>("")
    const [showModify, setShowModify] = useState<string>("")
    const [modifyName, setModifyName] = useState<string>("")
    const getApplicatsList = async () => {
        try {
          const response = (await axios.get('http://3.35.239.36:8080/api/members')).data.data;
          console.log('응답 데이터:', response);
          setUserData(response)
        } catch (error) {
          console.error('Failed to fetch dropdown options:', error);
        }
    };
    const applicatsList = userData.map((key: formDataObject) => (<div id={`applicat${key.studentId}`} className='relative w-full h-auto text-wrap justify-center text-[16px] px-[10px] mb-[5px]'>
        <hr className="w-full h-[2px] bg-blue border-0 mb-[5px]" />
        { key.studentId==showModify && <div className='absolute left-0 top-0 w-full h-auto py-[5px] mt-[7px] pb-1 flex flex-row justify-between px-[10px]'>
            <input name={`${key.studentId}`} className={`w-[100px] h-full focus:outline-none bg-blue rounded-lg`} type="text" defaultValue={key.name} onChange={(e) => { setModifyName(e.target.value) }} />
            <div className='w-[100px] h-full text-center content-center bg-deepBlue'>{key.field.id == 1 ? <div className='text-green'>CERT</div> : <div className='text-skyblue'>개발</div>}</div>
            <input name={`${key.studentId}`} className={`w-[150px] h-full focus:outline-none bg-blue rounded-lg`} type="text" defaultValue={key.pnumber} onChange={(e) => { setModifyName(e.target.value) }} />
            <input name={`${key.studentId}`} className={`w-[150px] h-full focus:outline-none bg-blue rounded-lg`} type="text" defaultValue={key.birth} onChange={(e) => { setModifyName(e.target.value) }} />
            <input name={`${key.studentId}`} className={`w-[200px] h-full focus:outline-none bg-blue rounded-lg`} type="text" defaultValue={key.email} onChange={(e) => { setModifyName(e.target.value) }} />
            <input name={`${key.studentId}`} className={`w-[100px] h-full focus:outline-none bg-blue rounded-lg`} type="text" defaultValue={key.studentId} onChange={(e) => { setModifyName(e.target.value) }} />
            <div className='w-[200px] h-full text-center content-center bg-deepBlue'>{key.major1.name}</div>
            <div className='w-[150px] h-full text-center content-center bg-deepBlue'>{key.grade.name}</div>
            <div className='w-[150px] h-full text-center content-center bg-deepBlue'>{key.status.name}</div>
            <div className='w-[50px] h-full text-center content-center bg-deepBlue'>{IconWarining('w-[30px], h-[30px]', `${key!.warning ? 'orange' : 'blue'}`)}</div>
            <div className='w-[50px] h-full text-center content-center bg-deepBlue'></div>
        </div>}
        <div className='w-full py-[5px] h-auto flex flex-row justify-between'>
            <div className='w-[100px] h-full text-center content-center'>{key.name}</div>
            <div className='w-[100px] h-full text-center content-center'>{key.field.id == 1 ? <div className='text-green'>CERT</div> : <div className='text-skyblue'>개발</div>}</div>
            <div className='w-[150px] h-full text-center content-center'>{key.pnumber}</div>
            <div className='w-[150px] h-full text-center content-center'>{key.birth}</div>
            <div className='w-[200px] h-full text-center content-center'>{key.email}</div>
            <div className='w-[100px] h-full text-center content-center'>{key.studentId}</div>
            <div className='w-[200px] h-full text-center content-center'>{key.major1.name}</div>
            <div className='w-[150px] h-full text-center content-center'>{key.grade.name}</div>
            <div className='w-[150px] h-full text-center content-center'>{key.status.name}</div>
            <div className='w-[50px] h-full text-center content-center'>{IconWarining('w-[30px], h-[30px]', `${key!.warning ? 'orange' : 'blue'}`)}</div>
            <button className='w-[50px] h-full justify-cente content-center' onClick={()=>(setShowModify(key.studentId))}>
                {iconPencil('w-[30px] h-[30px] fill-none', 'green')}
            </button>

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
                    <div className='w-[150px] h-full text-center content-center'>재적 상태</div>
                    <div className='w-[50px] h-full text-center content-center'>경고</div>
                    <div className='w-[50px] h-full text-center content-center'></div>
                </div>
                {userData.length ? applicatsList : <div className='w-full h-auto px-[10px] pb-[10px]'><hr className="w-full h-[2px] bg-blue border-0 my-[10px]" />회원이 없습니다.</div>}
            </div>
        </div>
    )
}