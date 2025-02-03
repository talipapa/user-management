'use server'
import User from "@/model/User"
import md5 from "md5"
import { cookies } from "next/headers"

const registerUser = async(first_name, last_name, email, password) => {
    const initializeUser = new User()
    if (!first_name){
        return "First name is required"
    }
    if (!last_name){
        return "Last name is required"
    }
    if (!email){
        return "Email is required"
    }
    if (!password){
        return "Password is required"
    }
    
    const result = await initializeUser.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: md5(password)
    })

    const cookieStore = await cookies()
    cookieStore.set("user_name", `${first_name} ${last_name}`)
    

    return result
    
}

export {registerUser}

