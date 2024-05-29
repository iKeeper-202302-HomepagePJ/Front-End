"use client"
import { CategoryList } from "./ComponentSideBarCategoryList"
import LoginPage from "./login"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from './redux/store';
import { clearToken } from "./redux/userSlice";
import { useRouter } from 'next/navigation';
import axios from "axios";
import ProfileInformation from "./ComponentProfile";
import { useEffect, useState } from "react";
const user = {
    id: "22113455",
    name: "신세미",
    field: {
        id: 3,
        name: "dev"
    }
}
function ProfileShortcut() {
    //const isLogin = false ///******************로그인 상태확인 임시 수정**************************///
    const isLogin = useSelector((state: RootState) => state.user.isLogining);
    const userToken = useSelector((state:RootState) => state.user.token);
    const [userInfo, setUserInfo] = useState<any>({});
    const router = useRouter();
    const dispatch = useDispatch()
    const Login = () => {
        return (
            <LoginPage />
        )
    }
    const getUserInfomation = async () => {
        try {
            // 서버로 로그인 요청 보내기
            console.log(userToken);
            const response = await axios.get('http://3.35.239.36:8080/api/members/summary', {headers: { Authorization: `Bearer ${userToken}`
            }}).then(res => {
                console.log('유저정보 성공:', res.data.data);
                setUserInfo(res.data.data);
            })
        } catch (error) {
            console.error('유저정보 호출 실패:', error);
        }
    }
    useEffect(() => {
        getUserInfomation()
        console.log("됐당");
    }, [isLogin]);
    const Profile = () => {
        return (
            <div className="w-full h-full p-[20px]">
                <div className="flex w-full h-auto flex centent-center">
                    <div className="w-full h-full flex items-center font-bold justify-between">
                        <div className={`${user.field.id == 2 ? "text-skyblue" : "text-green"} text-[20px] w-auto"`}>{`${user.field.id == 2 ? "CERT" : "개발"}`}</div>
                        <div className="text-white w-[100px]">
                            <p className="text-[20px]">{userInfo.name}</p>
                            <p className="text-[16px]">{userInfo.studentId}</p>
                        </div>
                    </div>
                    <button className="bg-blue w-[120px] h-[40px] font-bold rounded-full text-[14px] text-center" onClick={() => {
                        dispatch(clearToken());
                        router.push('/');
                    }}>
                        로그아웃
                    </button>

                </div>
                <a className="w-auto h-full mt-[20px] rounded-[10px] bg-blue centent-center" href="/myPage">
                    <div className="w-full h-[60px] rounded-[10px] mt-[20px] bg-blue text-center content-center font-bold text-[14px]">
                        마이 페이지
                    </div>
                </a>
            </div>
        )
    }
    return (
        <div className="w-[320px] h-[192px] bg-deepBlue mb-[20px] rounded-[10px]">
            {isLogin && Profile()}
            <div className="shrink">{!isLogin && Login()}</div>
        </div>
    )
}

const PostShortcut = () => {
    interface categoryDataObject {
        id: number;
        name: string;
        data: smallCategoryListObject[]
    }
    interface smallCategoryListObject {
        id: number;
        name: string
    }
    const [largeCategoryList, setLargeCategoryList] = useState<smallCategoryListObject[]>([]);
    const [smallCategoryList, setSmallCategoryList] = useState<smallCategoryListObject[]>([]);
    
    const getCategoryData = async () => {
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
    }
    useEffect(() => {
        getCategoryData()
    }, []);
    const categoryData: categoryDataObject[] = [{ "id": 1, "name": "세미나", "data": [{ "id": 1, "name": "중간세미나" }, { "id": 2, "name": "개발세미나" },{ "id": 2, "name": "써트세미나" }] }]
    return (
        <div className="w-full h-auto bg-deepBlue rounded-[10px] p-[20px]">
            {CategoryList(categoryData)}
        </div>
    )
}

export default function SideBar() {
    return (
        <div className="w-[317px] flex-none w-min-0 h-auto ml-[50px]">
            {ProfileShortcut()}
            {PostShortcut()}
        </div>
    )
}