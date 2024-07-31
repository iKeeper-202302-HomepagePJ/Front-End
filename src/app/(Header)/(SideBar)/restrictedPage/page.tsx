export default async function Page() {
    //await getMajorData();
    //console.log(userData)
    return (
        <div className="w-full h-[500px] bg-deepBlue flex-row place-content-center font-semibold rounded-lg mt-[50px]">
            <p className="w-auto text-[20px] text-center">로그인을 하지 않으면 들어올 수 없는 페이지 입니다</p>
            <p className="w-auto text-[20px] text-center">로그인 후 다시 시도 해주세요</p>
            <a href="/" className="w-auto">
                <p className="w-auto text-[16px] text-center text-orange">메인 페이지로 돌아가기</p>

            </a>
        </div>
    );
};