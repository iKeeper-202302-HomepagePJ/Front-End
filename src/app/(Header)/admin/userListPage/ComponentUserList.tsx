'use client';
import Image from 'next/image';
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { IconCheck, IconWarining, iconPencil } from '@/app/SvgIcons';
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
    const [modifyStudentId, setModifyStudentId] = useState<string>("")
    const [modifyPnumber, setModifyPnumber] = useState<string>("")
    const [modifyBirth, setModifyBirth] = useState<string>("")
    const [modifyEmail, setModifyEmail,] = useState<string>("")
    const [modifyMajor1, setModifyMajor1] = useState<string>("")
    const [modifyGrade, setModifyGrade] = useState<string>("")
    const [modifyState, setModifyState] = useState<string>("")
    const [modifyWarning, setModifyWarning] = useState<string>("")

    const getApplicatsList = async () => {
        try {
          const response = (await api.get('/api/members')).data.data;
          console.log('응답 데이터:', response);
          setUserData(response)
        } catch (error) {
          console.error('Failed to fetch dropdown options:', error);
        }
    };
    const applicatsList = userData.map((user: formDataObject) => (<div id={`applicat${user.studentId}`} key={user.studentId} className='relative w-full h-auto text-wrap justify-center text-[16px] px-[10px] my-[8px]'>
        <hr className="w-full h-[2px] bg-blue border-0" />
        { user.studentId==showModify && <div className='absolute left-0 top-0 w-full h-[40px] py-[5px] mt-[3px] flex flex-row justify-between px-[10px] bg-deepBlue space-x-[10px]'>
            <input name={`${user.studentId}`} className={`w-[95px] h-full focus:outline-none bg-blue rounded-lg`} type="text" defaultValue={user.name} onChange={(e) => { setModifyName(e.target.value) }} />
            <div className='w-[95px] h-full text-center content-center bg-deepBlue'>{user.field.id == 3 ? <div className='text-skyblue'>CERT</div> : <div className='text-green'>개발</div>}</div>
            <input name={`${user.studentId}`} className={`w-[145px] h-full focus:outline-none bg-blue rounded-lg`} type="text" defaultValue={user.pnumber} onChange={(e) => { setModifyName(e.target.value) }} />
            <input name={`${user.studentId}`} className={`w-[145px] h-full focus:outline-none bg-blue rounded-lg`} type="text" defaultValue={user.birth} onChange={(e) => { setModifyName(e.target.value) }} />
            <input name={`${user.studentId}`} className={`w-[245px] h-full focus:outline-none bg-blue rounded-lg`} type="text" defaultValue={user.email} onChange={(e) => { setModifyName(e.target.value) }} />
            <input name={`${user.studentId}`} className={`w-[95px] h-full focus:outline-none bg-blue rounded-lg`} type="text" defaultValue={user.studentId} onChange={(e) => { setModifyName(e.target.value) }} />
            <div className='w-[195px] h-full text-center content-center bg-deepBlue'>{user.major1.name}</div>
            <div className='w-[145px] h-full text-center content-center bg-deepBlue'>{user.grade.name}</div>
            <div className='w-[145px] h-full text-center content-center bg-deepBlue'>{user.status.name}</div>
            <button className='w-[45px] h-full text-center content-center bg-deepBlue'>{IconWarining('w-[30px], h-[30px]', `${user!.warning ? 'orange' : 'blue'}`)}</button>
            <button className='w-[45px] h-full text-center content-center bg-deepBlue'>{IconCheck('w-[18px]', 'green')}</button>
        </div>}
        <div className='w-full h-auto flex flex-row justify-between items-center mt-[3px]'>
            <div className='w-[100px] h-full text-center content-center'>{user.name}</div>
            <div className='w-[100px] h-full text-center content-center'>{user.field.id == 3 ? <div className='text-skyblue'>CERT</div> : <div className='text-green'>개발</div>}</div>
            <div className='w-[150px] h-full text-center content-center'>{user.pnumber}</div>
            <div className='w-[150px] h-full text-center content-center'>{user.birth}</div>
            <div className='w-[250px] h-full text-center content-center'>{user.email}</div>
            <div className='w-[100px] h-full text-center content-center'>{user.studentId}</div>
            <div className='w-[200px] h-full text-center content-center'>{user.major1.name}</div>
            <div className='w-[150px] h-full text-center content-center'>{user.grade.name}</div>
            <div className='w-[150px] h-full text-center content-center'>{user.status.name}</div>
            <div className='w-[50px] h-full text-center content-center'>{IconWarining('w-[30px], h-[30px]', `${user!.warning ? 'orange' : 'blue'}`)}</div>
            <button className='w-[50px] h-full justify-cente items-center' onClick={()=>(setShowModify(user.studentId))}>
                {iconPencil('w-[18px]', 'green')}
            </button>
        </div>
    </div>));
    useEffect(() => {
        getApplicatsList();
    }, []);
    return (
        <div className='w-full h-auto'>
            <div className="flex text-[20px] text-pink font-bold items-center w-full h-[30px] mb-[20px]">
                <img src="/IconFile.svg" className="mr-[5px]" /><a className='mr-[5px]' href='/admin'>관리자페이지</a> {` > `} <a className='mr-[5px]' href=''>회원 관리</a>
            </div>
            <div className='bg-deepBlue rounded-lg w-full h-auto mt-[20px] p-[8px]'>
                <div className='flex text-orange test-[20px] font-bold w-auto h-[50px] justify-between px-[10px]'>
                    <div className='w-[100px] h-full text-center content-center'>이름</div>
                    <div className='w-[100px] h-full text-center content-center'>분야</div>
                    <div className='w-[150px] h-full text-center content-center'>전화번호</div>
                    <div className='w-[150px] h-full text-center content-center'>생년월일</div>
                    <div className='w-[250px] h-full text-center content-center'>e-mail</div>
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