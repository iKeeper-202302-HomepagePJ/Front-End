'use client'

import { useState } from "react";

function PageMove(page: number, lastPostListPage: number, setPage: string) {
    const startPage = Math.floor((page-1) / 10) * 10 + 1;
    const lastPage = startPage+9 > lastPostListPage ? lastPostListPage : startPage+9;
    const pageButtonBox = "h-[30px] bg-deepBlue rounded-lg text-white text-center";
    return (
        <div className="w-fit h-auto text-[20px] font-bold flex space-x-[10px]">
            {startPage != 1 && <a className={`w-[70px] ${pageButtonBox}`} href={`${setPage}/${startPage-10}`}>{`<이전`}</a>}
            {Array.from({ length: page - startPage }, (_, i) => (
                <a className={`w-[30px] ${pageButtonBox}`} href={`${setPage}/${i + startPage}`}>
                    {i + startPage}
                </a>
            ))}
            <a className={`w-[30px] h-[30px] bg-skyblue rounded-lg text-deepBlue text-[20px] text-center `} href={`${setPage}/${page}`}>
                {page}
            </a>
            {Array.from({ length: lastPage - page }, (_, i) => (
                <a className={`w-[30px] ${pageButtonBox}`} href={`${setPage}/${i + page + 1}`}>
                    {i + page + 1}
                </a>
            ))}
            {lastPage != lastPostListPage && <a className={`w-[70px] ${pageButtonBox}`} href={`${setPage}/${startPage+10}`}>{`다음>`}</a>}
        </div>
    )
}

export { PageMove }