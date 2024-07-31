import SideBar from "@/app/ComponentSideBar"

export default function AdminList() {
    const buttonBox = "w-[200px] h-[50px] bg-blue rounded-lg text-center content-center font-smeibold text-[16px] "
    return (
        <div className="flex w-full h-auto">
            <div className="flex flex-col text-[20px] font-semibold px-[10px] space-y-[10px] mt-[50px] h-[200px]">회원 관리
                <a className={`mt-[10px] ${buttonBox}`} href="/admin/joinAcceptPage">회원가입 승인</a>
                <a className={`${buttonBox}`} href="/admin/userListPage">회원 명단</a>
                <a className={`${buttonBox}`} href="/admin/attendancePage">출석 관리</a>
            </div>
            <div className="mt-[40px] mx-[30px] h-[220px] w-[1px] bg-blue"/>
            <div className="flex flex-col text-[20px] font-semibold px-[10px] space-y-[10px] mt-[50px] h-[200px]">홈페이지 관리
            <a className={`mt-[10px] ${buttonBox}`} href="/admin/shortcutManagementPage">바로가기 관리</a>
            <a className={`${buttonBox}`} href="/admin/categoryPage">카테고리 관리</a>
            <a className={`${buttonBox}`} href="/admin/adminManagement">권한 관리</a>
            </div>
            <div className="ml-auto"><SideBar/></div>
        </div>

    )
}