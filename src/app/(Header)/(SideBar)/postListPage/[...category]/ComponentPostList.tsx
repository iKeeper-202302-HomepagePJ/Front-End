"use client"
import { useEffect, useState } from "react";
import { PostListHeading, PostItem } from "../../../../ComponentPostList";
import { postHeadingList, postData, lastPostListPage, userWritingToday, adminPower } from './page';
import { IconStar } from "../../../../svgtest";
import { PageMove } from "../../../../ComponentPageMove";
import { iconPencil } from "../../../../svgtest";
import { useRouter } from 'next/navigation';
import { Modal } from "../../../../ComponentModal";
import { CheckBox, HeadCheckBox } from "../../../../ComponentCheckBox";

interface postDataObject {                     // json으로 받는 객체 타입 정의
    id: number;
    user: string;
    title: string;
    headline: string;
    timestamp: string;
    postComment: number;
    bookmark: boolean
}

export default function PostList({ page, baseUrl, isSmallCategory }: { page: number, baseUrl: string, isSmallCategory : boolean }) {
    const [bookMarkList, setBookMark] = useState<number[]>([]);
    const [checkList, setCheck] = useState(Array(15).fill(0));
    const [openModal, setOpenModal] = useState(false)
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
        const bookMark: number[] = postData.filter((key: { bookmark: boolean; }) => (!key.bookmark)).map((key: postDataObject) => ((key.id)));
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
    console.log(isSmallCategory);
    return (
        <div className="flex-col w-full">
            <div className='w-full h-auto bg-deepBlue rounded-lg p-[20px] mt-[20px]'>
                <div className='flex items-center'>
                    {adminPower && HeadCheckBox('PostListCheckBox', setAllCheckHandle)}
                    <button onClick={() => (allPostBookMarkList())}>{IconStar("w-[20px] h-[20px] mx-[20px]", "deepYellow")}</button>
                    {PostListHeading(isSmallCategory, true, postHeadingList)}
                </div>
                <hr className="h-1 bg-blue border-0 mt-[5px]"></hr>
                {postData.map((key: postDataObject, index: number) => (<div><div className='flex items-center' id={`postListItemComponent${key.id}`}>{PostItem(isSmallCategory, true, key, addPostListComponent, index, key.bookmark)}</div><hr className="h-[3px] bg-blue border-0 mt-[5px]"></hr></div>))}
            </div>
            <div className="w-full h-[30px] flex justify-between mt-[20px]"><div></div>{PageMove(page, lastPostListPage, `/postListPage/${baseUrl}`)}
                <div className="flex h-[30px] justify-self-end">
                    {adminPower &&
                        <div>
                            <button className="w-[30px] h-[30px]"><img src="/IconMove.svg" /></button>
                            <button className="w-[30px] h-[30px] ml-[10px]"><img src="/IconDelete.svg" /></button>
                        </div>}
                    <button className="w-[30px] h-[30px] rounded-lg bg-green ml-[10px]" onClick={() => { userWritingToday >= 3 ? setOpenModal(true) : route.push("/") }}>
                        {iconPencil("w-[30px] h-[30px] fill-none mt-[6px] ml-[6px]", "deepBlue")}
                    </button>
                </div>
            </div>
            {openModal && Modal("w-fit h-fit", canNotWriting, setOpenModal)}
        </div>
    )
}