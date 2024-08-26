"use client"

import PathMovement from "@/app/ComponentPathMovement"
import { IconCheck, iconPencil } from "@/app/SvgIcons";
import axios from "axios";
import { useState, useEffect } from "react";
interface smallCategoryDataObject {
    id: number;
    name: string;
    parent: number;
}
interface categoryDataObject {
    id: number;
    name: string;
    categories: smallCategoryDataObject[];
}
export default function CategoryList() {
    const [categoryData, setCategoryData] = useState<categoryDataObject[]>([]);
    const [showAdd, setShowAdd] = useState<number>(0);
    const [showModify, setShowModify] = useState<number>(0);
    const [categoryName, setCategoryName] = useState<string>("")
    const [categoryNameLength, setCategoryNameLength] = useState<number>(0)
    const getCategoryList = async () => {
        try {
          const response = (await axios.get('http://3.35.239.36:8080/api/posts/category')).data.data;
          console.log('응답 데이터:', response);
          setCategoryData(response);
        } catch (error) {
          console.error('Failed to fetch dropdown options:', error);
        }
    };
    const postCategory = async (parentId : number) => {
        try {
          const response = await axios.post(`http://3.35.239.36:8080/api/posts/category`, {name:categoryName, parent : parentId}).then(res => {
              console.log('카테고리 추가 성공', res.data);
              getCategoryList();
              setShowAdd(0)
            })
          } catch (error) {
            console.error('카테고리 추가 실패:', error);
          }
        
    };
    const deleteCategory = async (id:number) => {
        try {
          const response = await axios.delete(`http://3.35.239.36:8080/api/posts/category/${id}`,).then(res => {
              console.log('카테고리 삭제 성공', res.data);
              getCategoryList(); 
            })
          } catch (error) {
            console.error('카테고리 삭제 실패:', error);
          }
        
    };
    useEffect(() => {
        getCategoryList();
    }, []);
    return (
        <div className="w-full h-auto">
            <div className="flex text-[20px] text-pink font-bold items-center w-full h-[30px] mb-[20px]">
                <img src="/IconFile.svg" className="mr-[5px]" /><a className='mr-[5px]' href='/admin'>관리자페이지</a> {` >`} <a className='mr-[5px]' href='/admin/categoryPage'>카테고리 관리</a>
            </div>
            <div className="w-full h-auto bg-deepBlue px-[30px] py-[20px] rounded-lg">
                {categoryData.length && categoryData.map((key: categoryDataObject) => (
                    <div key={key.id} className={`w-full mb-[10px] font-semibold text-[16px]`}>
                        <div className="rounded-lg px-[20px] w-full h-[50px] bg-blue flex items-center text-pink">
                            {key.name}
                        </div>
                        {Boolean(key.categories.length) && key.categories.map((subKey: smallCategoryDataObject) => (
                            <div key={subKey.id} className="relative rounded-lg px-[20px] ml-[70px] w-[calc(100%-70px)] text-green h-[50px] bg-blue mt-[10px] flex items-center justify-between">{subKey.name}
                                <div className="h-[30px]">
                                    <button className="h-[30px] mr-[5px]" onClick={() => { setShowModify(subKey.id); setShowAdd(0); setCategoryName(subKey.name); setCategoryNameLength(subKey.name.length) }}><img className="h-full" src="/BTNRewrite.svg" /></button>
                                    <button className="h-[28px]" onClick={() => deleteCategory(subKey.id)}><img className="h-full" src="/BTNDelete.svg" /></button>
                                </div>
                                {showModify == subKey.id && <div className="absolute rounded-lg px-[20px] w-full text-green h-[50px] bg-blue flex items-center left-0">
                                    <textarea key={`${subKey.id}ModiName`} value={categoryName} className="bg-blue resize-none w-[calc(100%-110px)]" rows={1} maxLength={20} onChange={(e) => { setCategoryName(e.target.value); setCategoryNameLength(e.target.textLength) }} />
                                    {`${categoryNameLength} / 20`}
                                    <div className="w-[20px]" />
                                    {IconCheck("w-[15px]", "green")}
                                </div>}
                            </div>
                        ))}
                        {showAdd == key.id &&
                            <div key={`${key.id}New`} className="rounded-lg px-[20px] ml-[70px] w-[calc(100%-70px)] text-green h-[50px] bg-blue mt-[10px] flex items-center">
                                <textarea key={`${key.id}Name`} value={categoryName} className="bg-blue resize-none w-[calc(100%-100px)]" rows={1} maxLength={20} onChange={(e) => { setCategoryName(e.target.value); setCategoryNameLength(e.target.textLength) }} />
                                {`${categoryNameLength} / 20`}
                                <div className="w-[20px]" />
                                <button className="flex items-center w-auto" onClick={() => postCategory(key.id)}>{iconPencil("w-[20px]", "green")}</button>
                            </div>
                        }
                        <button key={`${key.id}Add`} className="rounded-lg px-[20px] ml-[70px] w-[calc(100%-70px)] text-green h-[50px] bg-blue mt-[10px] flex items-center opacity-50"
                            onClick={() => { setShowAdd(key.id); setCategoryName(""); setCategoryNameLength(0); setShowModify(0); }}>+ 카테고리 추가
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}/*setAdminData([
    {
        "studentID": "22113455",
        "name": "신세미",
        "field": {
            id:3,
            name:"CERT"
        },
        major:{
            id:2,
            name:"사이버보안전공"
        },
        grade:{
            id:2,
            name:"2학년 2학차"
        },
    },
    {
        "studentID": "22113455",
        "name": "신세미",
        "field": {
            id:2,
            name:"개발"
        },
        major:{
            id:2,
            name:"컴퓨터공학전공"
        },
        grade:{
            id:2,
            name:"2학년 2학차"
        },
    }
])*/