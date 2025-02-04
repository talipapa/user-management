'use server'
import User from "@/model/User"

const fetchUsers = async () => {
    const initializeUser = new User()    
    const result = await initializeUser.find()
    return result 
}

export {fetchUsers}