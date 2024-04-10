import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // useRouter 를 import 합니다.

const LoginPage: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // useRouter 를 사용하여 라우터를 가져옵니다.

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ID와 비밀번호가 둘 다 비어 있는지 확인
    if (!id.trim() || !password.trim()) {
      setError('ID 혹은 비밀번호가 입력되지 않았습니다.');
      return;
    }

    try {
      // 서버로 로그인 요청 보내기
      const response = await axios.post('https://f8595853-a026-42f2-a444-0fcbd28602b0.mock.pstmn.io/api/login', { id, password });
      console.log('로그인 성공:', response.data);
      // 로그인이 성공하면 다음 작업을 수행
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
    router.push('/signup');
  };

  return (
    <div className='relative rounded-[20px] h-[192px] w-[317px] text-white font-bold text-base bg-deepBlue py-[20px] px-[20px]'>
      {error && <div className='absolute text-center inset-y-0 left-1/2 transform -translate-x-1/2 text-red font-bold text-[12px] mt-[20px] h-[20px] w-[300px]'>{error}</div>}

      <form onSubmit={handleLogin}>
        <div className='flex items-center mt-[30px]'>
          <div>
            <div>
              <input className='px-2 py-1 rounded-[20px] h-[37px] w-[167px] bg-gray font-bold text-[12px] rounded-md mb-[10px] placeholder-gray-400' type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} placeholder=" ID" />
            </div>
            <div>
              <input className='px-2 py-1 rounded-[20px] h-[37px] w-[167px] bg-gray font-bold text-[12px] rounded-md placeholder-gray-400' type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" PW" />
            </div>
          </div>
          <button className='bg-blue h-[91px] w-[84px] rounded-[20px] ml-[18px]' type="submit">로그인</button>
        </div>
      </form>
      <div className='flex items-center text-[14px] justify-center mt-[10px]'>
        <button className='flex' type="button" onClick={handleSignUp}>비밀번호 찾기 </button>
        <div className='px-2'>
            / 
        </div>
        <button className='flex' type="button" onClick={handleSignUp}>회원가입</button>
      </div>
    </div>
  );
};

export default LoginPage;
