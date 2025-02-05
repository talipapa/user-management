'use server'

import Token from '@/model/Token';
import * as jose from 'jose';
import { cookies } from 'next/headers';

async function getUser() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    try {
        const result = await jose.jwtVerify(token.value, new TextEncoder().encode(process.env.TOKEN_SECRET))
        return result.payload
    } catch (error) {
        return null
    }
}

async function logout() {
    const initializeToken = new Token()
    const cookieStore = await cookies()
    const tempCookie = cookieStore.get('token').value
    cookieStore.delete('token')
    initializeToken.delete(await jose.decodeJwt(tempCookie).id)
}

export {getUser, logout}