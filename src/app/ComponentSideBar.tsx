import { CategoryList } from "./ComponentSideBarCategoryList"

const ProfileShortcut = () => {
    const isLogin = true ///******************로그인 상태확인 임시 수정**************************///
    const Login = () => {
        
    }
    const Profile = () => {
        return (
            <div className="">
                <a className="w-[100px] rounded-[10px]" href="/myPage">
                    마이 페이지
                </a>
            </div>
        )
    }
    return (
        <div className="w-full h-[150px] bg-deepBlue mb-[20px] rounded-[10px]">
            {isLogin && Profile()}
            {!isLogin && Login()}
        </div>
    )
}

const PostShortcut = () => {
    interface categoryDataObject {
        id : number;
        name : string;
        data : smallCategoryObject[]
    }
    interface smallCategoryObject {
        id : number;
        name : string
    }
    const categoryData : categoryDataObject[] = [{"id" : 1, "name" : "개발세미나", "data" : [{"id" : 1, "name" : "2024-1"}, {"id" : 2, "name" : "2024-2"}]}]
    return (
        <div className="w-full h-auto bg-deepBlue rounded-[10px] p-[20px]">
            {CategoryList(categoryData)}
        </div>
    )
}

export default function SideBar() {
    return (
        <div className="w-[300px] flex-none w-min-0 h-auto ml-[50px]">
            {ProfileShortcut()}
            {PostShortcut()}
        </div>
    )
}