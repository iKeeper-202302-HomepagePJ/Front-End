"use client"
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import pro, { ProfileShortcut } from "./ComponentSideBar";
interface categoryDataObject {
    id : number;
    name : string;
    categories : smallCategoryObject[]
}
interface smallCategoryObject {
    id : number;
    name : string
}
export const getCategoryData = async (setCategoryList:Function, setData?:Function) => {
    try {
        const respon = await api.get('/api/posts/category').then(res => {
            console.log('대분류 카테고리 목록 호출 성공:', res.data.data);
            setCategoryList(res.data.data);
            if(setData) setData(res.data.data);
        })
    } catch (error) {
        console.error('대분류 카테고리 목록 호출 실패:', error);
    }
}

export const CategoryList = () => {
    const [categoryData, setCategoryData] = useState([]);
    useEffect(() => {
        getCategoryData(setCategoryData);
    }, []);
    return(
        <div className="flex-col space-y-[10px]">
            <a href={`/postListPage/1`} className="text-[20px] font-bold text-pink flex items-center mb-[5px]"><img src="/IconFile.svg"/>전체 게시물</a>
            {categoryData.length != 0 && categoryData.map((key:categoryDataObject) => (<div key={key.id} className="flex flex-col">
                <a href={`${key.id == 3 ? `/suggestions`:`/postListPage/${key.name}/${key.id}/1`}`} className="text-[20px] font-bold text-pink flex items-center mb-[5px]"><img src="/IconFile.svg"/>{key.name}</a>
                <div className="flex flex-col px-[10px]">
                    {Boolean(key.categories.length) && key.categories.map((item : {id : number; name : string}) => (<a key={`${item.id}ShorCut`} href={`/postListPage/${key.name}/${key.id}/${item.name}/${item.id}/1`} className="text-[16px] font-semibold text-green flex items-center"><img src="/IconArrow.svg"/>{item.name}</a>))}
                </div>
            </div>))}
        </div>
    )
}


export const GetCategoryListAndSideBar = (setData:Function) => {
    const [categoryData, setCategoryData] = useState([]);
    useEffect(() => {
        getCategoryData(setCategoryData, setData);
    }, [setData]);
    return(
    <div className="w-[317px] flex-none w-min-0 h-auto ml-[50px] mt-[50px]">
        {ProfileShortcut()}
        <div className="w-full h-auto bg-deepBlue rounded-[10px] p-[20px] flex-col space-y-[10px]">
            <a href={`/postListPage/1`} className="text-[20px] font-bold text-pink flex items-center mb-[5px]"><img src="/IconFile.svg"/>전체 게시물</a>
            {categoryData.length != 0 && categoryData.map((key:categoryDataObject) => (<div key={key.id} className="flex flex-col">
                <a href={`/postListPage/${key.name}/${key.id}/1`} className="text-[20px] font-bold text-pink flex items-center mb-[5px]"><img src="/IconFile.svg"/>{key.name}</a>
                <div className="flex flex-col px-[10px]">
                    {Boolean(key.categories.length) && key.categories.map((item : {id : number; name : string}) => (<a key={`${item.id}ShorCut`} href={`/postListPage/${key.name}/${key.id}/${item.name}/${item.id}/1`} className="text-[16px] font-semibold text-green flex items-center"><img src="/IconArrow.svg"/>{item.name}</a>))}
                </div>
            </div>))}
        </div>
    </div>
    )
}

export function FindCategoryName(categoryList: categoryDataObject[], categoryId:string[], setName:Function, setId?:Function) {
    if(categoryList.length){ 
        if (isNaN(Number(categoryId[0])) || Number(categoryId[0])==0){
            let category = categoryList.find(element => element.categories.length);
            setName(category!.categories[0].name);
            if (setId) setId(category!.id);
        }
        else {
            let category = categoryList.find(element => element.categories.some(category => category.id == Number(categoryId[0])));
            if (category){
                for (const smallcateory of category.categories){
                    if (smallcateory.id == Number(categoryId[1])){
                        setName(smallcateory.name)
                        if (setId)setId(smallcateory.id);
                    }
                };
                
            }
            
        }
}
}