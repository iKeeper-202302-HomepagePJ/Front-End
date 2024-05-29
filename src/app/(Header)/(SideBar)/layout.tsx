import ProfileInformation from "@/app/ComponentProfile";
import SideBar from "../../ComponentSideBar";

export default async function HeaderLayout({
    children,
}: {children: React.ReactNode}) {
    return (
        <main className="w-full h-auto flex">
            {children}
            <SideBar/>
        </main>
    )
}