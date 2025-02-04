'use server'

import { NextResponse } from "next/server";
import { validateToken } from "./lib/webToken";

const protectedRoutes = ["/profile"];
const publicRoutes = ["/register", "/login"];

export default async function middleware(req) {
    let tokenResponse = await validateToken(req.cookies.token);

    if (tokenResponse !== undefined){
        // Will redirect unauthenticated users to the register page if they try to access a protected route
        if (!tokenResponse && protectedRoutes.includes(req.nextUrl.pathname)) {
            const absoluteURL = new URL("/register", req.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString())
        }    

        // Will redirect authenticated users to the profile page if they try to access the login or register page while logged in
        if (tokenResponse && publicRoutes.includes(req.nextUrl.pathname)) {
            const absoluteURL = new URL("/profile", req.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString())
        }
    }
}