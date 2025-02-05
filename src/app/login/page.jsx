'use client'

import React from 'react'
import { loginUser } from './_actions'
import TextInput from '../components/TextInput'
import { useRouter } from 'next/navigation'
const page = () => {
    const router = useRouter()

    const [error, setError] = React.useState()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError()
        loginUser(e.target.email.value, e.target.password.value)
            .then((res) => {
                if (res.code === 200) {
                    router.push('/')
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
            <form onSubmit={handleSubmit} className='w-full bg-slate-50 shadow-xl rounded-xl px-4 py-12'>
                <div className='mb-7 flex items-center justify-center tracking-wider'>
                    <h2 className='text-xl text-bold'>Login</h2>
                </div>
                <div className='px-12 w-full space-y-10'>

                    <TextInput error={error} placeholder='Email' inputName='email' inputType='email' />
                    <TextInput error={error} placeholder='Password' inputName='password' inputType='password' />
                    

                    <div className='pt-4 flex items-center justify-center'>
                        <button className="btn btn-primary text-slate-50 px-8">Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default page
