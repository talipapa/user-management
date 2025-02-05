import { format } from 'date-fns'
import React, { useEffect } from 'react'
import TextInput from '../../../components/TextInput'
import { IoMdClose } from 'react-icons/io'
import ControlledTextInput from '@/app/components/ControlledTextInput'
import { useRouter } from 'next/navigation'
import { updateUserAccount } from '../../_action/_admin/action';

const UpdateModal = ({modalId, additionalClassName, user}) => {
    const router = useRouter()

    const [error, setError] = React.useState()
    const [generatedPassword, setGeneratedPassword] = React.useState('')

    const randomizePassword = () => {
      const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$";
      let result = "";
      for (let i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      setGeneratedPassword(result);
    }

    const updateUser = (e) => {
      e.preventDefault()
      setError()
      updateUserAccount(user._id, e.target.first_name.value, e.target.last_name.value, e.target.email.value, e.target.password.value)
          .then((res) => {
              if (res.code === 200) {
                  document.getElementById(modalId).close()
                  router.refresh()
                  setError()
                } else{
                  setError(res.result)
              }
          }).catch((err) => {
          }).finally(() => {
            e.target.reset()
            setGeneratedPassword('')
          })
    }

    
    return (
      <>
        <dialog id={modalId} className={`modal ${additionalClassName}`}>
          <div className="modal-box w-11/12 max-w-5xl">
              <div className='flex items-center justify-between'>
                <h3 className="font-bold text-lg">Update user account</h3>
                <form method="dialog">
                    <button className="btn"><IoMdClose/></button>
                </form>
              </div>
              
              <p className="text-slate-400">Press ESC key or click the button below to close</p>

              {
                user && (
                <form onSubmit={updateUser} className="modal-body mt-8 flex flex-col space-y-6 items-start">
                  <div className='w-full space-y-10'>
                      <div className='w-full flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-5'>
                        
                          <TextInput error={error} placeholder='First name' inputName='first_name' inputType='text'/>
                          <TextInput error={error} placeholder='Last name' inputName='last_name' inputType='text'/>
      
                      </div>
                      <TextInput error={error} placeholder='Email' inputName='email' inputType='email'/>
                      <div className='flex flex-row items-center space-x-6'>

                        <ControlledTextInput error={error} placeholder='Password' inputName='password' inputType='text' value={generatedPassword} onChange={(e) => setGeneratedPassword(e.target.value)} />
                        <button onClick={() => randomizePassword()} className='btn btn-secondary' type='button'>
                          Generate
                        </button> 
                      </div>

                    </div>
                  <button className="btn btn-primary text-slate-50 px-4">Update user</button>
                </form>
                )
              }

          </div>
        </dialog>
      </>
    )
}

export default UpdateModal
