import Header from "../../../../ComponentsHeader";
import SideBar from "../../../../ComponentSideBar";
import Footer from "../../../../ComponentFooter";
import Post from "./ComponentPost";
interface postDataObject {                     // json으로 받는 객체 타입 정의
    id: number;
    user: string;
    title: string;
    headline: string;
    timestamp: string;
    postComment: number;
    cotegory: string;
}
interface categoryDataObject {
    id: number;
    name: string;
}
const postData: postDataObject = {
    id: 1,
    user: "김가글",
    title: "글자수가오십자인것에한번최대한길게해보려는건에대하여글자수가오십자인것에한번최대한길게해보려는건에대하",
    headline: '최대이십글자더라가나다라마바다사아다바마',
    timestamp: "2024-02-13T13:00:00+09:00",
    postComment: 1,
    cotegory: "2024-1 개발세미나"
}
const commnetData: any[] = [
    {
        user: {
            name : "김철수",
            id : "22113966"
        },
        timestamp: "2024-02-13T13:00:00+09:00",
        comment:"유용하네요."
    },
    {
        user: {
            name : "김철수",
            id : "22113966"
        },
        timestamp: "2024-02-13T13:00:00+09:00",
        comment:"관련 자료는 ~에서 찾을 수 있습니다."
    }
]
export default function ({ params }: { params: { postID: Number } }) {         // 수정 : string에서 number로. 경로를 카테고리 번호로 변경
    return (
        <div className="w-full flex flex-row">
            <div className="grow">
                <Post />
            </div>
        </div>
    );
};
export { postData, commnetData };