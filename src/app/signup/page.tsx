// SignupPage.tsx
"use client";
import React, { useState } from 'react';
import InputBox from './InputBox';

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setUsernameError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!username) {
      setUsernameError(true);
    }

    if (!email) {
      setEmailError(true);
    }
    return;

    // 여기서 회원가입을 처리하는 코드를 추가할 수 있습니다.
  };

  return (
    <div className="min-h-screen flex items-start justify-left bg-black">
      <div className="text-white font-bold" style={{ marginLeft: "249px", fontSize: "20px" }}>
        <h2 className="text-bold mb-6" style={{ marginTop: "239px", fontSize: "26px" }}>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <InputBox
              label="이름"
              value={username}
              error={usernameError}
              onChange={handleUsernameChange}
              placeholder="이름을 입력해주세요."
            />
            <InputBox
              label="이메일"
              value={email}
              error={emailError}
              onChange={handleEmailChange}
              placeholder="이메일을 입력해주세요."
            />
          </div>
          <button type="submit" className="text-bold bg-green text-black py-2 px-4 rounded hover:bg-red-600" style={{fontSize: "16px", width: "120px", height: "40px"}}>제출하기</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
