"use client"
import { postData } from "./page";
import { PostItem, PostListHeading } from "../../../ComponentPostList";
import { ShowCategory } from "../../../ComponentInUserWritingPost";
interface postDataObject {                     // json으로 받는 객체 타입 정의
    id: number;
    user: string;
    title: string;
    headline: string;
    timestamp : string;
    postComment ?: number;
    bookmark ?: boolean;
    majorCategory ?: string;
    subCategory ?: string;
}

export default function UserCommentList() {
    
    return (
        <div className="flex-col rounded-lg w-auto h-auto bg-deepBlue mt-[20px] p-[20px]">
            <div className="flex items-center">
                <div className="text-white text-[20px] font-bold w-[220px] text-center ">
                    카테고리
                </div>
                {PostListHeading(true, true)}
            </div>
            <hr className="h-1 bg-blue border-0 mt-[5px]"></hr>
            {postData.map((key:postDataObject)=> (<div>{PostItem(true, true, key, ShowCategory)}<hr className="h-[3px] bg-blue border-0 mt-[5px]"></hr></div>))}
        </div>
    )
}