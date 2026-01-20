'use client';
import { IconWarining } from '../../../SvgIcons'
import { use, useCallback, useEffect, useState } from "react"
import { RootState } from '../../../redux/store';
import { api } from "@/lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from '../../../redux/userSlice';
const userDetailBox = "w-full h-[35px] text-[16px] font-semibold text-white flex items-center justify-start"
const userDetailKeyBox = "w-[170px] max-w-[170px] min-w-[70px] h-full flex items-center"
const userDetailValueBox = "w-full w-max-[300px] h-full flex items-center"
const toggleBox = "w-[250px] h-full max-w-[250px] min-w-[150px] flex justify-between items-center bg-blue rounded-lg px-[10px] relative"

const SetUserField = (userFieldID: number) => {
    switch (userFieldID) {
        case 3:
            return ["CERT", "text-skyblue"]
        case 2:
            return ["개발", "text-green"]
        case 1:
            return ["와! 아이키퍼!", "text-orange"]
    }
}

interface userDataObject {
    studentId: string
    name: string;
    field: {
        id: number,
        name: string
    }
    profile_picture?: string;
    warning: boolean;
    birth: string;
    email: string;
    status: {
        id: number, name: string
    };
    pnumber: string;
    grade: {
        id: number, name: string
    };
    major1: {
        id: number, name: string
    };
    major2: {
        id: number, name: string
    };
    major3: {
        id: number, name: string
    };
    minor: {
        id: number, name: string
    };
}
export default function MyPage() {
    const [userData, setUserData] = useState<userDataObject | null>()
    const userToken = useSelector((state: RootState) => state.user.token);
    const [userStatus, setUserStatus] = useState(0)
    const [userGrade, setUserGrade] = useState(0)
    const [userMajor1, setUserMajor1] = useState(0)
    const [userMajor2, setUserMajor2] = useState(0)
    const [userMajor3, setUserMajor3] = useState(0)
    const [userMinor, setUserMinor] = useState(0)
    const [showToggle, setShowToggle] = useState("")
    const [openModal, setOpenModal] = useState("")
    const [majorList, setMajorList] = useState<any[]>([])
    const [statusList, setStatusList] = useState<any[]>([])
    const [gradeList, setGradeList] = useState<any[]>([])
    console.log("저장잘되냐?", useSelector((state: RootState) => state.user))
    const getUserData = useCallback(async () => {
        try {
            const respon = await api.get('/api/members/mypage', {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }).then(res => {
                setUserData(res.data.data)
                setUserStatus(res.data.data.status.id)
                setUserGrade(res.data.data.grade.id)
                setUserMajor1(res.data.data.major1.id)
                setUserMajor2(res.data.data.major2.id)
                setUserMajor3(res.data.data.major3.id)
                setUserMinor(res.data.data.minor.id)
                console.log('유저 정보 성공:', res.data.data);
            });
        } catch (error) {
            console.error('마이페이지 정보 실패:', error);
            throw error; // 에러를 다시 throw하여 에러 처리 가능하도록 함
        }
    }, [userToken]);
    const getMajorList = async () => {
        try {
          const response = (await api.get('/api/members/major')).data.data;
          console.log('응답 데이터:', response);
          if (Array.isArray(response)) {
            const names = response.map((item: any) => item.name); // "name" 값을 추출하여 새로운 배열 생성
            console.log('전공 목록:', names);
            setMajorList(names); // 추출된 "name" 값을 전공 목록으로 설정
          } else {
            console.error('Failed to fetch dropdown options: Response data is not an array');
          }
        } catch (error) {
          console.error('Failed to fetch dropdown options:', error);
        }
      };
      const getStateList = async () => {
        try {
          const response = (await api.get('/api/members/status')).data.data;
          console.log('응답 데이터:', response);
          if (Array.isArray(response)) {
            const names = response.map((item: any) => item.name); // "name" 값을 추출하여 새로운 배열 생성
            console.log('재적 상태 목록:', names);
            setStatusList(names); // 추출된 "name" 값을 전공 목록으로 설정
          } else {
            console.error('Failed to fetch dropdown options: Response data is not an array');
          }
        } catch (error) {
          console.error('Failed to fetch dropdown options:', error);
        }
      };
      const getGradeList = async () => {
        try {
          const response = (await api.get('/api/members/grade')).data.data;
          console.log('응답 데이터:', response);
          if (Array.isArray(response)) {
            const names = response.map((item: any) => item.name); // "name" 값을 추출하여 새로운 배열 생성
            console.log('학년 및 학차 목록:', names);
            setGradeList(names); // 추출된 "name" 값을 전공 목록으로 설정
          } else {
            console.error('Failed to fetch dropdown options: Response data is not an array');
          }
        } catch (error) {
          console.error('Failed to fetch dropdown options:', error);
        }
      };
    useEffect(() => {
        getMajorList();
        getGradeList();
        getStateList();
        console.log("됐ㅇ당");
    }, []);
    useEffect(() => {
        getUserData();
    }, [getUserData]);
    const UserInformationAndActivityStatus = () => {
        const userField: string[] = SetUserField(userData!.field.id)!;
        return (
            <div className="w-full h-[200px] bg-deepBlue mb-[50px] p-[30px] rounded-lg flex items-center justify-around">
                <div className='relative w-auto h-auto'>
                    <input type="file" id="UploadUserProfileIamge" className='hidden'></input>
                    <img className="object-none w-[80px] h-[80px] rounded-full" src={'/LOGO_Black.svg'} alt="프로필 이미지" />
                    <label htmlFor="UploadUserProfileIamge" className='absolute top-[60px] left-[10px] w-[60px] h-[30px] bg-blue rounded-md text-[14px] font-semibold text-white flex items-center justify-center'>
                        변경</label>
                </div>
                <div className=''>
                    <div className='text-[26px] font-bold text-white'>{userData!.name}</div>
                    <div className='text-[20px] font-semibold text-white'>ID : {userData!.studentId}</div>
                </div>
                <div className={`text-[20px] font-semibold  ${userField[1]}`}>{userField[0]}</div>
                <div className='flex items-center text-[20px] font-semibold '>
                    경고 현황
                    {IconWarining('w-[40px], h-[40px]', `${userData!.warning ? 'orange' : 'blue'}`)}
                </div>
                {/*false && <div className='flex items-center text-[20px] font-semibold '>
                    출석 현황 {userData!.attendance} / {dlatlcnftjrwjscprotn}
        </div>*/}
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
    const UserDetails = () => {
        const dispatch = useDispatch()
        const setUserMajor2Handle = (major: number) => {
            if (major == 0) {
                setUserMajor3(0)
            }
            setUserMajor2(0);
        }
        const leaveIKeeper = async () => {
            setOpenModal("leaveIKeeper");
            try {
                // 서버로 로그인 요청 보내기
                const response = await api.delete('/api/members/mypage', { headers: 
                { 
                  Authorization: `Bearer ${userToken}`
                }
              }).then(res => {
                dispatch(clearToken());
                })
            } catch (error) {
                console.error('탈퇴 실패:', error);
            }
        }
        const saveUserData = async () => {
            /***이미지*/
            const updateUserData = {
                'student': userData!.studentId,
                'name': userData!.name,
                //'profile_picture': "/LOGO_Black.svg",
                field: {
                    id: userData!.field.id
                },
                warning: userData!.warning,
                //attendance: 3,  
                birth: userData!.birth,
                email: userData!.email,
                status: {
                    id:userStatus
                },
                pnumber: userData!.pnumber,
                grade: {
                    id:userGrade
                },
                major1: {
                    id:userMajor1
                },
                major2: {
                    id:userMajor2
                },major3: {
                    id:userMajor3
                },
                minor: {
                    id:userMinor
                }
            }
            console.log(updateUserData)
            try {
                // 서버로 로그인 요청 보내기
                console.log("asdf");
                const response = await api.patch(`/api/members/mypage`, updateUserData,
                { headers: 
                  { 
                    Authorization: `Bearer ${userToken}`
                  }
                }).then(res => {
                  console.log('유저 정보 수정 성공', res.data);
                }) 
              } catch (error) {
                console.error('유저 정보 수정 실패:', error);
              }
        }
        const toggleItemBox = (toggleItemList: string[], toggleValue: string, setToggleValue: Function) => {
            return (
                <button className={`w-full h-auto px-[10px] py-1 absolute rounded-lg bg-blue fixed top-0 left-0 z-10 drop-shadow-lg`} onClick={(e) => { e.stopPropagation(); setShowToggle(""); }} onMouseLeave={() => setShowToggle("")}>
                    <div className='flex justify-between items-center '>
                        <div id={`toggleValue`} className='w-full h-[30px] text-left'>{toggleValue}</div>
                        <img src='/IconToggle.svg' className='rotate-180'></img>
                    </div>
                    {toggleItemList.map((key: string, index:number) => (<div id={`toggle${key}`} className='w-full h-[30px] text-left' onClick={() => { setShowToggle(""); setToggleValue(index); }}>{key}</div>))}
                </button>
            )
        }
        return (
            <div className='w-full w-min-[400px] h-auto bg-deepBlue rounded-lg p-[60px] flex flex-col items-stretch'>
                <div className="flex flex-wrap justify-between">
                    <div className='w-auto h-full space-y-[20px] mb-[20px]'>
                        <div className={userDetailBox}>
                            <div className={userDetailKeyBox}>생년월일</div>
                            <div className={userDetailValueBox}>{userData!.birth.slice(0, 4)}{userData!.birth.slice(4, 6)}{userData!.birth.slice(6, 8)}</div>
                        </div>
                        <div className={userDetailBox}>
                            <div className={userDetailKeyBox}>e-mail</div>
                            <div className={userDetailValueBox}>{userData!.email}</div>
                        </div>
                        <div className={userDetailBox}>
                            <div className={userDetailKeyBox}>연락처</div>
                            <div className={userDetailValueBox}>{userData!.pnumber}</div>
                        </div>
                    </div>
                    <div className='w-auto h-full space-y-[20px] justify-self-end'>
                        <div className={userDetailBox}>
                            <div className={userDetailKeyBox}>재학 상태</div>
                            <button className={toggleBox} onClick={() => setShowToggle("statusToggle")}>
                                {showToggle == "statusToggle" && toggleItemBox(statusList, statusList[userStatus], setUserStatus)}
                                {statusList[userStatus]}
                                <img src='/IconToggle.svg'></img></button>
                        </div>
                        <div className={userDetailBox}>
                            <div className={userDetailKeyBox}>학년 및 학차</div>
                            <button className={toggleBox} onClick={() => setShowToggle("gradeToggle")}>
                                {showToggle == "gradeToggle" && toggleItemBox(gradeList, gradeList[userGrade], setUserGrade)}
                                {gradeList[userGrade]}
                                <img src='/IconToggle.svg'></img></button>
                        </div>
                        <div className={userDetailBox}>
                            <div className={userDetailKeyBox}>{`학부(학과)`}</div>
                            <button className={toggleBox} onClick={() => setShowToggle("majorToggle")}>
                                {showToggle == "majorToggle" && toggleItemBox(majorList.slice(1), majorList[userMajor1], setUserMajor1)}
                                {majorList[userMajor1]}
                                <img src='/IconToggle.svg'></img></button>
                        </div>
                        <div className={userDetailBox}>
                            <div className={userDetailKeyBox}>부전공</div>
                            <button className={toggleBox} onClick={() => setShowToggle("minorToggle")}>
                                {showToggle == "minorToggle" && toggleItemBox(majorList, majorList[userMinor], setUserMinor)}
                                {majorList[userMinor]}
                                <img src='/IconToggle.svg'></img></button>
                        </div>
                        <div className={userDetailBox}>
                            <div className={userDetailKeyBox}>복수전공1</div>
                            <button className={toggleBox} onClick={() => setShowToggle("major2Toggle")}>
                                {showToggle == "major2Toggle" && toggleItemBox(majorList, majorList[userMajor2], setUserMajor2Handle)}
                                {majorList[userMajor2]}
                                <img src='/IconToggle.svg'></img></button>
                        </div>
                        <div className={userDetailBox}>
                            <div className={userDetailKeyBox}>복수전공2</div>
                            <button className={toggleBox} onClick={() => { userMajor2 != 0 ? setShowToggle("major3Toggle") : setShowToggle("dontOpen") }}>
                                {showToggle == "major3Toggle" && toggleItemBox(majorList, majorList[userMajor3], setUserMajor3)}
                                {majorList[userMajor3]}
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
                                    <p>{userData!.status.id != userStatus && `회원님의 재적상태가 ${statusList[userStatus]}로 수정됩니다.`}</p>
                                    <p>{userData!.grade.id != userGrade && `회원님의 학년 및 학차가 ${gradeList[userGrade]}로 수정됩니다.`}</p>
                                    <p>{userData!.major1.id != userMajor1 && `회원님의 학부(학과)가 ${majorList[userMajor1]}로 수정됩니다.`}</p>
                                    <p>{userData!.minor.id != userMinor && `회원님의 부전공이 ${majorList[userMinor]}로 수정됩니다.`}</p>
                                    <p>{userData!.major2.id != userMajor2 && `회원님의 복수전공1이 ${majorList[userMajor2]}로 수정됩니다.`}</p>
                                    <p>{userData!.major3.id != userMajor3 && `회원님의 복수전공2가 ${majorList[userMajor3]}로 수정됩니다.`}</p>
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
    return (
        <div className="w-full h-auto">
            {userData != null && UserInformationAndActivityStatus()}
            {userData != null && UserDetails()}
        </div>
    )
}