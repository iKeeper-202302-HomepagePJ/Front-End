"use client"

import { api } from "@/lib/axios";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store';
import { IconBook } from "@/app/SvgIcons";
interface bookObject {
    borrower
    :
    string | null,
    id
    :
    number,
    name
    :
    string,
    rental
    :
    boolean,
    rentalDay
    :
    string | null
}
export default function BookList() {
    const [bookList, setBookList] = useState([]);
    const [addBook, setAddBook] = useState(false);
    const [bookName, setBookName] = useState("");
    const [bookNameLength, setBookNameLength] = useState(0);
    const [modifyBookName, setModifyBookName] = useState("")
    const [modifyBorrower, setModifyBorrower] = useState("")
    const [modifyRentalDay, setModifyRentalDay] = useState("")
    const [modify, setModify] = useState<null | bookObject>(null)
    const userToken = useSelector((state: RootState) => state.user.token);
    const getBookListData = async () => {
        try {
            const response = (await api.get('/api/books')).data.data;
            console.log('응답 데이터:', response);
            setBookList(response);
        } catch (error) {
            console.error('도서관 목록이 안 불러와진다:', error);
        }
    };
    const uploadNewBook = async () => {
        console.log({
            name: bookName
        })
        try {
            // 서버로 로그인 요청 보내기
            const response = await api.post('/api/books', {
                name: bookName

            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }).then(res => {
                console.log('도서 추가 정보 전송 완료 :', res);
            })
        } catch (error) {
            console.error('도서 추가 정보 전송 실패:', error);
        }
    };
    const modifyBook = async (book:bookObject) => {
        try {
            const response = await api.patch(`/api/books/${book.id}`, {
                name:book.name,
                borrower : modifyBorrower,
                retalDay : modifyRentalDay,
                rental : !(book.rental)
            },
            { headers: 
              { 
                Authorization: `Bearer ${userToken}`
              }
            }).then(res => {
              console.log('캘린더 수정 성공', res.data);
              window.close();  
            }) 
          } catch (error) {
            console.error('캘린더 수정 실패:', error);
          }
    }
    useEffect(() => {
        //getBookListData();
    }, []);
    return (
        <div className="w-full">
            <div className="flex w-full h-[50px] text-[20px] font-semibold">
                i-Keeper 동아리방 도서 리스트
                <button className="w-[30px] h-[30px] rounded-lg font-bold place-content-center bg-green text-black text-[20px]" onClick={() => setAddBook(true)}>+</button>
            </div>
            <div className="bg-deepBlue min-w-[500px] w-full h-auto p-[20px] rounded-lg">
                <div className="flex items-ceter text-orange text-[16px] font-bold space-x-[15px]">
                <div className="min-w-[200px] w-full text-ceter mb-[10px] text-center">내용</div>
                <div className="w-[200px] text-ceter mb-[10px] text-center">날짜</div>
                <div className="w-[150px] text-ceter mb-[10px] text-center">지출</div>
                <div className="w-[150px] text-ceter mb-[10px] text-center">수입</div>
                <div className="w-[150px] text-ceter mb-[10px] text-center">총액</div>
                <div className="w-[200px] text-ceter mb-[10px] text-center">증빙자료</div>
                </div>
                <div className="h-1 w-full bg-blue"/>
                {bookList.length ? bookList.map((key: bookObject) => (<div className="my-[10px]"><div className="flex items-ceter my-[5px] space-x-[15px]">
                    <div className="min-w-[400px] w-full">{key.name}</div>
                    <button className="w-[200px] flex justify-center" onClick={()=>setModify(key)}>{IconBook('w-[20px] h-[20px]', `${key.rental ? `green` : `blue`}`)}</button>
                    <div className="w-[150px] justify-center">{Boolean(key.borrower) && key.borrower}</div>
                    <div className="w-[200px] justify-center">{Boolean(key.rentalDay) && key.rentalDay}</div></div><div className="w-full h-[2px] bg-blue"/></div>)) : '책이 존재하지 않습니다.'}
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
                            <div className="rounded-lg mt-[20px] w-[100px] bg-green text-black" onClick={() => uploadNewBook()}>추가</div>
                        </div>
                    </div>}
                    {Boolean(modify) && <div>
                        <div className="fixed w-screen h-screen bg-black left-0 top-0 opacity-50" onClick={() => setModify(null)} />
                        <div className="opacity-100 w-[500px] h-[700px] bg-deepBlue rounded-lg text-white text-[16px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 text-center place-content-center p-[20px]">
                            <button className="text-[50px] font-thin w-[30px] h-[30px]" onClick={() => setAddBook(false)}>×</button>
                            <div className="flex">
                                책 제목 : {modify.name}
                            </div>
                            <div className="flex">
                                대여자 :
                                <div>
                                    <textarea value={modifyBorrower} rows={1} maxLength={30} className={`outline-0 resize-none bg-deepBlue text-white w-full h-auto px min-h-[24px] max-h-[500px] text-[16px] `} onChange={(e) => { setBookName(e.target.value); setBookNameLength(e.target.textLength) }} />
                                    <div className="bg-blue w-full h-[1px]" />
                                </div>
                            </div>
                            <div className="flex">
                                대여 날짜 :
                                <div>
                                    <textarea value={modifyRentalDay} rows={1} maxLength={30} className={`outline-0 resize-none bg-deepBlue text-white w-full h-auto px min-h-[24px] max-h-[500px] text-[16px] `} onChange={(e) => { setBookName(e.target.value); setBookNameLength(e.target.textLength) }} />
                                    <div className="bg-blue w-full h-[1px]" />
                                </div>
                            </div>
                            <div className="rounded-lg mt-[20px] w-[100px] bg-green text-black" onClick={() => {modify && modifyBook(modify)}}>대여</div>
                        </div>
                    </div>
                    }
            </div>
        </div>
    )
}