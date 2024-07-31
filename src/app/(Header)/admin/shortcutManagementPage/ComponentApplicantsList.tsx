'use client';
import Image from 'next/image';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function ApplicantsList() {
    const [shortcutData, setShortcutData] = useState<any[]>([])
    const [shortcutLength, setShortcutLength] = useState(0)
    const [test, setT] = useState<any>("asdf")
    const getShortcutList = async () => {
        /*try {
          const response = (await axios.get('http://3.35.239.36:8080/api/members/major')).data.data;
          console.log('응답 데이터:', response);
          setApplicatsData(response);
        } catch (error) {
          console.error('Failed to fetch dropdown options:', error);
        }*/
        setShortcutData([{ src: "/test.png", href: "https://www.facebook.com/cu.ikeeper?locale=ko_KR" }])
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
        <div className={`w-full h-[120px] bg-deepBlue rounded-lg py-[20px] px-[30px] flex font-bold text-[16px] content-center items-center ${shortcutLength <= i && `opacity-30`}`}>
            <div className='relative w-auto h-auto'>
                <input type="file" accept="image/*" id="UploadUseIamge" className='hidden' onChange={()=>handleImageUpload(e.target.value)}></input>
                <img className='object-cover w-[80px] h-[80px] rounded-lg mr-[30px]' src={shortcutLength <= i ? `/noImage.png` : shortcutData[i].src && shortcutData[i].src} />
            <img className='absolute left-[50px] top-[50px] w-[40px] h-[40px] rounded-lg z-20' src="/IconUpload.svg" onClick={() => { console.log("ㅋ") }} />
            <label   htmlFor="UploadUseIamge" className='opacity-0 absolute top-[60px] left-[10px] w-[60px] h-[30px] bg-blue rounded-md text-[14px] font-semibold text-white flex items-center justify-center'>
                    </label>
            </div>
            {`Link`}
            <input disabled={shortcutLength > i ? false : true}  className='bg-blue ml-[10px] rounded-lg h-[50px] w-full px-[10px]' />
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