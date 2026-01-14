'use client';
import Image from 'next/image';
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { IconCheck, iconPencil } from '@/app/SvgIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

export default function ApplicantsList() {
    const [shortcutData, setShortcutData] = useState<any[]>([])
    const [shortcutLength, setShortcutLength] = useState(0)
    const [name, setName] = useState<string>("")
    const [link, setLink] = useState<string>("")
    const userToken = useSelector((state:RootState) => state.user.token);
    const getShortcutList = async () => {
        try {
          const response = (await api.get('/api/introduces/hyperlink')).data.data;
          console.log('응답 데이터:', response);
          setShortcutData(response);
          setShortcutLength(response.length)
        } catch (error) {
          console.error('Failed to fetch dropdown options:', error);
        }
    };
    const postShortcutList = async () => {
        try {
            // 서버로 로그인 요청 보내기
            const response = await api.post(`/api/introduces/hyperlink`, {name:name, url:link, img:"adsfasdf"},
            { headers: 
              { 
                Authorization: `Bearer ${userToken}`
              }
            }).then(res => {
              console.log('하이퍼링크 추가 성공', res.data);
              getShortcutList();
            })
          } catch (error) {
            console.error('하이퍼링크 추가 실패:', error);
          }
    };
    const deleteShortcut = async (id:number) => {
      try {
        const response = await api.delete(`/api/introduces/hyperlink/${id}`,).then(res => {
            console.log('하이퍼링크 삭제 성공', res.data);
            getShortcutList(); 
          })
        } catch (error) {
          console.error('하이퍼링크 삭제 실패:', error);
        }
      
  };
    useEffect(() => {
        getShortcutList();
    }, []);
    useEffect(() => {
        setShortcutLength(shortcutData.length)
    }, [shortcutData]);
    const handleImageUpload = (f:any) =>{
        console.log(f.target.value);
      };
    const shortcutBox = (Array.from({ length: 6 }, (_, i) => (
        <div className={`w-full h-[120px] bg-deepBlue rounded-lg py-[20px] px-[30px] flex font-bold text-[16px] content-center items-center ${shortcutLength < i && `opacity-30`}`}>
            
            {`Name`}
            <input disabled={shortcutLength >= i ? false : true}  defaultValue={Boolean(shortcutData.length) ? shortcutLength > i ? shortcutData[i].name : "" : ""} className='bg-blue ml-[10px] mr-[15px] rounded-lg h-[50px] w-[100px] px-[10px]' onChange={(e) => { setName(e.target.value) }}/>
  
            {`Link`}
            <input disabled={shortcutLength >= i ? false : true}  defaultValue={Boolean(shortcutData.length) ? shortcutLength > i ? shortcutData[i].url : "" : ""} className='bg-blue mx-[10px] rounded-lg h-[50px] w-full px-[10px]' onChange={(e) => { setLink(e.target.value) }}/>
            <button onClick={()=>postShortcutList()}>{iconPencil('w-[20px]', `green`)}</button>
            <button className="ml-[8px]" onClick={()=>deleteShortcut(Boolean(shortcutData.length) ? shortcutLength > i ? shortcutData[i].id : 0 : 0)}><img className="w-[40px]" src="/BTNDelete.svg" /></button>
        </div>
    )))
    return (
        <div className='w-full h-auto'>
            <div className="flex text-[20px] text-pink font-bold items-center w-full h-[30px] mb-[20px]">
                <img src="/IconFile.svg" className="mr-[5px]" /><a className='mr-[5px]' href='/admin'>관리자페이지</a> {` >`} 바로가기 관리
            </div>
            <div className='grid grid-cols-2 gap-[20px]'>
                {shortcutBox}
            </div>
        </div>
    )
}