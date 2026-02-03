# 동아리 홈페이지 프로젝트

이 프로젝트는 **동아리 운영을 위한 웹 기반 관리 시스템**입니다.
동아리 일정 관리, 게시물 작성 및 회원 관리를 효율적으로 할 수 있도록 설계되었습니다.

Next.js 기반으로, TypeScript와 Tailwind CSS가 사용했습니다.

---

## 주요 기능
- **동아리 일정 관리**
  - 커스텀 달력을 기반으로 한 일정 조회
  - 월별, 일별 목록 형태로 일정 확인
    
- **게시판 기능**
  - 게시물 작성, 조회, 수정, 삭제 (CRUD)
  - 에디터 기반 게시물 작성

- **회원관리**
  - 회원가입 / 로그인
  - JWT 기반 인증 및 사용자 상태 관리
  - 회원 목록 등 회원 관리 기능

- **상태 관리 및 API 통신**
  - Redux를 통한 전역 상태 관리
  - Axios 기반 API 통신 구조

---

## 기술 스택
- **Framework**
  - Next.js(App Router)

- **Language**
  - TypeScript

- **Styling**
  - Tailwind CSS

- **State Management**
  - Redux

- **Editor**
  - Tiptap

- **HTTP Client**
  - Axios

- **Authentication**
  - JWT

---

## 환경 설정
이 프로젝트는 백엔드 API와 연동되어 동작합니다.
아래와 같이 ```.env.local``` 파일을 생성해주세요

```
NEXT_PUBLIC_API_URL={백엔드 서버 API 주소}
```
