'use client'

import React from 'react'
import { registerUser } from './_action'
import Table from '../components/Table'
import TextInput from '../components/TextInput'
import { createToken } from '@/lib/webToken'

const page = () => {

    const [error, setError] = React.useState()
    
    const register = (e) => {
        e.preventDefault()
        setError()
        registerUser(e.target.first_name.value, e.target.last_name.value, e.target.email.value, e.target.password.value, e.target.confirm_password.value)
            .then((res) => {
                if (res.code === 200) {
                    // Redirect user to dashboard

                    setError()
                } else{
                    setError(res.result)
                }
            }).catch((err) => {
                console.log(err)
                // setError(err)
            })
    }

    return (
        <div className='w-full lg:w-[60%] rounded-3xl p-5'>
            <form onSubmit={register} className='w-full bg-slate-50 shadow-xl rounded-xl px-4 py-12'>
                <div className='mb-7 flex items-center justify-center tracking-wider'>
                    <h2 className='text-xl text-bold'>Register</h2>
                </div>
                <div className='px-12 w-full space-y-10'>
                    <div className='w-full flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-5'>
                        <TextInput error={error} placeholder='First name' inputName='first_name' inputType='text' />
                        <TextInput error={error} placeholder='Last name' inputName='last_name' inputType='text' />
    
                    </div>
                    <TextInput error={error} placeholder='Email' inputName='email' inputType='email' />
                    <TextInput error={error} placeholder='Password' inputName='password' inputType='password' />
                    <TextInput error={error} placeholder='Confirm Password' inputName='confirm_password' inputType='password' />
                    
        
                    <div className='pt-4 flex items-center justify-center'>
                        <button className="btn btn-primary text-slate-50 px-8">Register</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default page
