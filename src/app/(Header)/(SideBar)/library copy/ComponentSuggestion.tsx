"use client"

import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store';
interface bookObject {
    name: string;
}
export default function BookList() {
    const [bookList, setBookList] = useState([]);
    const [addBook, setAddBook] = useState(false);
    const [bookName, setBookName] = useState("");
    const [bookNameLength, setBookNameLength] = useState(0);
    const userToken = useSelector((state: RootState) => state.user.token);
    const getSuggestionData = async () => {
        try {
            const response = (await axios.get('http://3.35.239.36:8080/api/books')).data.data;
            console.log('응답 데이터:', response);
            setBookList(response);
        } catch (error) {
            console.error('도서관 목록이 안 불러와진다:', error);
        }
    };
    
    useEffect(() => {
        getSuggestionData();
    }, []);
    return (
        <div>
            <div className="flex w-full h-[50px]">
                i-Keeper 동아리방 도서 리스트
                <button className="w-[30px] h-[30px] rounded-lg font-bold place-content-center bg-green text-black text-[20px]" onClick={() => setAddBook(true)}>+</button>
            </div>
            <div className="bg-deepBlue min-w-[500px] w-full h-auto p-[20px] rounded-lg">
                {bookList.length ? bookList.map((key: bookObject) => (<div>{key.name}</div>)) : '책이 존재하지 않습니다.'}
                {addBook &&
                    <div>
                        <div className="fixed w-screen h-screen bg-black left-0 top-0 opacity-50" onClick={() => setAddBook(false)} />
                        <div className="opacity-100 w-[500px] h-[700px] bg-deepBlue rounded-lg text-white text-[16px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 text-center place-content-center p-[20px]">
                            <button className="text-[50px] font-thin w-[30px] h-[30px]" onClick={() => setAddBook(false)}>×</button>
                            <div className="flex">
                                책 제목 : 
                            <div>
                                <textarea value={bookName} rows={1} maxLength={30} className={`outline-0 resize-none bg-deepBlue text-white w-full h-auto px min-h-[24px] max-h-[500px] text-[16px] `} onChange={(e) => { setBookName(e.target.value); setBookNameLength(e.target.textLength) }} />
                                <div className="bg-blue w-full h-[1px]" />
                            </div>
                            </div>
                            <div className="bg-green" onClick={() => uploadNewBook()}>추가</div>
                        </div>
                    </div>}
            </div>
        </div>
    )
}