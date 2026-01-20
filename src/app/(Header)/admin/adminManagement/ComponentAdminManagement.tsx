"use client"

import PathMovement from "@/app/ComponentPathMovement"
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store';
import { api } from "@/lib/axios";
import { useState, useEffect, useCallback } from "react";
interface adminDataObject {
    "studentId": string,
    "name": string,
    "field": {
        id: number,
        name: string,
    },
    major1: {
        id: number,
        name: string,
    },
    grade: {
        id: number,
        name: string,
    },
}

export default function AdminList() {
    const [adminData, setAdminData] = useState<adminDataObject[]>([]);
    const [findStudent, setFindStudent] = useState<string>("");
    const [newAdmin, setNewAdmin] = useState<null | string | adminDataObject>(null);
    const userToken = useSelector((state: RootState) => state.user.token);
    const [addAdminData, setAddAdminData] = useState<null | adminDataObject>(null)
    const [checkFirst, setCheckFirst] = useState(false)
    const getStudentData = async () => {
        try {
            const response = (await api.get(`/api/members/${findStudent}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })).data.data
            console.log('응답 데이터:', response);
            if (response == null) {
                setNewAdmin("해당 학번을 가지는 유저가 존재하지 않습니다.")
            }
            else {
                response.studentID = findStudent
                setNewAdmin(response);
            }
        } catch (error) {
            console.error('검색안됨', error);
        }
    }
    const settingList = useCallback(async (id: string) => {
        try {
            const response: adminDataObject = (await api.get(`/api/members/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })).data.data
            setAdminData(prevAdminData => [...prevAdminData, response]);
        } catch (error) {
            console.error('검색안됨', error);
        }
    }, [userToken])
    const getAdminList = useCallback(async () => {
        try {
            const response = (await api.get('/api/members/role/admin')).data.data;
            console.log('관리자 목록:', response);
            const requests = response.map((i: { studentId: string }) => settingList(i.studentId));
        } catch (error) {
            console.error('Failed to fetch dropdown options:', error);
        }
    }, [settingList]);
    const SetNewAdmin = async (id: string) => {
        try {
            const response = (await api.patch(`/api/members/role/admin/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })).data.data
            console.log('응답 데이터ll:', response);
        } catch (error) {
            console.error('검색안됨', error);
        }
    }
    const deletAdmin = async(id:string) => {
        try {
            const response = (await api.patch(`/api/members/role/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })).data.data
            console.log('응답 데이터ll:', response);
        } catch (error) {
            console.error('검색안됨', error);
        }
    }
    useEffect(() => {
        setCheckFirst(true)
    }, []);
    useEffect(() => {
        if (checkFirst) getAdminList();
    }, [checkFirst, getAdminList]);
    return (
        <div className="w-full h-auto">
            <div className="flex text-[20px] text-pink font-bold items-center w-full h-[30px] mb-[20px]">
                <img src="/IconFile.svg" className="mr-[5px]" /><a className='mr-[5px]' href='/admin'>관리자페이지</a> {` > `} <a className='mr-[5px]' href='/admin/adminManagement'>권한 관리</a>
            </div>
           
            <div className="w-[870px] h-auto rounded-lg">
            <div className="font-semibold test-[16px] mb-[20px]">• 관리자 추가</div>
                <div className="w-[870px] h-[75px] font-semibold bg-deepBlue justify-between flex items-center text-[16px] rounded-lg mb-[20px] px-[20px]">
                    <textarea key={`searchID`} value={findStudent} className="bg-blue resize-none w-[calc(100%-110px)]" rows={1} maxLength={8} onChange={(e) => { setFindStudent(e.target.value); }} />
                    <button className="w-[20px] h-[20px]" onClick={() => getStudentData()}><img className='h-full' src='/IconSearch.svg' /> </button>
                </div>
                <div className="flex w-full">
                    {newAdmin != null && <div className="w-full flex justify-items-center  mb-[20px]">{typeof newAdmin === 'string' ? `${newAdmin}` :<div>
                        <div className="w-[870px] h-[75px] bg-deepBlue flex font-semibold justify-between items-center rounded-lg">
                            <div />
                            <div>{newAdmin.name}</div>
                            <div>{newAdmin.studentId}</div>
                            <div className={`text-${newAdmin.field.id == 2 ? `green` : `skyblue`}`}>{newAdmin.field.id == 2 ? `개발` : `CERT`}</div>
                            <div>{newAdmin.major1.name}</div>
                            <div>{newAdmin.grade.name}</div>
                            <button className="w-[20px] h-[20px] rounded-[180px] bg-green text-black text-center" onClick={() => SetNewAdmin(newAdmin.studentId)}>+</button>
                            <div />
                        </div>
                        {Boolean(adminData.find(s => s.studentId === findStudent)) && "이미 관리자인 회원입니다"}
                        </div>
                    }</div>}
                </div>
            </div>
            <div className={`w-full h-auto flex flex-col justify-items-center`}>
            <div className="font-semibold test-[16px] my-[20px]">• 관리자 목록</div>
                {adminData.length ? adminData.map((key: adminDataObject, index: number) => (
                    <div className="font-semibold w-[870px] h-[75px] justify-between flex items-center bg-deepBlue text-[16px] rounded-lg mb-[20px]">
                        <div />
                        <div className="text-center w-[50px]">{key.name}</div>
                        <div>{key.studentId}</div>
                        <div className={`w-[50px] text-${key.field.id == 2 ? `green` : `skyblue`}`}>{key.field.id == 2 ? `개발` : `CERT`}</div>
                        <div className="text-center w-[200px]">{key.major1.name}</div>
                        <div className="text-center w-[150px]">{key.grade.name}</div>
                        <button className="h-[28px]"><img className="h-full" src="/BTNDelete.svg" onClick={() => {setAdminData(adminData.splice(index - 1, 1)); deletAdmin(key.studentId)}} /></button>
                        <div />
                    </div>
                )) : <div>관리자 없다 다 망했다</div>}
            </div>
        </div>
    )
}
