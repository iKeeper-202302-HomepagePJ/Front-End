import Footer from "../../../ComponentFooter";
import SideBar from "../../../ComponentSideBar";
import { UserInformation } from "../../../ComponentInUserWritingPost";
import Header from "../../../ComponentsHeader";
import { PostItem, PostListHeading } from "../../../ComponentPostList";
import UserPostList from "./ComponentUserPostListPage";
interface userDataObject {
    user_id: string
    user_name: string;
    user_profile_picture: string;
    field_id: number;
    userComment: number;
    userPost: number;
}
interface postDataObject {                     // json으로 받는 객체 타입 정의
    id: number;
    user: string;
    title: string;
    headline: string;
    timestamp: string;
    postComment?: number;
    bookmark?: boolean;
    majorCategory?: string;
    subCategory?: string;
}
const userData: userDataObject = {                   /***********이거 나중에 api로 수정*************** */
    'user_id': '22113455',
    'user_name': '신세미',
    'user_profile_picture': "/LOGO_Black.svg",
    'field_id': 3,
    'userComment': 3,
    userPost: 2
}
const postData: postDataObject[] = [
    {
        id: 1,
        user: "김가글",
        title: "글자수가오십자인것에한번최대한길게해보려는건에대하여글자수가오십자인것에한번최대한길게해보려는건에대하",
        headline: '최대이십글자더라가나다라마바다사아다바마',
        timestamp: "2024-02-13T13:00:00+09:00",
        postComment: 1,
        majorCategory: "세미나",
        subCategory: "개발세미나"
    },
    {
        id: 2,
        user: "김나다",
        title: "가나다",
        headline: "2회차",
        timestamp: "2024-02-13T13:00:00+09:00",
        postComment: 3,
        majorCategory: "세미나",
        subCategory: "중간세미나"
    }
]
export default async function Page() {
    return (
        <main className="flex min-h-screen w-full bg-black flex-col">
            <div className="flex flex-col  flex-grow">
                {UserInformation(userData)}
                <UserPostList />
            </div>
        </main>
    );
};

export { postData }