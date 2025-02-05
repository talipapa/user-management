'use server'
import { createToken } from "@/lib/webToken"
import User from "@/model/User"
import md5 from "md5"

const initializeUser = new User()

async function createUser(first_name, last_name, email, password) {
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

    const emailResult = await initializeUser.findByEmail(email)
    if (emailResult !== null){
        hasError = true
        clientResult.push({
            errName: "email",
            message: "Email already exists"
        })
    }



    if (!password){
        hasError = true
        clientResult.push({
            errName: "password",
            message: "Password is required"
        })
    }
    
    

    if (!hasError){
        const result = await initializeUser.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: md5(password)
        })
        return {
            code: 200,
            result: result,
        }        
    } else {
        return {
            code: 500,
            result: clientResult
        }
    }
    
}

async function deleteUser(id){
    const result = await initializeUser.delete(id)
    return {
        status: 200,
        message: "User deleted successfully"
    }
}

async function updateUserAccount(id, first_name, last_name, email, password){
    // Validate
    let hasError = false
    let clientResult = []

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

    const emailResult = await initializeUser.findByEmail(email)
    if (emailResult !== null){
        hasError = true
        clientResult.push({
            errName: "email",
            message: "Email already exists"
        })
    }

    if (!hasError){
        let result
        if (password !== "" || password !== null || password !== undefined){
            const result = await initializeUser.update(id, true, {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: password

                })
            } else{
            const result = await initializeUser.update(id, false, {
                first_name: first_name,
                last_name: last_name,
                email: email
            })
        }

        return {
            code: 200,
            result: result,
        }        
    } else {
        return {
            code: 500,
            result: clientResult
        }
    }
}

export { createUser, deleteUser, updateUserAccount }
