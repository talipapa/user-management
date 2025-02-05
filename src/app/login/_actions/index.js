'use server'
import { createToken } from "@/lib/webToken"
import User from "@/model/User"
import md5 from "md5"


async function loginUser(email, password) {
    const initializeUser = new User()
    let hasError = false
    let clientResult = []

    if (!email){
        hasError = true
        clientResult.push({
            errName: "email",
            message: "Email is required"
        })
    }
    if (!password){
        hasError = true
        clientResult.push({
            errName: "password",
            message: "Password is required"
        })
    }

    const result = await initializeUser.findByEmail(email)
    if (result === null){
        hasError = true
        clientResult.push({
            errName: "email",
            message: "User is not found"
        })
    }


    if (result && result.password !== md5(password)){
        hasError = true
        clientResult.push({
            errName: "password",
            message: "Password is incorrect"
        })
    }

    if (!hasError){
        const token = await createToken(result)
        return {
            code: 200,
            result: result,
            token: token
        }        
    } else {
        return {
            code: 500,
            result: clientResult
        }
    }
    
}

export {loginUser}

