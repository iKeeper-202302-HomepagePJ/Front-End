"use client"

import { PostItem, PostListHeading } from "@/app/ComponentPostList";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { iconPencil, IconStar } from "@/app/SvgIcons";
import { CheckBox, HeadCheckBox } from "../../../../ComponentCheckBox";
import { PageMove } from "@/app/ComponentPageMove";
import { useRouter } from 'next/navigation';
interface suggestionDataObject {
    id: number;
    user: string;
    title: string;
    postTime: string;
    comments: any[];
    bookmark: boolean
}

export default function Suggestion({ page }: { page: number }) {
    const [suggestions, setSuggestions] = useState<suggestionDataObject[]>([]);
    const [realPage, setPage] = useState(page);
    const [lastPage, setLastPage] = useState(1);
    const [checkList, setCheck] = useState(Array(15).fill(false));
    const userAuth = useSelector((state: RootState) => state.user.auth) === "UER_ADMIN";
    const [bookMarkList, setBookMark] = useState<number[]>([]);
    const route = useRouter();
    const getSuggestionData = useCallback(async () => {
        try {
            const response = await axios.get(`http://3.35.239.36:8080/api/posts/category/2?page=${realPage}`);
            setLastPage(response.data.data.totalPages);
            if (response.data.data.totalPages < realPage) {
                if (response.data.data.totalPages) {
                    setPage(response.data.data.totalPages);
                    getSuggestionData();
                } else {
                    setPage(1);
                    setSuggestions([]);
                }
            } else {
                setSuggestions(response.data.data);
            }
            
            console.log("게시글 정보 불러오기 성공", response.data.data);
        } catch (error) {
            console.error('게시글 정보 실패:', error);
        }
    }, [realPage]);

    useEffect(() => {
        setSuggestions([{id:13, user:"22113455", title:"건의", postTime:"2024-08-11T11:26:24", comments:[1],bookmark:false}])
    }, [getSuggestionData]);

    const setBookMarkHandle = (id: number) => {
        setBookMark(prevBookMarkList => {
            if (prevBookMarkList.includes(id)) {
                return prevBookMarkList.filter((e: number) => e !== id);
            } else {
                return [...prevBookMarkList, id];
            }
        });
    };

    const allPostBookMarkList = () => {
        const bookMark = suggestions.filter(key => !key.bookmark).map(key => key.id);
        setBookMark(bookMark);
    };

    const setCheckHandle = (id: number) => {
        setCheck(prevCheckList => {
            const newCheckList = [...prevCheckList];
            newCheckList[id] = !newCheckList[id];
            return newCheckList;
        });
    };

    const setAllCheckHandle = () => {
        setCheck(Array(15).fill(true));
    };

    const bookMarkButton = (id: number, bookmark: boolean) => {
        return (
            <button onClick={() => setBookMarkHandle(id)}>
                {IconStar("w-[20px] h-[20px] mx-[20px]", bookmark ? bookMarkList.includes(id) ? "deepYellow" : "yellow" : bookMarkList.includes(id) ? "yellow" : "deepYellow")}
            </button>
        );
    };

    const addPostListComponent = (id: number, index: number, bookmark: boolean) => {
        return (
            <div className="flex items-center">
                {userAuth && CheckBox(index, 'postListCheckBox', () => setCheckHandle(index), checkList[index])}
                {bookMarkButton(id, bookmark)}
            </div>
        );
    };

    return (
        <div>
            <div className="mt-[20]">
                {suggestions.length === 0 ? (
                    <div className="w-full h-[100px] bg-deepBlue rounded-lg text-center"><br/>건의글이 존재하지 않습니다.</div>
                ) : (
                    <div>
                        <div className='w-full h-auto bg-deepBlue rounded-lg p-[20px] mt-[20px]'>
                            <div className='flex items-center'>
                                {userAuth && HeadCheckBox('PostListCheckBox', setAllCheckHandle)}
                                <button onClick={allPostBookMarkList}>{IconStar("w-[20px] h-[20px] mx-[20px]", "deepYellow")}</button>
                                {PostListHeading(false, false)}
                            </div>
                            <hr className="h-1 bg-blue border-0 mt-[5px]"></hr>
                            <div className="flex flex-col-reverse">
                                {Boolean(suggestions.length) && suggestions.map((key, index) => (
                                    <div key={key.id}>
                                        <a href={`/suggestion/13`} className='flex items-center' id={`postListItemComponent${key.id}`}>
                                            {PostItem(false, false, key, addPostListComponent, index, false)}
                                        </a>
                                        <hr className="h-[3px] bg-blue border-0 mt-[5px]"></hr>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                <div className="w-full h-[30px] flex justify-between mt-[20px]">
                    <div></div>
                    {PageMove(realPage, lastPage, `/suggestion/${realPage}`)}
                    <div className="flex h-[30px] justify-self-end">
                        {userAuth && (
                            <div>
                                <button className="w-[30px] h-[30px]"><img src="/IconMove.svg" alt="move icon" /></button>
                                <button className="w-[30px] h-[30px] ml-[10px]"><img src="/IconDelete.svg" alt="delete icon" /></button>
                            </div>
                        )}
                        <button className="w-[30px] h-[30px] rounded-lg bg-green ml-[10px] flex items-center" onClick={() => { route.push("/writeSuggestion") }}>
                        {iconPencil("w-[20px] fill-none ml-[6px]", "deepBlue")}
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}