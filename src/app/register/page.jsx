'use client'

import React from 'react'
import { registerUser } from './_action'
import Table from '../components/Table'

const page = () => {
    
   const register = async () => {
        const res = await registerUser("324", "34534b5", "4b34534b56", 324)
        if (!res.ok){
            console.log(res)
        }
    }

    return (
        <div className='w-[70%] rounded-3xl p-5'>
            <Table/>
        </div>
    )
}

export default page
