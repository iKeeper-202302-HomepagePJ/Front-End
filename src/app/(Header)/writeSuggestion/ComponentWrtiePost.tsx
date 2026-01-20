"use client"

import dynamic from 'next/dynamic'
import { useState, useRef, useEffect } from 'react'
import { toggleItemBox, toggleIdItemBox } from '../../ComponentToggle'
import { getCategoryData } from '../../ComponentSideBarCategoryList'
import { TextEditor } from '../../ComponentTextEditor'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import FormData from 'form-data';
import { api } from "@/lib/axios";
interface categoryDataObject {
    id: number;
    name: string;
    categories: smallCategoryObject[]
}
interface smallCategoryObject {
    id: number;
    name: string
}
export default function WritePost(urlInCategory: { urlInCategory: string[] }) {
    const [disclosure, setdisclosure] = useState(false);
    const [commentWhether, setCommentWhether] = useState(true);
    const [showToggle, setShowToggle] = useState("")
    const [openModal, setOpenModal] = useState("")
    const [selectLargeCategory, setLargeCategory] = useState(1)
    const [selectSmallCategory, setSmallCategory] = useState(1)
    const [showSelectCategory, setShowSelectCategory] = useState("")
    const [selectHeadline, setHeadline] = useState(1)
    const [title, setTitle] = useState("")
    const [titleLength, setTitleLength] = useState(0)
    const [file, setFile] = useState(null);
    //const [post, setPost] = useState("")
    const [postLength, setPostLength] = useState(0)
    const textRef = useRef<HTMLTextAreaElement | null>(null)

    const userToken = useSelector((state: RootState) => state.user.token);
    const [categoryList, setCategoryList] = useState<categoryDataObject[]>([]);
    const [headlineList, setHeadlineList] = useState<any[]>([]);
    const [post, setPost] = useState("");
    const getToggleData = async () => {
        try {
            const respon = await api.get('/api/posts/headline').then(res => {
                console.log('헤드라인 목록 성공:', res.data.data);
                setHeadlineList(res.data.data)
            })
        } catch (error) {
            console.error('헤드라인 목록 호출 실패:', error);
        }
        await getCategoryData(setCategoryList);

    }
    useEffect(() => {
        getToggleData();
    }, []);
    useEffect(() => {
        if (categoryList.length) {
            if (isNaN(Number(urlInCategory.urlInCategory[0])) || Number(urlInCategory.urlInCategory[0]) == 0) {
                let category = categoryList.find(element => element.categories.length);
                console.log("난 카테고리. setShow의 친구가 될 운명이지", categoryList, category)
                setShowSelectCategory(category!.categories[0].name);
                setLargeCategory(category!.id)
            }
            else {
                let category = categoryList.find(element => element.categories.some(category => category.id == Number(urlInCategory.urlInCategory[0])));
                if (category) {
                    for (const smallcateory of category.categories) {
                        if (smallcateory.id == Number(urlInCategory.urlInCategory[1])) {
                            setShowSelectCategory(smallcateory.name)
                            setLargeCategory(Number(urlInCategory.urlInCategory[0]));
                            setSmallCategory(smallcateory.id);
                        }
                    };
                }

            }
        }
    }, [categoryList, urlInCategory.urlInCategory]);
    const savePost = async (post: string) => {
        try {
            // 서버로 로그인 요청 보내기
            
            const uploadPostData = {
                post: {
                    category: {
                        id: 1
                    }
                    ,
                    commentWhether: commentWhether,
                    content: post,
                    disclosure: disclosure,
                    headline: {
                        id: 1
                    },
                    title: title
                }
            }
            const formData = new FormData();
            formData.append('files', new File([new Blob([], { type: 'application/octet-stream' })], 'empty.txt', { type: 'text/plain' }));
            formData.append('post', JSON.stringify(uploadPostData));
            const response = await api.post(`/api/posts`, 
            formData
            ,
                {
                    headers:
                    {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${userToken}`
                    }
                }).then(res => {
                    console.log("게시물 등록 완료", res)
                })
        } catch (error) {
            console.error('게시물 등록 실패:', error);
        }
    }
    const textEditor =
        <div className='w-full h-fit flex '>
            {TextEditor(savePost)}
        </div>
    if (!headlineList[0]) return null;
    return (
        <div className='flex'>
            <div className='grow w-full justify-end'>
                <div className='bg-deepBlue rounded-lg w-full grow p-[30px] space-y-[20px]'>
                    <div className="w-full h-[50px] bg-black text-white text-[20px] rounded-lg py-[10px] px-[10px] flex items-center">
                        <textarea placeholder="제목을 입력하세요." rows={1} maxLength={500} className={`w-full h-full bg-black resize-e text-white w-full`} onChange={(e) => { setTitle(e.target.value); setTitleLength(e.target.textLength) }} />
                        <div className="w-auto whitespace-pre text-gray-400 text-[16px]">{`${titleLength} / 100 자`}</div>
                    </div>
                    {textEditor}
                </div>

            </div>
            <div className='bg-deepBlue rounded-lg w-[300px] h-auto ml-[50px] p-[20px]'>
                <div className='flex content-center rounded-lg bg-black p-[7px] w-auto h-auto' >
                    <input id={`disclosureSetting`} type="checkbox" value="" checked={disclosure} className="w-[20px] h-[20px] rounded mr-[10px]" onClick={() => { (setdisclosure(!disclosure)) }}></input>
                    비공개
                </div>
                <div className='flex content-center rounded-lg mt-[20px] bg-black p-[7px] w-auto h-auto' >
                    <input id={`disclosureSetting`} type="checkbox" value="" checked={commentWhether} className="w-[20px] h-[20px] rounded mr-[10px]" onClick={() => { (setCommentWhether(!commentWhether)) }}></input>
                    댓글 비허용
                </div>
            </div>
        </div>
    )
}