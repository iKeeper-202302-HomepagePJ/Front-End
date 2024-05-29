import axios from "axios";
import { useRouter } from 'next/navigation';
import { clearToken } from "./redux/userSlice";
async function getUserData() {
    try {
        let userData = (await axios.get('https://4a26c935-10b4-4195-a293-2e78b6965b48.mock.pstmn.io/api/userdata')).data;
        //console.log(userData)
        return userData;
    } catch (error) {
        console.error(error);
        throw error; // 에러를 다시 throw하여 에러 처리 가능하도록 함
    }
};

export default async function ProfileInformation() {
    const userData: any = await getUserData();
    console.log(userData.id);
    return (
        <div className="w-full h-full text-[20px] bg-red">
            {userData.id}
            {userData.name}
        </div>
    );
}