"use client"
import { useEffect, useState } from "react";
import { PostListHeading, PostItem } from "../../../ComponentPostList";
import { IconStar } from "../../../SvgIcons";
import { PageMove } from "../../../ComponentPageMove";
import { iconPencil } from "../../../SvgIcons";
import { useRouter } from 'next/navigation';
import { Modal } from "../../../ComponentModal";
import { CheckBox, HeadCheckBox } from "../../../ComponentCheckBox";
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store';

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
    bookmark:boolean
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
export default function PostList({ page, baseUrl, postListData }: { page: {lastPostListPage:number, page:number}, baseUrl: string, postListData : postObject[] }) {
    const [bookMarkList, setBookMark] = useState<number[]>([]);
    const [checkList, setCheck] = useState(Array(15).fill(0));
    const [openModal, setOpenModal] = useState(false)
    const adminPower = useSelector((state: RootState) => state.user.token)=="USER_ADMIN" ? true : false;
    const route = useRouter();
    const setBookMarkHandle = (id: number) => {
        if (bookMarkList.includes(id)) {
            const bookMark = bookMarkList.filter((e: number) => (e != id));
            setBookMark(bookMark);
        }
        else {
            const bookMark = [...bookMarkList, id];
            setBookMark(bookMark);
        }
        
    }
    const allPostBookMarkList = () => {
        const bookMark: number[] = postListData.filter((key: { bookmark: boolean; }) => (!key.bookmark)).map((key) => ((key.id)));
        setBookMark(bookMark);
    }
    const canNotWriting = () => {
        return (
            <div className="w-[500px] h-[200px] flex items-center justify-center text-center">
                <div className="flex-col"><p>1일 작성 가능한 게시물 횟수를 초과하였습니다.</p>
                    <p>(하루 최대 3회 작성 가능)</p></div>
            </div>
        )
    }
    const setCheckHandle = (id: number) => {
        const check = checkList.with(id, !checkList[id]);
        setCheck(check);
    }
    const setAllCheckHandle = () => {
        const check = Array(15).fill(true)
        setCheck(check);
    }
    const bookMarkButton = (id: number, bookmark: boolean) => {
        return (<button onClick={() => (setBookMarkHandle(id))}>{IconStar("w-[20px] h-[20px] mx-[20px]", `${bookmark ? bookMarkList.includes(id) ? "deepYellow" : "yellow" : bookMarkList.includes(id) ? "yellow" : "deepYellow"}`)}</button>)
    }
    const addPostListComponent = (id: number, index: number, bookmark: boolean) => {
        return (
            <div className="flex items-center">
                {adminPower && CheckBox(index, 'postListCheckBox', setCheckHandle, checkList[index])}
                {bookMarkButton(id, bookmark)}
            </div>
        )
    }
    return (
        <div className="flex-col w-full">
            {page.lastPostListPage == 0 ? <div className="w-full h-[50px] bg-deepBlue content-center">게시글이 존재하지 않습니다.</div>:<div><div className='w-full h-auto bg-deepBlue rounded-lg p-[20px] mt-[20px]'>
                <div className='flex items-center'>
                    {adminPower && HeadCheckBox('PostListCheckBox', setAllCheckHandle)}
                    <button onClick={() => (allPostBookMarkList())}>{IconStar("w-[20px] h-[20px] mx-[20px]", "deepYellow")}</button>
                    {PostListHeading(true, true)}
                </div>
                <hr className="h-1 bg-blue border-0 mt-[5px]"></hr>
                <div className="flex flex-col-reverse">
                {postListData.map((key: postObject, index: number) => (<div><a href={`http://localhost:3000/postPage/${key.id}`} className='flex items-center' id={`postListItemComponent${key.id}`}>{PostItem(true, true, key, addPostListComponent, index, false)}</a><hr className="h-[3px] bg-blue border-0 mt-[5px]"></hr></div>))}
                </div>
            </div>
            {openModal && Modal("w-fit h-fit", canNotWriting, setOpenModal)}</div>}
            <div className="w-full h-[30px] flex justify-between mt-[20px]"><div></div>{/*PageMove(page.page, page.lastPostListPage, `/postListPage/${baseUrl}`)*/}
                <div className="flex h-[30px] justify-self-end">
                    {adminPower &&
                        <div>
                            <button className="w-[30px] h-[30px]"><img src="/IconMove.svg" /></button>
                            <button className="w-[30px] h-[30px] ml-[10px]"><img src="/IconDelete.svg" /></button>
                        </div>}
                    {/*<button className="w-[30px] h-[30px] rounded-lg bg-green ml-[10px]" onClick={() => { route.push("http://localhost:3000/writePostPage") }}>
                        {/*iconPencil("w-[30px] h-[30px] fill-none mt-[6px] ml-[6px]", "deepBlue")}
                    </button>*/}
                </div>
            </div>
            
        </div>
    )
}