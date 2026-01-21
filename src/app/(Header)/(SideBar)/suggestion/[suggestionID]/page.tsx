"use client"

import Header from "../../../../ComponentsHeader";
import SideBar from "../../../../ComponentSideBar";
import Footer from "../../../../ComponentFooter";
import Suggestion from "./ComponentPost";
import { api } from "@/lib/axios";
import { useSelector } from "react-redux";
import { RootState } from '../../../../redux/store';
import { useState, useEffect } from "react";
interface postDataObject {                     // json으로 받는 객체 타입 정의
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
    content:any;
}
interface categoryDataObject {
    id: number;
    name: string;
}
export default function  SuggestionPage ({ params }: { params: { postID: Number } }) {         // 수정 : string에서 number로. 경로를 카테고리 번호로 변경
    const [postData, setPostData] = useState<postDataObject | null>();
    const userToken = useSelector((state: RootState) => state.user.token);
    const getPostData = async () => {
        try {
            const response = await api.get(`/api/posts/${params.postID}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }).then(res => {
                setPostData(res.data.data);
                console.log("게시글 정보 불러오기 성공", res.data.data);
            });
        } catch (error) {
            console.error('게시글 정보 실패:', error);
            throw error;
        }
    }
    useEffect(() => {
    }, []);
    return (
        <div className="w-full flex flex-row mt-[50px]">
            <div className="grow">
                {postData!=null && <Suggestion post={postData}/>}
            </div>
        </div>
    );
};