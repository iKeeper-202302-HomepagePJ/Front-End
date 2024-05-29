import WritePost from "./ComponentWrtiePost";

const category = "2024-1 개발세미나";
const categoryList = ["2024-1 개발세미나", "2024-2 개발세미나", "asdf;sdjf iej;skd jfies;djfi3i3i "]
const headline = "가나다";
const headlineList = ["rkskek", "ㅁ나이라넝ㄹ", "다자잦다다", "1회차", "최대이십글자더라가나다라마바다사아다바마"]
interface post {
    "category": {
      "categoryLarge": {
        "id": number
      },
      "categorySmall": {
        "id": number
      } 
    },
    "content": string
    "disclosure": boolean,
    "headline": {
      "id": number
    },
    "title": string
  }
export default async function Page() {
    return (
        <main className="min-h-screen">
            <WritePost />
        </main >
    );
};

export {category, categoryList, headline, headlineList}