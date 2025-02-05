'use server'

import Token from '@/model/Token';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import * as jose from 'jose';

async function createToken(user) {
    const initializeWebToken = new Token();
    const cookieStore = await cookies();

    const token = await new jose.SignJWT({
        id: user._id,
        role: user.user_role,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
    })
    .setProtectedHeader({ alg: 'HS256' })
    .sign(new TextEncoder().encode(process.env.TOKEN_SECRET));

    const javaToken = jose.decodeJwt(token)
    
    initializeWebToken.create(javaToken.id)
    cookieStore.set('token', token)

    return token;    
}

async function validateToken() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    
    if (token === undefined) {
        return false
    }
    try {
        await jose.jwtVerify(token.value, new TextEncoder().encode(process.env.TOKEN_SECRET))
        return true
    } catch (err) {
        return false
    }
}

export {createToken, validateToken}