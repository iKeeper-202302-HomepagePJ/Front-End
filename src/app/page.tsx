"use client";
import React from 'react';
import LoginPage from './ComponentsLogin'; // 로그인 컴포넌트 경로를 올바르게 지정해주세요.

const App = () => {
  return (
    <div>
      {/* 로그인 페이지를 직접 렌더링합니다. */}
      <LoginPage />
      {/* 다른 경로에 대한 라우팅 설정을 추가할 수 있습니다. */}
    </div>
  );
};

export default App;
