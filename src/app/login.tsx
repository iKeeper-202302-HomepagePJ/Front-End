"use client"
import React, { useState } from 'react';
import { api } from "@/lib/axios";
import { useRouter } from 'next/navigation'; // useRouter 를 import 합니다.
import { useDispatch, useSelector } from "react-redux";
import { setToken, clearToken, setInfo,} from './redux/userSlice';
import { RootState } from './redux/store';
import { decode } from "js-base64"
interface loginData {

}
const LoginPage: React.FC = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter(); // useRouter 를 사용하여 라우터를 가져옵니다.
    const dispatch = useDispatch();
    const user = useSelector((state:RootState) => state.user.token);
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // ID와 비밀번호가 둘 다 비어 있는지 확인
        if (!id.trim() || !password.trim()) {
            setError('ID 혹은 비밀번호가 입력되지 않았습니다.');
            return;
        }

        try {
            // 서버로 로그인 요청 보내기
            const response = await api.post('/api/auths/login', { studentId:id, password:password }).then(res => {
                dispatch(setToken(res.data.data.accessToken));
                const payload = (res.data.data?.accessToken || "").split('.')[1];
                dispatch(setInfo(JSON.parse(decode(payload))));
            })
        } catch (error) {
            console.error('로그인 실패:', error);
            setError('잘못된 입력입니다.');
            // 로그인 실패 시 ID와 비밀번호를 초기화합니다.
            setId('');
            setPassword('');
        }
    };

    // 회원가입 버튼 클릭 시 /signup 으로 이동하는 함수
    const handleSignUp = () => {
        router.push('/signupPage');
    };
    const findPassword = () => {
        console.log(user)
    }
    return (
        <div className='relative rounded-[20px] h-[192px] w-[317px] text-white font-bold text-base bg-deepBlue py-[20px] px-[20px]'>
            {error && <div className='absolute text-center inset-y-0 left-1/2 transform -translate-x-1/2 text-red font-bold text-[12px] mt-[20px] h-[20px] w-[300px]'>{error}</div>}

            <form onSubmit={handleLogin}>
                <div className='flex items-center mt-[30px]'>
                    <div>
                        <div>
                            <input className='text-black px-2 py-1 rounded-[20px] h-[37px] w-[167px] bg-gray font-bold text-[12px] rounded-md mb-[10px] placeholder-gray-400' type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} placeholder=" ID" />
                        </div>
                        <div>
                            <input className='text-black px-2 py-1 rounded-[20px] h-[37px] w-[167px] bg-gray font-bold text-[12px] rounded-md placeholder-gray-400' type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" PW" />
                        </div>
                    </div>
                    <button className='bg-blue h-[91px] w-[84px] rounded-[20px] ml-[18px]' type="submit">로그인</button>
                </div>
            </form>
            <div className='flex items-center text-[14px] justify-center mt-[10px]'>
                <button className='flex' type="button" onClick={findPassword}>비밀번호 찾기 </button>
                <div className='px-2'>
                    /
                </div>
                <button className='flex' type="button" onClick={handleSignUp}>회원가입</button>
            </div>
        </div>
    );
};

export default LoginPage;
