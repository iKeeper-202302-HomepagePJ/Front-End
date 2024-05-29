import Header from "../ComponentsHeader";

export default function HeaderLayout({
    children,
}: {children: React.ReactNode}) {
    return (
        <main className="w-full h-auto">
            <Header/>
            {children}
        </main>
    )
}