import Suggestion from './ComponentSuggestion'

export default function Page({ params }: { params: { page: string[] } }) {
 return (
    <div className="w-full">
        <div className="font-bold text-[20px] h-[30px]">i-Keeper 건의함</div>
        <div className="w-full rounded-lg bg-deepBlue h-auto p-[20px] mt-[20px] test-[16px] text-center font-semibold mb-[20px]">
        <div className="w-full rounded-lg bg-deepBlue h-auto text-[20px] text-center font-semibold ">본 페이지는 “i-Keeper 건의함” 입니다!<br/><br/></div>
        동아리원 분들은 동아리에 대한 건의사항을 "건의 사항"란에 적어주세요!<br/>
        건의사항은 임원진 회의를 거쳐 수리 할 수 있도록 하겠습니다. <br/>
        결과는 댓글로 알려드리며, 결정사항은 공지방에 올리겠습니다.<br/><br/>
        i-Keeper가 더 나은 동아리가 될 수 있도록 도움 부탁드리겠습니다.<br/>
        (본 건의함은 익명으로 진행됩니다)
        </div>
        <Suggestion page={params.page ? isNaN(Number(params.page[0])) ? 1 : Number(params.page[0]) < 1 ? 1 : Number(params.page[0]) : 1}/>
    </div>

 )
}