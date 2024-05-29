import MyPage from "./ComponentMyPage";
import axios from "axios";
interface userDataObject {
    studentId: string
    name: string;
    field: {
        id: number,
        name: string
    }
    user_profile_picture?: string;
    warning: boolean;
    birth: string;
    email: string;
    status: string;
    pnumber: string;
    grade: {
        id:number, name:string
    };
    major1: {
        id:number, name:string
    };
    major2: {
        id:number, name:string
    };
    major3: {
        id:number, name:string
    };
    minor: {
        id:number, name:string
    };
}

let userData: userDataObject;
const majorList = ["없음", "컴퓨터소프트웨어학부", "게임공학전공"]
const majorData = "컴퓨터소프트웨어학부"
const major2Data = "없음"
const major3Data = "없음"
const minorData = "없음"
/*const statusList = [{id : 0, name :"재학"}, {id : 1, name :"휴학"}, {id : 2, name :"졸업"}]
const gradeList = [{id:0, name:"1학년 / 1학차"}, {id:1, name:"1학년 / 2학차"}, {id:2, name:"2학년 / 1학차"}, {id:3, name:"2학년 / 2학차"}, {id:4, name:"3학년 / 1학차"}, {id:5, name:"3학년 / 2학차"}, {id:6, name:"4학년 / 1학차"}, {id:7, name:"4학년 / 2학차"}, {id:8, name:"5학년 / 1학차"}]
*/
const dlatlcnftjrwjscprotn = 5 /*******임시 출석 개수**** */
async function getMajorData() {
    try {
        //majorData = (await axios.post('https://4a26c935-10b4-4195-a293-2e78b6965b48.mock.pstmn.io/api/test')).data;
        console.log(majorData)
        return majorData;
    } catch (error) {
        console.error(error);
        throw error; // 에러를 다시 throw하여 에러 처리 가능하도록 함
    }
}
export default async function Page() {
    //await getMajorData();
    //console.log(userData)
    return (
        <div className="w-full w-min-[370px] flex justify-normal">
            {<MyPage />}
            <div className="w-50 y-50 bg-red"></div>
        </div>
    );
};

export { getMajorData}