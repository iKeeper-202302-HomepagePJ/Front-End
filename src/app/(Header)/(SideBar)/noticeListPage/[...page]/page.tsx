"use client"
import Header from "../../../../ComponentsHeader";
import SideBar from "../../../../ComponentSideBar";
import Footer from "../../../../ComponentFooter";
import NoticeList from "./ComponentNotice";
import { useRouter } from 'next/navigation';
import { api } from "@/lib/axios";
import { useCallback, useState } from "react";
interface postDataObject {                     // json으로 받는 객체 타입 정의
    id: number;
    user: string;
    title: string;
    headline: string;
    timestamp: string;
    postComment: number;
    bookmark: boolean
}
interface categoryDataObject {
    id: number;
    name: string;
}

interface postList {
    "paging": {
      "content": [],
      "pageable": {
        "sort": {
          "empty": boolean,
          "sorted": boolean,
          "unsorted": boolean
        },
        "offset": number,
        "pageNumber": number,
        "pageSize": number,
        "paged": boolean,
        "unpaged": boolean
      },
      "totalPages": number,
      "totalElements": number,
      "last": boolean,
      "size": number,
      "number": number,
      "sort": {
        "empty": boolean,
        "sorted": boolean,
        "unsorted": boolean
      },
      "numberOfElements": number,
      "first": boolean,
      "empty": boolean
    }
}
interface headlineObject {
    id: number;
    name: string;
}
export default function NoticePage ({ params }: { params: { page: string[] } }) {         // 수정 : string에서 number로. 경로를 카테고리 번호로 변경
    const [postList, setPostList] = useState<postDataObject[]>([]);
    const [page, setPage] = useState(Number(params.page.pop()));
    const [lastPage, setLastPage] = useState(1);
    const [headlineList, setHeadlineList] = useState<headlineObject[]>([]);
    const getPostListData = useCallback(async () => {
            try {
                console.log("나대체뭘보낸거야", page-1)
                const response = await api.get(`/api/posts/?page=${page}`).then(res => {
                    setPostList(res.data.data.content);
                    console.log("게시글 목록 정보 불러오기 성공", res.data.data);
                    setLastPage(res.data.data.totalPage);
                    setPage(page > res.data.data.totalPages ? res.data.data.totalPages : page<1 ? 1 : page);
                });
                const res = await api.get('/api/posts/headline');
                setHeadlineList(res.data);
            } catch (error) {
                console.error('게시글 목록 정보 실패:', error);
                throw error;
            }
        }, [page])
    return (
        <main className="flex min-h-screen bg-black flex-col w-full">
            <div className="flex text-[20px] text-pink font-bold items-center">
                <img src="/IconFile.svg" className="mr-[5px]" />{params.page[0] ? <div>{decodeURI(params.page[0])} {params.page[2] && `> ${decodeURI(params.page[2])}`}</div> : "전체 공지"}
            </div>
            <NoticeList page={page} baseUrl={params.page.join('/')} isSmallCategory={params.page.length == 4 ? true : false} postData={postList} lastPostListPage={lastPage} postHeadingList={headlineList}/>
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