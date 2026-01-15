import { api } from "@/lib/axios";
import { useRouter } from 'next/navigation'; // useRouter 를 import 합니다.
import { setToken, clearToken } from './redux/userSlice';

const router = useRouter(); // useRouter 를 사용하여 라우터를 가져옵니다.
// 회원가입 버튼 클릭 시 /signup 으로 이동하는 함수
const handleSignUp = () => {
    router.push('/signup');
};

const tryLogin = async (id:string, password:string) => {
    const response = await api.post('https://f8595853-a026-42f2-a444-0fcbd28602b0.mock.pstmn.io/api/login', { id, password });
    console.log('로그인 성공:', response.data);
    return (response.data)
}

export {handleSignUp, tryLogin}