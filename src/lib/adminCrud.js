'use server'
import User from "@/model/User"

async function viewUser(id){
    const initializeUser = new User()
    const result = await initializeUser.findById(id)
    return result
}

export { viewUser }