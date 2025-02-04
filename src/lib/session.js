'use server'

import * as jose from 'jose';
import { cookies } from 'next/headers';

const getUser = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    try {
        const result = await jose.jwtVerify(token.value, new TextEncoder().encode(process.env.TOKEN_SECRET))
        return result.payload
    } catch (error) {
        cookieStore.delete('token')
        return null
    }
}

export {getUser}