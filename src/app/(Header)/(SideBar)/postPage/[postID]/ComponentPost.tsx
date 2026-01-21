"use client"
import { useRef, useState, useEffect } from "react";
import { iconPencil } from "@/app/SvgIcons"
import { api } from "@/lib/axios";
import { useSelector } from "react-redux";
import { RootState } from '../../../../redux/store';
import { EditorProvider, useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useRouter } from 'next/navigation';
import { postHeadingList } from "../../noticeListPage/[...page]/page";

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
interface commentObject { // TODO: /post 조회 후 comments에 id 있는지 확인
    id: number;
    post: number;
    commentStudentId: string;
    commentUser: string;
    content: string;
    commentTime: string;
}
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
    comments: commentObject[];
    commentWhether:boolean;
    disclosure:boolean;
    fix:boolean;
    postStudentId:string;
    updateCheck:boolean;
    content:any;
}
export default function Post({post}:{post:postDataObject}) {
    const [comment, setComment] = useState("");
    const [commentLength, setCommentLength] = useState(0);
    const textRef = useRef<HTMLTextAreaElement | null>(null)
    const router = useRouter();
    const [postData, setPostData] = useState<postDataObject>(post);
    const userToken = useSelector((state: RootState) => state.user.token);
    const getPostData = async () => {
        
    }
    const uploadComment = async() =>{
        console.log(postData.id, comment);
        try {
            const response = await api.post(`/api/posts/comment`, {post:postData.id, content:comment}, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }).then(res => {
                console.log("댓글 업로드 성공", res.data.data);
                setComment("");
                try {
                    const response = api.get(`/api/posts/${postData.id}`, {
                        headers: {
                            Authorization: `Bearer ${userToken}`
                        }
                    }).then(res => {
                        setPostData(res.data.data);
                        console.log("게시글 정보 불러오기 성공", res.data.data);
                    });
                } catch (error) {
                    console.error('게시글 정보 실패:', error);
                    throw error;
                }
            });
        } catch (error) {
            console.error('댓글 업로드 실패', error);
            throw error;
        }

    }
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: {
            type:'doc',
            content:post.content
        }
        
    })
    const extensions = [
        StarterKit.configure({
            bulletList: {
                keepMarks: true,
                keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
            },
            orderedList: {
                keepMarks: true,
                keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
            },
        }),
    ]
    /*if (editor){
        const htmlContent = editor.getHTML();
        if (htmlContent)document.querySelector('#output').innerHTML = htmlContent;
    } */ 
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
                {editor != null && <EditorContent editor={editor}/>}

            </div>
            <div className="relative bg-deepBlue w-full h-auto min-h-[50px] rounded-lg py-[10px] px-[20px] flex items-center mt-[20px]">
                <textarea placeholder="댓글을 입력하세요." value={comment} rows={1} maxLength={750} ref={textRef} className={`resize-none bg-deepBlue text-white w-full h-auto px min-h-[24px] max-h-[500px] text-[16px] `} onChange={(e) => { setComment(e.target.value); if (textRef.current) { textRef.current.style.height = "0px"; textRef.current.style.height = `${textRef.current.scrollHeight}px` }; setCommentLength(e.target.textLength) }} />
                <div className="text-gray-400 text-[16px] text-center w-[120px] ml-[10px]">{`${commentLength} / 750 자`}</div>
                <div>
                    <button className="w-[40px] h-[40px] rounded-lg bg-green mt-[5px] ml-[10px] flex" onClick={() => {uploadComment(); getPostData(); setCommentLength(0); if (textRef.current) { textRef.current.style.height = "0px"; textRef.current.style.height = `${textRef.current.scrollHeight}px` }}}>
                        <img src="/IconWrite.svg"></img>
                    </button>
                </div>
            </div>
            <div className="flex flex-col-reverse">
                {postData.comments.map(((comment: commentObject)=>(<div key={comment.id} className="rounded-lg bg-deepBlue w-full h-auto min-h-[50px] p-[10px] my-[10px]"><div className="flex"><div className="text-pink text-[16px]">{comment.commentUser}</div><div className="ml-[10px] text-[14px] text-gray-400 flex items-end">{`${comment.commentTime.slice(0, 4)}.${comment.commentTime.slice(5, 7)}.${comment.commentTime.slice(8, 10)} ${comment.commentTime.slice(11, 16)}`}</div></div><div className="text-[16px]">{comment.content}</div></div>)))}
            </div>
            <div className="flex h-[30px] w-full justify-end mt-[20px] text-center">
                <a className="h-full w-[50px] bg-deepBlue text-white text-[16px] font-bold rounded-lg content-center">{`<이전`}</a>
                <a className="h-full w-[50px] ml-[10px] bg-deepBlue text-white text-[16px] font-bold rounded-lg content-center">{`다음>`}</a>
            </div>
        </div>
    )
}