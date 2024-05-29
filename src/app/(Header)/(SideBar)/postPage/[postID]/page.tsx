"use client"

import Header from "../../../../ComponentsHeader";
import SideBar from "../../../../ComponentSideBar";
import Footer from "../../../../ComponentFooter";
import Post from "./ComponentPost";
import axios from "axios";
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
    content:string;
}
interface categoryDataObject {
    id: number;
    name: string;
}
let postData: postDataObject;
let test;
const commnetData: any[] = [
    {
        user: {
            name: "김철수",
            id: "22113966"
        },
        timestamp: "2024-02-13T13:00:00+09:00",
        comment: "유용하네요."
    },
    {
        user: {
            name: "김철수",
            id: "22113966"
        },
        timestamp: "2024-02-13T13:00:00+09:00",
        comment: "관련 자료는 ~에서 찾을 수 있습니다."
    }
]
export default function ({ params }: { params: { postID: Number } }) {         // 수정 : string에서 number로. 경로를 카테고리 번호로 변경
    const [postData, setTest] = useState<postDataObject | null>();
    const userToken = useSelector((state: RootState) => state.user.token);
    const getPostData = async () => {
        try {
            const response = await axios.get(`http://3.35.239.36:8080/api/posts/${params.postID}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }).then(res => {
                setTest(res.data.data);
                console.log("게시글 정보 불러오기 성공", res.data.data);
            });
        } catch (error) {
            console.error('게시글 정보 실패:', error);
            throw error;
        }
    }
    useEffect(() => {
        getPostData();
    }, []);
    return (
        <div className="w-full flex flex-row">
            <div className="grow">
                {postData!=null && <Post postData={postData}/>}
            </div>
        </div>
    );
};
export { postData, commnetData };