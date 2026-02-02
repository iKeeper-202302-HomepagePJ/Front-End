import { api } from "@/lib/axios"; //로컬 json **수정**
import { TodayCalendar } from '../calendarPage/ComponentsCalendar';
import PostList from '../postListPage/[...category]/ComponentPostList';
import { IconLoudSpeaker } from '@/app/SvgIcons';

let calendarData:any;
async function getCalenderData() {
  try {
    calendarData = (await api.get('/api/calendars'));
    calendarData = calendarData.data;
    console.log(calendarData)
    return calendarData;
} catch (error) {
    console.error(error);
    throw error; // 에러를 다시 throw하여 에러 처리 가능하도록 함
}
}
let postData:any;
const getPostListData = async () => {
  try {
      const response = await api.get(`/api/posts/?page=1`).then(res => {
          postData = res.data.data
      });
  } catch (error) {
      console.error('게시글 목록 정보 실패:', error);
      throw error;
  }
}
let page={lastPostListPage:0, page:0}
export default async function Page() {
   await getCalenderData();
   
  await getPostListData();
  return (
    <main className="flex w-full">
      <div className='w-full'>
        <div className='flex bg-deepBlue w-full rounded-lg mt-[50px] h-[50px] mb-[20px] text-semibold text-[16px] content-center items-center p-[10px] text-gray-500'>
        {IconLoudSpeaker('w-[20px] h-[20px] mr-[10px]', 'gray')}공지사항이 없습니다</div>
      <TodayCalendar calendarData={calendarData.data}/>
      <div className="flex text-[20px] text-pink font-bold items-center w-full h-[30px] mb-[10px]">
                    <img src="/IconFile.svg" className="mr-[5px]" />전체 게시물
                </div>
      <PostList page={page} baseUrl='' postListData={postData}/>
      </div>
    </main>
  );
};