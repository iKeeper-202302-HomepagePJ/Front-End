import Header from "../../../ComponentsHeader";
import SideBar from "../../../ComponentSideBar";
import Footer from "../../../ComponentFooter";
import MyPage from "./ComponentMyPage";
import SignupPage from "./a";
import axios from "axios";

interface userDataObject {
    user_id: string
    user_nume: string;
    authority_id: number;
    user_profile_picture: string;
    field_id: number;
    user_warning: boolean;
    user_attendance: number;
    user_birth: string;
    user_email: string;
    user_status: string;
    user_phone_number: string;
    user_grade: string;
    major: string;
    major2: string;
    major3: string;
    minor: string;
}

/*const userData: userDataObject = {                   /***********이거 나중에 api로 수정*************** *
    'user_id': '22113966',
    'user_nume': '신세미',
    'authority_id': 1, /** 얜 디비 저장*
    'user_profile_picture': "/LOGO_Black.svg",
    'field_id': 3,
    user_warning: true,
    user_attendance: 3,   /**얘는 또 어케 표현됨 *
    user_birth: "2023-03-24",
    user_email: "qqwweeddffvvggnsdcfg@gmail.com",
    user_status: "재학",
    user_phone_number: "010-2211-5544",
    user_grade: "1학년 / 1학차",
    major: "컴퓨터소프트웨어학부",
    major2: "없음",
    major3: "없음",
    minor: "없음"
}*/

const majorList = ["없음", "컴퓨터소프트웨어학부", "게임공학전공"]
const statusList = ["재학", "휴학", "졸업"]
const gradeList = ["1학년 / 1학차", "1학년 / 2학차", "2학년 / 1학차", "2학년 / 2학차", "3학년 / 1학차", "3학년 / 2학차", "4학년 / 1학차", "4학년 / 2학차", "5학년 / 1학차"]
//const majorData = "컴퓨터소프트웨어학부"
const major2Data = "없음"
const major3Data = "없음"
const minorData = "없음"
const dlatlcnftjrwjscprotn = 5 /*******임시 출석 개수**** */
let userData:any;
async function getUserData() {
    try {
      userData = (await axios.post('https://4a26c935-10b4-4195-a293-2e78b6965b48.mock.pstmn.io/api/test')).data;
      console.log(userData)
      return userData;
  } catch (error) {
      console.error(error);
      throw error; // 에러를 다시 throw하여 에러 처리 가능하도록 함
  }
}
let majorData:any;
async function getMajorData() {
    try {
      majorData = (await axios.post('https://4a26c935-10b4-4195-a293-2e78b6965b48.mock.pstmn.io/api/test')).data;
      console.log(majorData)
      return majorData;
  } catch (error) {
      console.error(error);
      throw error; // 에러를 다시 throw하여 에러 처리 가능하도록 함
  }
}
export default async function Page() {
    await getUserData();
    await getMajorData();
    return (
        <div className="w-full w-min-[370px] flex justify-normal">
            {<MyPage />}
        </div>
    );
};

export { userData, dlatlcnftjrwjscprotn, majorList, statusList, gradeList }