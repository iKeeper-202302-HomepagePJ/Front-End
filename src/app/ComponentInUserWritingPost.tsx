
interface userDataObject {
    user_id: string
    user_name: string;
    user_profile_picture: string;
    field_id: number;
    userPost : number;
    userComment : number;
}
const ShowCategory = (majorCategory:string, subCategory:string) => {
    return (
        <div className="text-[16px] font-bold text-pink w-[180px]">
            {majorCategory}{` > ${subCategory}`}
        </div>
    )
}

const UserInformation = (userData:userDataObject) => {
    return (
        <div className="w-full h-[150px] bg-deepBlue mb-[50px] p-[30px] rounded-lg flex items-center justify-around font-bold">
            <div className='relative w-auto h-auto'>
                <input type="file" id="UploadUserProfileIamge" className='hidden'></input>
                <img className="object-none w-[80px] h-[80px] rounded-full" src={userData.user_profile_picture} alt="프로필 이미지" />
            </div>
            <div className=''>
                <div className='text-[26px] font-bold text-white'>{userData.user_name}</div>
                <div className='text-[20px] font-semibold text-white'>ID : {userData.user_id}</div>
            </div>
            <div className={`text-[20px] font-semibold ${userData.field_id == 2 ? 'text-skyblue' : 'text-green'}`}>{`${userData.field_id == 2 ? 'CERT' : '개발'}`}</div>
                <a href="/userPostListPage">
                    <div className="w-[150px] h-[50px] rounded-lg bg-blue align-middle flex items-center justify-center text-[20px]">
                        작성글 : {userData.userPost}
                    </div>
                </a>
                <a href="/userCommentListPage">
                    <div className="w-[150px] h-[50px] rounded-lg bg-blue align-middle flex items-center justify-center text-[20px]">
                        작성댓글 : {userData.userComment}
                    </div>
                </a>
        </div>
    )
}
export {UserInformation, ShowCategory}