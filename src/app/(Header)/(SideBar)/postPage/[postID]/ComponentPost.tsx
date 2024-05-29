"use client"
import { useRef, useState } from "react";
import { commnetData, postData } from "./page"
import { iconPencil } from "@/app/svgtest"
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from '../../../../redux/store';
const TextAreaComponent = () => {
    const [text, setText] = useState('');
    const [height, setHeight] = useState('auto'); // 초기 높이를 'auto'로 설정

    const handleTextChange = (string: string) => {
        setText(string); // 입력된 문자열 업데이트
        setHeight('auto'); // 높이를 다시 'auto'로 설정하여 컨텐츠에 맞게 조절
    };
    console.log(text);
    return (
        <textarea
            value={text}
            onChange={(e) => { handleTextChange(e.target.value) }}
            className="w-64 h-[height] resize-none overflow-hidden text-black"
            style={{ height }}
        />
    );
};
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
export default function Post({postData}:{postData:postDataObject}) {
    const [comment, setComment] = useState("");
    const [commentLength, setCommentLength] = useState(0);
    const textRef = useRef<HTMLTextAreaElement | null>(null)
    const userToken = useSelector((state: RootState) => state.user.token);
    const uploadComment = async() =>{
        console.log(postData.id, comment);
        try {
            const response = await axios.post(`http://3.35.239.36:8080/api/posts/comment`, {post:postData.id, content:comment}, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }).then(res => {
                console.log("댓글 업로드 성공", res.data.data);
            });
        } catch (error) {
            console.error('댓글 업로드 실패', error);
            throw error;
        }

    }
    return (
        <div className="w-auto h-auto flex flex-col">
            <div className="bg-deepBlue w-full h-auto rounded-lg flex-col p-[30px] font-bold">
                <a className="text-green text-[16px]">{`${postData.category.categoryLarge.name} > ${postData.category.categorySmall.name}`}</a>
                <div className="text-white text-[20px] flex inline">
                    {`[${postData.headline.name}] ${postData.title}`}
                </div>
                <div className="mt-[10px] flex justify-between">
                    <div>
                        <p className="text-pink text-[16px]">{postData.postUser}</p>
                        <div className="text-[14px] flex text-gray-400 font-semibold">
                            {`${postData.postTime.slice(0, 4)}.${postData.postTime.slice(5, 7)}.${postData.postTime.slice(8, 10)} ${postData.postTime.slice(11, 16)}`}
                            {Boolean(postData.comments.length) && <div className="ml-[10px] text-orange flex items-center"><img src="/IconChat.svg" className="w-[20px]" />{postData.comments.length}</div>}
                        </div>
                    </div>
                    <div className="h-[40px] w-auto flex">
                        <button className="mr-[10px] h-[40px] w-[40px]"><img src="/IconRewrite.svg" /></button>
                        <button className="h-[40px] w-[40px]"><img src="/IconDelete.svg" /></button>
                    </div>
                </div>
                <hr className="h-[1px] bg-blue border-0 my-[20px]"></hr>
                {postData.content != null && postData.content}
            </div>
            <div className="relative bg-deepBlue w-full h-auto min-h-[50px] rounded-lg py-[10px] px-[20px] flex items-center mt-[20px]">
                <textarea placeholder="댓글을 입력하세요." rows={1} maxLength={750} ref={textRef} className={`resize-none bg-deepBlue text-white w-full h-auto px min-h-[24px] max-h-[500px] text-[16px] `} onChange={(e) => { setComment(e.target.value); if (textRef.current) { textRef.current.style.height = "0px"; textRef.current.style.height = `${textRef.current.scrollHeight}px` }; setCommentLength(e.target.textLength) }} />
                <div className="text-gray-400 text-[16px] text-center w-[120px] ml-[10px]">{`${commentLength} / 750 자`}</div>
                <div>
                    <button className="w-[40px] h-[40px] rounded-lg bg-green mt-[5px] ml-[10px] flex" onClick={() => uploadComment()}>
                        <img src="/IconWrite.svg"></img>
                    </button>
                </div>
            </div>
            <div className="flex flex-col-reverse">
                {postData.comments.map(((key: any)=>(<div className="rounded-lg bg-deepBlue w-full h-auto min-h-[50px] p-[10px] my-[10px]"><div className="flex"><div className="text-pink text-[16px]">{key.commentUser}</div><div className="ml-[10px] text-[14px] text-gray-400 flex items-end">{`${key.commentTime.slice(0, 4)}.${key.commentTime.slice(5, 7)}.${key.commentTime.slice(8, 10)} ${key.commentTime.slice(11, 16)}`}</div></div><div className="text-[16px]">{key.content}</div></div>)))}
            </div>
            <div className="flex h-[30px] w-full justify-end mt-[20px] text-center">
                <a className="h-full w-[50px] bg-deepBlue text-white text-[16px] font-bold rounded-lg content-center">{`<이전`}</a>
                <a className="h-full w-[50px] ml-[10px] bg-deepBlue text-white text-[16px] font-bold rounded-lg content-center">{`다음>`}</a>
            </div>
        </div>
    )
}