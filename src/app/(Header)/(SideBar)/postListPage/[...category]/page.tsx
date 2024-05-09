import Header from "../../../../ComponentsHeader";
import SideBar from "../../../../ComponentSideBar";
import Footer from "../../../../ComponentFooter";
import PostList from "./ComponentPostList";
import { useRouter } from 'next/navigation'
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
const userWritingToday = 3;     /*****이거 유저 당일 게시물 작성 횟수 수정***** */
const lastPostListPage = 39; /*********이거 최대 페이지 수정****** */
const postHeadingList = ['1회차', '2회차', '최대이십글자더라가나다라마바다사아다바마'];
const adminPower = false;
export default function ({ params }: { params: { category: string[] } }) {         // 수정 : string에서 number로. 경로를 카테고리 번호로 변경
    let baseUrl = params.category;
    let page = Number(baseUrl.pop());
    page = page > lastPostListPage ? lastPostListPage : page;
    return (
        <main className="flex min-h-screen bg-black flex-col items-center w-full">
                <div className="flex text-[20px] text-pink font-bold items-center w-full">
                    <img src="/IconFile.svg" className="mr-[5px]" />{params.category[0] ? <div>{decodeURI(params.category[0])} {params.category[2] && `> ${decodeURI(params.category[2])}`}</div> : "전체 게시물"}
                </div>
                <PostList page={page} baseUrl={baseUrl.join('/')} isSmallCategory={baseUrl.length == 4 ? true : false} />
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
export { postHeadingList, postData, lastPostListPage, userWritingToday, adminPower };