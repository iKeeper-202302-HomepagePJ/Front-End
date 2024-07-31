"use client"

import PathMovement from "@/app/ComponentPathMovement"
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store';
import axios from "axios";
import { useState, useEffect } from "react";
interface adminDataObject {
    "studentID": string,
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
    const [newAdmin, setNewAdmin] = useState<null|string|adminDataObject>(null);
    const userToken = useSelector((state: RootState) => state.user.token);
    const getAdminList = async () => {
        try {
            const response = (await axios.get('http://3.35.239.36:8080/api/members/role/admin')).data;
            console.log('응답 데이터:', response);
            setAdminData(response);
        } catch (error) {
            console.error('Failed to fetch dropdown options:', error);
        }
    };
    const getStudentData = async () => {
        try {
            const response = (await axios.get(`http://3.35.239.36:8080/api/members/${findStudent}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })).data.data
            console.log('응답 데이터:', response);
            if (response == null){
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
    const SetNewAdmin = async (id:string) => {
        try {
            const response = (await axios.patch(`http://3.35.239.36:8080/api/members/role/admin/${id}`, {
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
        getAdminList();
    }, []);
    return (
        <div className="w-full h-fit">
            <div className="flex text-[20px] text-pink font-bold items-center w-full h-[30px] mb-[20px]">
                <img src="/IconFile.svg" className="mr-[5px]" /><a className='mr-[5px]' href='/admin'>관리자페이지</a> {` > `} <a className='mr-[5px]' href='/admin/adminManagement'>권한 관리</a>
            </div>
            <div className="w-[870px] h-auto bg-deepBlue rounded-lg p-[20px]">
                <div className="font-semibold justify-between flex items-center text-[16px] rounded-lg mb-[20px]">
                    <textarea key={`searchID`} value={findStudent} className="bg-blue resize-none w-[calc(100%-110px)]" rows={1} maxLength={8} onChange={(e) => { setFindStudent(e.target.value); }} />
                    <button className="w-[20px] h-[20px]" onClick={() => getStudentData()}><img className='h-full' src='/IconSearch.svg' /> </button>
                </div>
                <div className="mt-20px flex w-full h-auto">
                    {newAdmin != null && <div className="w-full">{typeof newAdmin === 'string' ? `${newAdmin}` :
                        <div className="w-full flex font-semibold justify-between items-center rounded-lg">
                        <div>{newAdmin.name}</div>
                        <div>{newAdmin.studentID}</div>
                        <div className={`text-${newAdmin.field.id == 2 ? `green` : `skyblue`}`}>{newAdmin.field.id == 2 ? `개발` : `CERT`}</div>
                        <div>{newAdmin.major1.name}</div>
                        <div>{newAdmin.grade.name}</div>
                        <div className="w-[20px] h-[20px] rounded-[180px] bg-green text-black" onClick={() => SetNewAdmin(newAdmin.studentID)}>+</div>
                    </div>
                    }</div>}
                </div>
            </div>

            <div className="w-auto h-auto flex flex-col justify-items-center h-auto bg-blue">
                {adminData.length ? adminData.map((key: adminDataObject, index: number) => (
                    <div className="font-semibold w-[870px] h-[75px] justify-between flex items-center bg-deepBlue text-[16px] rounded-lg mb-[20px]">
                        <div />
                        <div>{key.name}</div>
                        <div>{key.studentID}</div>
                        <div className={`text-${key.field.id == 2 ? `green` : `skyblue`}`}>{key.field.id == 2 ? `개발` : `CERT`}</div>
                        <div>{key.major1.name}</div>
                        <div>{key.grade.name}</div>
                        <button className="h-[28px]"><img className="h-full" src="/BTNDelete.svg" onClick={() => setAdminData(adminData.splice(index - 1, 1))} /></button>
                        <div />
                    </div>
                )) : <div>관리자 없다 다 망했다</div>}
                <div className="fixed w-full h-full bg-black"></div>
            </div>
        </div>
    )
}
