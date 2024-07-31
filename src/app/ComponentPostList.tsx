'use client'

import { useState } from "react";
import { IconLoudSpeaker } from "./SvgIcons"
//import { majorList } from "./(Header)/(SideBar)/myPage/page";

interface postObject {                     // json으로 받는 객체 타입 정의
    id: number;
    postUser: string;
    title: string;
    headline: {
        id:number;
        name:string;
    };
    category:{
        categoryLarge:{
            id:number;
            name:string;
        };
        categorySmall:{
            id:number;
            name:string;
        };
        id:number;
    }
    postTime: string;
    comments: any[];
    commentWhether:boolean;
    disclosure:boolean;
    fix:boolean;
    postStudentId:string;
    updateCheck:boolean;
    content:string;
}
const PostItem = (showHeadline:boolean, showWriter:boolean, postData : any, addPostListComponent : Function, index?:number, iconBoolean?:boolean) => {
    return (
        <div className="w-full text-[16px] font-bold flex text-center mt-[5px] items-center h-[40px]">
            {addPostListComponent.length ==2 ? addPostListComponent(postData.category.categoryLarge.name, postData.category.categorySmall.name):addPostListComponent(postData.id, index, iconBoolean)}
            {showHeadline && <div className="flex flex-none w-[120px] text-skyblue justify-center mr-1"><p className="whitespace-pre max-w-[100px] truncate">{`[${postData.headline.name}`}</p>{`]`}</div>}
            <div className="w-1 grow flex items-center"><p className="truncate max-w-[550px] whitespace-pre">{postData.title}</p>{
                postData.comments.length && <div className="text-orange flex w-[40px] h-[20px] mx-5 items-center"><img src="/IconChat.svg"/>{postData.comments.length}</div>
            }
            </div>
            {showWriter && <div className="w-[100px] text-pink">{postData.postUser}</div>}
            <div className="w-[100px] text-green">{`${postData.postTime.slice(0,4)}.${postData.postTime.slice(5,7)}.${postData.postTime.slice(8,10)}`}</div>
        </div>
    )
}
function PostListHeading(showHeadline:boolean, showWriter:boolean, foreword?:string[]) {
    const [showForewordToggle, setForewordToggle] = useState(false);
    const setHeadline = (headline:string) => {

    }
    const toggleItemBox = () => {
        return (
            <button className={`absolute fixed top-0 left-0 z-10`} onClick={(e) => {e.stopPropagation(); setForewordToggle(false); }} onMouseLeave={() => setForewordToggle(false)}>
                <div className='w-[150px]  bg-deepBlue'>
                    <div className="ml-[20px] flex items-center">
                    머리말<img src="/IconToggle.svg" className="w-[15px] ml-1 rotate-180 "></img>
                    </div>
                </div>
                <div className="w-[350px] h-auto px-[10px] py-1  rounded-lg bg-blue mt-[10px] drop-shadow-lg">
                {foreword && foreword.map((key: string) => (<div id={`toggle${key}`} className='w-full h-[30px] text-left text-[16px]' onClick={() => { setForewordToggle(false); setHeadline(key);}}>{key}</div>))}
                </div>
            </button>
        )
    }
    return (
        <div className="w-full h-auto text-[20px] font-bold flex text-center items-center">
            {showHeadline && <div className="flex justify-center items-center w-[120px] relative  mr-1" onClick={()=>setForewordToggle(true)}>머리말{foreword && <img src="/IconToggle.svg" className="w-[15px] ml-1"></img>}
                {foreword && showForewordToggle && toggleItemBox()}    
            </div> }
            <div className="w-1 grow">제목</div>
            {showWriter && <div className="w-[100px]">작성자</div>}
            <div className="w-[100px]">작성일</div>
        </div>
    )
}

export {PostItem, PostListHeading}