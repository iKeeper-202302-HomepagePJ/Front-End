"use client"

import Header from "../../../ComponentsHeader";
import SideBar from "../../../ComponentSideBar";
import Footer from "../../../ComponentFooter";
import PostList from "./ComponentPostList";
import { useRouter } from 'next/navigation'
import { useSelector } from "react-redux";
import { RootState } from '../../../redux/store';
import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/axios";
import {GetCategoryListAndSideBar} from "../../../ComponentSideBarCategoryList";
interface postDataObject {                     // json으로 받는 객체 타입 정의
    id: number;
    user: string;
    title: string;
    headline: string;
    timestamp: string;
    postComment: number;
    bookmark: boolean
}
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
interface postListObject {
    
}
const postData: postDataObject[] = [
    {
        id: 1,
        user: "김가글",
        title: "글자수가오십자인것에한번최대한길게해보려는건에대하여글자수가오십자인것에한번최대한길게해보려는건에대하",
        headline: '최대이십글자더라가나다라마바다사아다바마',
        timestamp: "2024-02-13T13:00:00+09:00",
        postComment: 1,
        bookmark: true
    },
    {
        id: 2,
        user: "김나다",
        title: "가나다",
        headline: "2회차",
        timestamp: "2024-02-13T13:00:00+09:00",
        postComment: 3,
        bookmark: false
    }
]
const postHeadingList = ['1회차', '2회차', '최대이십글자더라가나다라마바다사아다바마'];
const adminPower = false;
export default function ({ params }: { params: { category: string[] } }) {         // 수정 : string에서 number로. 경로를 카테고리 번호로 변경
    const [postListData, setPostList] = useState<any>([]);
    const [page, setPage] = useState<{lastPostListPage:number, page:number}>({lastPostListPage:0, page:0});
    const [categoryList, getCategoryList] = useState<any[]>([])
    const userToken = useSelector((state: RootState) => state.user.token);
    let baseUrl = params.category;
    const urlpage = Number(params.category[params.category.length-1]);
    const getPostListData = useCallback(async () => {
        try {
            console.log("나대체뭘보낸거야", urlpage-1)
            const response = await api.get(`/api/posts/?page=${urlpage}`).then(res => {
                setPostList(res.data.data.content);
                console.log("게시글 목록 정보 불러오기 성공", res.data.data);
                console.log("나대체뭘보낸거야", urlpage-1)
                setPage({
                    lastPostListPage : res.data.data.totalPages,
                    page : urlpage > res.data.data.totalPages ? res.data.data.totalPages : urlpage<1 ? 1 : urlpage
                })
            });
        } catch (error) {
            console.error('게시글 목록 정보 실패:', error);
            throw error;
        }
    }, [urlpage])
    useEffect(() => {
        getPostListData();
    }, [getPostListData]);
    if (postListData == null) return null;
    return (
        <main className="flex min-h-screen bg-black w-full">
            <div className="w-full h-[30px] mt-[50px]">
                <div className="flex text-[20px] text-pink font-bold items-center w-full h-[30px]">
                    <img src="/IconFile.svg" className="mr-[5px]" />{params.category[1] ? <div>{decodeURI(params.category[0])} {Boolean(params.category[2]) && `> ${decodeURI(params.category[2])}`}</div> : "전체 게시물"}
                </div>
                <PostList page={page} baseUrl={baseUrl.join('/')} postListData={postListData} />
                </div>
                {GetCategoryListAndSideBar(getCategoryList)}
        </main>
    );
};
/*
export default function ({ params }: { params: { category?: number[] } }) {
    return (
        <main className="flex min-h-screen bg-black flex-col items-center">
            <div className="w-3/4 w-max-[1450px] w-min-[370px] h-auto">
                {<Header />}
                <div className="w-full w-min-[370px] flex mt-10 justify-normal">
                    {<div><div className="flex text-[20px] text-pink font-bold"><img src="/IconFile.svg"/>{params.category ? `${decodeURI(params.category[0])} ${params.category[1] && `> ${decodeURI(params.category[1])}`}` : "전체 게시물"}</div><PostList /></div>}
                    {<SideBar />}
                </div>
                {<Footer />}
            </div>
        </main>
    );
};
*/