"use client"
import { NextRequest, NextResponse } from 'next/server';
import { useDispatch, useSelector } from "react-redux";
import { setToken, clearToken, setInfo, } from './app/redux/userSlice';
import { RootState, store } from './app/redux/store';
import { Middleware } from 'redux';
import { useRouter } from "next/router";
const excludePatterns = [
    /\.(ico|svg|png|jpg|jpeg|woff|woff2|eot|ttf|otf)$/
  ];
  
export function middleware(req: NextRequest) {
    const authList = [null, "ROLE_USER", "ROLE_ADMIN"];

    const state: RootState = store.getState();
    const auth = state.user.auth;
    const acceptHeader = req.headers.get('accept') || '';
    if (!acceptHeader.includes('text/html') && !acceptHeader.includes('application/json')) {
        return NextResponse.next();
    }
    const { pathname } = req.nextUrl;
    console.log("작동", pathname);
    if(pathname.startsWith('/admin') || pathname.startsWith('/writeTodoPopup')){
        //return NextResponse.rewrite(new URL('/404', req.url));
    }
    if (auth == null) {
        console.log("조건", pathname);
        //return NextResponse.redirect(new URL('/restrictedPage', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!postList)(?!calendar)(?!restricted).+)",],
};