import Image from 'next/image';
import "../../css/todo.css";

const header = "w-full h-[165px] mt-[20px] flex flex-row items-end"
export default function Header() {
    return (
        <div className={`${header}`}>
            <a className="w-[165px] rounded-[10px]" href="/mainPage">
                <img className="object-fill" src="/LOGO_Black.svg" alt="설명" />
            </a>
            <div className="w-full h-1/2 bg-deepBlue flex items-center justify-between px-[50px]">
                <div className={`group relative dropdown text-[26px] cursor-pointer flex justify-center`}>
                    <div className={`w-[150px] text-white test-[26px] font-semibold`}>공지사항</div>
                    <div className="group-hover:block dropdown-menu absolute hidden font-semibold">
                        <ul className="mt-[40px] rounded-[10px] px-[10px] bg-blue shadow lefx-col items-center justify-between">
                            <a className="block hover:bg-black cursor-pointer" href="/CalendarPage">공지사항</a>
                            <a className="block hover:bg-black cursor-pointer" href="/CalendarPage">일정</a>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
