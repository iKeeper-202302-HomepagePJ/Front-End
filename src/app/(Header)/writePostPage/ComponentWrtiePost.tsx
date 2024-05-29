"use client"

import dynamic from 'next/dynamic'
import { useState, useRef, useEffect } from 'react'
import { category, categoryList, headline, headlineList } from './page'
import { toggleItemBox, toggleIdItemBox } from '../../ComponentToggle'
import { TextEditor } from '../../ComponentTextEditor'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import axios from 'axios'
export default function WritePost() {
    const [disclosure, setdisclosure] = useState(false);
    const [commentWhether, setCommentWhether] = useState(true);
    const [showToggle, setShowToggle] = useState("")
    const [openModal, setOpenModal] = useState("")
    const [selectLargeCategory, setLargeCategory] = useState(1)
    const [selectSmallCategory, setSmallCategory] = useState(1)
    const [selectHeadline, setHeadline] = useState(1)
    const [title, setTitle] = useState("")
    const [titleLength, setTitleLength] = useState(0)
    //const [post, setPost] = useState("")
    const [postLength, setPostLength] = useState(0)
    const textRef = useRef<HTMLTextAreaElement | null>(null)

    const userToken = useSelector((state: RootState) => state.user.token);
    /*const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image', 'video'],
            ['clean'],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    }
    /*
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     
    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
    ]
        return  <QuillNoSSRWrapper
        modules={modules}
        formats={formats}
        theme='snow'
        value={Content}
        onChange={setContent}
        ref={quillRef}
        style={{
          height: '460px',
          width: '100%',
        }}
   />/*/

    /*
    
             <div className='bg-deepBlue rounded-lg w-full h-auto p-[50px] font-bold text-[20px]'>
                 <button className='h-[50px] w-full relative bg-black rounded-lg' onClick={() => setShowToggle("categoryToggle")}>{showToggle=="categoryToggle" && toggleItemBox(categoryList, selectCategory, setCategory)}{selectCategory}<img src='/IconToggle.svg'></img></button>
             </div>
    */
    const [largeCategoryList, setLargeCategoryList] = useState<any[]>([]);
    const [smallCategoryList, setSmallCategoryList] = useState<any[]>([]);
    const [headlineList, setHeadlineList] = useState<any[]>([]);
    const [post, setPost] = useState("");
    const getToggleData = async () => {
        try {
            const respon = await axios.get('http://3.35.239.36:8080/api/posts/categorylarge').then(res => {
                console.log('대분류 카테고리 목록 호출 성공:', res.data.data);
                setLargeCategoryList(res.data.data)
            })
        } catch (error) {
            console.error('대분류 카테고리 목록 호출 실패:', error);
        }
        try {
            const respon = await axios.get('http://3.35.239.36:8080/api/posts/categorysmall').then(res => {
                console.log('소분류 카테고리 목록 성공:', res.data.data);
                setSmallCategoryList(res.data.data)
            })
        } catch (error) {
            console.error('소분류 카테고리 목록 호출 실패:', error);
        }
        try {
            const respon = await axios.get('http://3.35.239.36:8080/api/posts/headline').then(res => {
                console.log('헤드라인 목록 성공:', res.data.data);
                setHeadlineList(res.data.data)
            })
        } catch (error) {
            console.error('헤드라인 목록 호출 실패:', error);
        }
    }
    useEffect(() => {
        getToggleData()
    }, []);
    const transferPost = async() => {
        
    }
    const savePost = async (post: string) => {
        setPost(post);
        const uploadPostData = {
            category: {
                categoryLarge: {
                    id: selectLargeCategory
                },
                categorySmall: {
                    id: selectSmallCategory
                }
            },
            commentWhether: commentWhether,
            cotent: post,
            disclosure: disclosure,
            headline: {
                id: 1
            },
            title: title
        }
        console.log(uploadPostData)
        console.log(typeof post)
        try {
            // 서버로 로그인 요청 보내기
            console.log(userToken);
            const response = await axios.post('http://3.35.239.36:8080/api/posts', uploadPostData, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }).then(res => {
                console.log("게시물 등록 완료")
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
                    <div className='w-full flex'>
                        <button className='relative w-[350px] grow h-[50px] bg-black rounded-lg text-[20px] bold flex items-center justify-between px-[10px]' onClick={() => setShowToggle("category")}>
                            <div className='w-full truncate text-left'>{(smallCategoryList.find(obj => obj.id === selectSmallCategory)!.name)}</div>
                            <img src='/IconToggle.svg' />{showToggle == "category" && toggleIdItemBox(smallCategoryList, selectSmallCategory, setSmallCategory, setShowToggle, 'h-[50px] text-[20px] font-bold')}
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