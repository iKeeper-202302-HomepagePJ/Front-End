'use client';
import { userData, dlatlcnftjrwjscprotn, gradeList, majorList, statusList } from './page'
import { IconWarining } from '../../../svgtest'
import { use, useEffect, useState } from "react"
const userDetailBox = "w-full h-[35px] text-[16px] font-semibold text-white flex items-center justify-start"
const userDetailKeyBox = "w-[170px] max-w-[170px] min-w-[70px] h-full flex items-center"
const userDetailValueBox = "w-full w-max-[300px] h-full flex items-center"
const toggleBox = "w-[250px] h-full max-w-[250px] min-w-[150px] flex justify-between items-center bg-blue rounded-lg px-[10px] relative"
const UserDetails = () => {
    const [userStatus, setUserStatus] = useState(userData.user_status)
    const [userGrade, setUserGrade] = useState(userData.user_grade)
    const [userMajor, setUserMajor] = useState(userData.major)
    const [userMajor2, setUserMajor2] = useState(userData.major2)
    const [userMajor3, setUserMajor3] = useState(userData.major3)
    const [userMinor, setUserMinor] = useState(userData.minor)
    const [showToggle, setShowToggle] = useState("")
    const [openModal, setOpenModal] = useState("")
    const setUserMajor2Handle = (major: string) => {
        if (major == "없음") {
            setUserMajor3("없음")
        }
        setUserMajor2(major);
    }
    const leaveIKeeper = () => {
        setOpenModal("leaveIKeeper");        /************ 로그아웃, 회원 재적 상태 변경 필요 ---> 관리직한테 따로 알리는 것도 필요할까? ********** */
        console.log("엉엉 탈퇴했다.");
    }
    const saveUserData = () => {
        console.log("우왕 저장됐다.");
        /***이미지 서버에 올려야겟지 */
        const updateUserData = {
            'user_id': userData.user_id,
            'user_nume': userData.user_nume,
            'authority_id': userData.authority_id,
            //'user_profile_picture': "/LOGO_Black.svg",
            'field_id': userData.field_id,
            user_warning: true,
            //user_attendance: 3,  
            user_birth: userData.user_birth,
            user_email: userData.user_email,
            user_status: userStatus,
            user_phone_number: userData.user_phone_number,
            user_grade: userGrade,
            major: userMajor,
            major2: userMajor2,
            major3: userMajor3,
            minor: userMinor
        }
    }
    const toggleItemBox = (toggleItemList: string[], toggleValue: string, setToggleValue: Function) => {
        return (
            <button className={`w-full h-auto px-[10px] py-1 absolute rounded-lg bg-blue fixed top-0 left-0 z-10 drop-shadow-lg`} onClick={(e) => { e.stopPropagation(); setShowToggle(""); }} onMouseLeave={() => setShowToggle("")}>
                <div className='flex justify-between items-center '>
                    <div id={`toggleValue`} className='w-full h-[30px] text-left'>{toggleValue}</div>
                    <img src='/IconToggle.svg' className='rotate-180'></img>
                </div>
                {toggleItemList.map((key: string) => (<div id={`toggle${key}`} className='w-full h-[30px] text-left' onClick={() => { setShowToggle(""); setToggleValue(key); }}>{key}</div>))}
            </button>
        )
    }
    return (
        <div className='w-full w-min-[400px] h-auto bg-deepBlue rounded-lg p-[60px] flex flex-col items-stretch'>
            <div className="flex flex-wrap justify-between">
                <div className='w-auto h-full space-y-[20px] mb-[20px]'>
                    <div className={userDetailBox}>
                        <div className={userDetailKeyBox}>생년월일</div>
                        <div className={userDetailValueBox}>{userData.user_birth.slice(0, 4)}-{userData.user_birth.slice(5, 7)}-{userData.user_birth.slice(8, 10)}</div>
                    </div>
                    <div className={userDetailBox}>
                        <div className={userDetailKeyBox}>e-mail</div>
                        <div className={userDetailValueBox}>{userData.user_email}</div>
                    </div>
                    <div className={userDetailBox}>
                        <div className={userDetailKeyBox}>연락처</div>
                        <div className={userDetailValueBox}>{userData.user_phone_number}</div>
                    </div>
                </div>
                <div className='w-auto h-full space-y-[20px] justify-self-end'>
                    <div className={userDetailBox}>
                        <div className={userDetailKeyBox}>재학 상태</div>
                        <button className={toggleBox} onClick={() => setShowToggle("statusToggle")}>
                            {showToggle == "statusToggle" && toggleItemBox(statusList, userStatus, setUserStatus)}
                            {userStatus}
                            <img src='/IconToggle.svg'></img></button>
                    </div>
                    <div className={userDetailBox}>
                        <div className={userDetailKeyBox}>학년 및 학차</div>
                        <button className={toggleBox} onClick={() => setShowToggle("gradeToggle")}>
                            {showToggle == "gradeToggle" && toggleItemBox(gradeList, userGrade, setUserGrade)}
                            {userGrade}
                            <img src='/IconToggle.svg'></img></button>
                    </div>
                    <div className={userDetailBox}>
                        <div className={userDetailKeyBox}>{`학부(학과)`}</div>
                        <button className={toggleBox} onClick={() => setShowToggle("majorToggle")}>
                            {showToggle == "majorToggle" && toggleItemBox(majorList.slice(1), userMajor, setUserMajor)}
                            {userMajor}
                            <img src='/IconToggle.svg'></img></button>
                    </div>
                    <div className={userDetailBox}>
                        <div className={userDetailKeyBox}>부전공</div>
                        <button className={toggleBox} onClick={() => setShowToggle("minorToggle")}>
                            {showToggle == "minorToggle" && toggleItemBox(majorList, userMinor, setUserMinor)}
                            {userMinor}
                            <img src='/IconToggle.svg'></img></button>
                    </div>
                    <div className={userDetailBox}>
                        <div className={userDetailKeyBox}>복수전공1</div>
                        <button className={toggleBox} onClick={() => setShowToggle("major2Toggle")}>
                            {showToggle == "major2Toggle" && toggleItemBox(majorList, userMajor2, setUserMajor2Handle)}
                            {userMajor2}
                            <img src='/IconToggle.svg'></img></button>
                    </div>
                    <div className={userDetailBox}>
                        <div className={userDetailKeyBox}>복수전공2</div>
                        <button className={toggleBox} onClick={() => { userMajor2 != "없음" ? setShowToggle("major3Toggle") : setShowToggle("dontOpen") }}>
                            {showToggle == "major3Toggle" && toggleItemBox(majorList, userMajor3, setUserMajor3)}
                            {userMajor3}
                            <img src='/IconToggle.svg'></img>
                        </button>
                    </div>
                    <div className='text-red h-[40px]'>
                        {showToggle == "dontOpen" && '복수전공1을 선택하신 후 복수전공2를 선택해주세요'}
                    </div>
                </div>
            </div>
            <div className='flex justify-between mt-[50px]'>
                <button className='w-[70px] h-[40px] bg-red rounded-lg font-bold text-black' onClick={() => setOpenModal("leaveModal")}>탈퇴</button>
                {openModal == "leaveModal" && <div>
                    <div className='w-screen h-screen bg-deepBlue opacity-80 fixed top-0 left-0 right-0 z-40' onClick={() => setOpenModal("")}></div>
                    <div className='w-[500px] h-[300px] rounded-lg bg-black text-white text-[20px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 content-center text-center '>
                        <p>'탈퇴'버튼을 누르면 탈퇴가 진행됩니다.</p>
                        <p>'정말로 탈퇴하시겠습니까?</p>
                        <div className='w-[200px] h-[40px] flex justify-between ml-[150px] mt-[15px]'>
                            <button className='w-[70px] h-[40px] bg-skyblue rounded-lg font-bold text-black' onClick={() => { setOpenModal("") }}>취소</button>
                            <button className='w-[70px] h-[40px] bg-red rounded-lg font-bold text-black' onClick={() => { setOpenModal(""); leaveIKeeper() }}>탈퇴</button>
                        </div>
                    </div> </div>}
                {openModal == "leaveIKeeper" && <div>
                    <a className='w-screen h-screen bg-deepBlue opacity-80 fixed top-0 left-0 right-0 z-40' href="/" onClick={() => setOpenModal("")}></a>
                    <div className='w-[500px] h-[300px] rounded-lg bg-black text-white text-[20px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 text-center place-content-center'>
                        <div>탈퇴되셨습니다.</div>
                        <div>작성한 글과 댓글은 90일간 보관 후 삭제됩니다.</div>
                        <a href="/" onClick={() => { setOpenModal(""); leaveIKeeper() }}>
                            <div className='ml-[215px] w-[70px] h-[40px] mt-[15px] bg-red rounded-lg font-bold text-black text-center align-middle'>확인</div>
                        </a>
                    </div> </div>}
                <div className='flex flex-row w-auto'>
                    <div className='text-right mr-[10px] font-semibold'>
                        <p>잘못된 정보 입력으로 발생하는 불이익은 동아리에서 책임지지 않습니다.</p>
                        <p>학부, 학과, 재학 상태, 학년 및 학차를 제외한 기타 항목의 수정은 관리자에게 문의 부탁드립니다.</p>
                    </div>
                    <button className='w-[120px] h-[40px] bg-green rounded-lg font-bold text-deepBlue flex justify-center items-center' onClick={() => setOpenModal("saveModal")}>
                        저장
                        <img src='/IconSave.svg' className='ml-1 w-[20px] h-[20px]'></img>
                    </button>
                    {openModal == "saveModal" && <div>
                        <div className='w-screen h-screen bg-deepBlue opacity-80 fixed top-0 left-0 right-0 z-40' onClick={() => setOpenModal("")}></div>
                        <div className='w-[1000px] h-[500px] rounded-lg bg-black text-white text-[20px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40'>
                            <div className='flex-col justify-start p-[20px] space-y-[10px]'>
                                <p>{userData.user_status != userStatus && `회원님의 재적상태가 ${userStatus}로 수정됩니다.`}</p>
                                <p>{userData.user_grade != userGrade && `회원님의 학년 및 학차가 ${userGrade}로 수정됩니다.`}</p>
                                <p>{userData.major != userMajor && `회원님의 학부(학과)가 ${userMajor}로 수정됩니다.`}</p>
                                <p>{userData.minor != userMinor && `회원님의 부전공이 ${userMinor}로 수정됩니다.`}</p>
                                <p>{userData.major2 != userMajor2 && `회원님의 복수전공1이 ${userMajor2}로 수정됩니다.`}</p>
                                <p>{userData.major3 != userMajor3 && `회원님의 복수전공2가 ${userMajor3}로 수정됩니다.`}</p>
                                <div className="fixed top-[370px]">
                                    <p>저장하시겠습니까?</p>
                                    <button className='mt-[10px] w-[70px] h-[40px] bg-green rounded-lg font-bold text-black' onClick={() => { setOpenModal(""); saveUserData() }}>확인</button>
                                </div>
                            </div>
                        </div></div>}
                </div>
            </div>
        </div >
    )
}
const SetUserField = (userFieldID: number) => {
    switch (userFieldID) {
        case 2:
            return ["CERT", "text-skyblue"]
        case 3:
            return ["개발", "text-green"]
    }
}
const UserInformationAndActivityStatus = () => {
    const [upLoadingIamge, setUpLoadingIamge] = useState(false);
    const userField: string[] = SetUserField(userData.field_id)!;
    return (
        <div className="w-full h-[200px] bg-deepBlue mb-[50px] p-[30px] rounded-lg flex items-center justify-around">
            <div className='relative w-auto h-auto'>
                <input type="file" id="UploadUserProfileIamge" className='hidden'></input>
                <img className="object-none w-[80px] h-[80px] rounded-full" src={userData.user_profile_picture} alt="프로필 이미지" />
                <label htmlFor="UploadUserProfileIamge" className='absolute top-[60px] left-[10px] w-[60px] h-[30px] bg-blue rounded-md text-[14px] font-semibold text-white flex items-center justify-center'>
                    변경</label>
            </div>
            <div className=''>
                <div className='text-[26px] font-bold text-white'>{userData.user_nume}</div>
                <div className='text-[20px] font-semibold text-white'>ID : {userData.user_id}</div>
            </div>
            <div className={`text-[20px] font-semibold  ${userField[1]}`}>{userField[0]}</div>
            <div className='flex items-center text-[20px] font-semibold '>
                경고 현황
                {IconWarining('w-[40px], h-[40px]', `${userData.user_warning ? 'orange' : 'blue'}`)}
            </div>
            <div className='flex items-center text-[20px] font-semibold '>
                출석 현황 {userData.user_attendance} / {dlatlcnftjrwjscprotn}
            </div>
            <div className='w-[120px] text-[20px] font-semibold'>
                <a href="/userPostListPage">
                    <div className="w-full h-[50px] mb-[10px] rounded-lg bg-blue align-middle flex items-center justify-center">
                        작성글
                    </div>
                </a>
                <a href="/userCommentListPage">
                    <div className="w-full h-[50px] rounded-lg bg-blue align-middle flex items-center justify-center">
                        작성댓글
                    </div>
                </a>
            </div>
        </div>
    )
}

export default function MyPage() {
    return (
        <div className="w-full h-auto">
            {UserInformationAndActivityStatus()}
            {UserDetails()}
        </div>
    )
}