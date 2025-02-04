'use server'
import { createToken } from "@/lib/webToken"
import User from "@/model/User"
import md5 from "md5"
import { cookies } from "next/headers"

const registerUser = async(first_name, last_name, email, password, confirm_password) => {
    const initializeUser = new User()
    let hasError = false
    let clientResult = []

    // Validate
    if (!first_name){
        hasError = true
        clientResult.push({
            errName: "first_name",
            message: "First name is required"
        })
    }
    if (!last_name){
        hasError = true
        clientResult.push({
            errName: "last_name",
            message: "Last name is required"
        })
       
    }
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
    if (!confirm_password){
        hasError = true
        clientResult.push({
            errName: "confirm_password",
            message: "Confirm password is required"
        })
    }

    if (password !== confirm_password){
        hasError = true
        clientResult.push({
            errName: "confirm_password",
            message: "Passwords do not match"
        })
    }
    
    const result = await initializeUser.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: md5(confirm_password)
    })

    const token = await createToken(result)
    

    
    if (!hasError){
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

export {registerUser}

