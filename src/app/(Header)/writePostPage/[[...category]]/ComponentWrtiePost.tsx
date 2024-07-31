"use client"

import dynamic from 'next/dynamic'
import { useState, useRef, useEffect } from 'react'
import { toggleItemBox, toggleIdItemBox } from '../../../ComponentToggle'
import { getCategoryData } from '../../../ComponentSideBarCategoryList'
import { TextEditor } from '../../../ComponentTextEditor'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store';
import axios from 'axios'
interface categoryDataObject {
    id : number;
    name : string;
    categories : smallCategoryObject[]
}
interface smallCategoryObject {
    id : number;
    name : string
}
export default function WritePost(urlInCategory : {urlInCategory:string[]}) {
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
            const respon = await axios.get('http://3.35.239.36:8080/api/posts/headline').then(res => {
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
        if(categoryList.length){ 
        if (isNaN(Number(urlInCategory.urlInCategory[0])) || Number(urlInCategory.urlInCategory[0])==0){
            let category = categoryList.find(element => element.categories.length);
            console.log("난 카테고리. setShow의 친구가 될 운명이지",categoryList, category)
            setShowSelectCategory(category!.categories[0].name);
            setLargeCategory(category!.id)
        }
        else {
            let category = categoryList.find(element => element.categories.some(category => category.id == Number(urlInCategory.urlInCategory[0])));
            if (category){
                for (const smallcateory of category.categories){
                    if (smallcateory.id == Number(urlInCategory.urlInCategory[1])){
                        setShowSelectCategory(smallcateory.name)
                        setLargeCategory(Number(urlInCategory.urlInCategory[0]));
                        setSmallCategory(smallcateory.id);
                    }
                };
            }
            
        }
    }
    }, [categoryList]);
    const savePost = async (post: string) => {
        setPost(post);
        const formData = new FormData();
    formData.append('files', file);
    formData.append('post', JSON.stringify(post));
        const uploadPostData = {
            post : {
                category: {
                    id: selectSmallCategory
                }
            ,
            commentWhether: commentWhether,
            content: post,
            disclosure: disclosure,
            headline: {
                id: 1
            },
            title: title
            },
            files:null
        }
        if (titleLength == 0) {
            return (<div className='w-full h-[50px] bg-red'> 야 이 이거 나오냐??</div>)
        }
        else {
            try {
                // 서버로 로그인 요청 보내기
                const response = await fetch('http://localhost:8080/api/posts', {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${userToken}`,
                    },
                    body: uploadPostData,
                  }).then(res => {
                    console.log("게시물 등록 완료", res)
                })
            } catch (error) {
                console.error('게시물 등록 실패:', error);
            }
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
                    <div className='w-full flex'>
                        <button className='relative w-[350px] grow h-[50px] bg-black rounded-lg text-[20px] bold flex items-center justify-between px-[10px]' onClick={() => setShowToggle("category")}>
                            <div className='w-full truncate text-left relative'>{showSelectCategory}</div>
                            <img src='/IconToggle.svg' />{showToggle == "category" && categoryList.length != 0 && 
                            <div className='top-[50px] w-full bg-deepBlue rounded-lg text-[14px] absolute'>{
                                categoryList.map((key:categoryDataObject) => (key.categories.length != 0 &&  <div>{
                                    <div className='w-full'>
                                        {key.name}
                                        <div className='text-[20px]'>
                                        {key.categories.map((subKey:any)=>(
                                            <div onClick={() => selectSmallCategory(subKey.id)}>{subKey.name}</div>
                                        ))}
                                        </div>
                                    </div>}</div>
                                ))
                            }</div>}
                        </button>
                        <button className='relative w-[300px] h-[50px] ml-[20px] bg-black rounded-lg text-[20px] bold flex items-center justify-between px-[10px]' onClick={() => setShowToggle("headline")}>
                            <div className='w-full truncate text-left'>{(headlineList.find(obj => obj.id === selectHeadline)!.name)}</div>
                            <img src='/IconToggle.svg' />{showToggle == "headline" && toggleIdItemBox(headlineList, selectHeadline, setHeadline, setShowToggle, 'h-[50px] text-[20px] font-bold')}
                        </button>
                    </div>
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