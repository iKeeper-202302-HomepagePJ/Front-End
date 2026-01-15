"use client"
import { CategoryList } from "./ComponentSideBarCategoryList"
import LoginPage from "./login"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from './redux/store';
import { clearToken } from "./redux/userSlice";
import { useRouter } from 'next/navigation';
import { api } from "@/lib/axios";
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
export function ProfileShortcut() {
    //const isLogin = false ///******************로그인 상태확인 임시 수정**************************///
    const isLogin = useSelector((state: RootState) => state.user.isLogining);
    const userToken = useSelector((state: RootState) => state.user.token);
    const auth = useSelector((state: RootState) => state.user.auth);
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
            const response = await api.get('/api/members/summary', {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }).then(res => {
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
            <div className="w-full h-full p-[30px] flex flex-col justify-between">
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
                <div className="flex w-full h-[60px]">
                    <a className="flex-1 h-full rounded-[10px] mr-[5px] bg-blue centent-center" href="/myPage">
                        <div className="w-full h-[60px] rounded-[10px] bg-blue text-center content-center font-bold text-[14px]">
                            마이 페이지
                        </div>
                    </a>
                    {auth == "ROLE_ADMIN" && <a className="ml-[5px] flex-1 bg-blue text-center content-center font-bold text-[14px] rounded-[10px]" href="/admin">
                        관리자<br/>페이지
                        </a>}
                </div>
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


export default function SideBar() {
    return (
        <div className="w-[317px] h-auto ml-[50px] mt-[50px]">
            {ProfileShortcut()}
            <div className="w-full h-auto bg-deepBlue rounded-[10px] p-[20px]">
            {CategoryList()}
        </div>
        </div>
    )
}