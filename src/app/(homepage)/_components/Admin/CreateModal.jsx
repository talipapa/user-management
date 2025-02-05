import { format } from 'date-fns'
import React, { useEffect } from 'react'
import TextInput from '../../../components/TextInput'
import { IoMdClose } from 'react-icons/io'
import {createUser} from '../../_action/_admin/action'
import { RiAiGenerate } from "react-icons/ri";
import * as dateFns from 'date-fns'
import ControlledTextInput from '@/app/components/ControlledTextInput'
import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'

const CreateModal = ({modalId, additionalClassName, user}) => {
    const router = useRouter()

    const [error, setError] = React.useState()

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [generatedPassword, setGeneratedPassword] = React.useState(`${firstName}${lastName}${dateFns.format(new Date(), 'MMMdd')}@Creciendo`)

    const passwordGenerator = (fieldName, fieldValue) => {
      if (fieldName === 'first_name') {
        setFirstName(fieldValue)
      }
      if (fieldName === 'last_name') {
        setLastName(fieldValue)
      }
    }
    
    useEffect(() => {
      setGeneratedPassword(`${firstName}${lastName}${dateFns.format(new Date(), 'MMMdd')}@Creciendo`)
    }, [firstName, lastName])

    const randomizePassword = () => {
      const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$";
      let result = "";
      for (let i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      setGeneratedPassword(result);
    }

    const register = (e) => {
      e.preventDefault()
      setError()
      // is generated, name, email, password, confirm_password
      createUser(e.target.first_name.value, e.target.last_name.value, e.target.email.value, e.target.password.value)
          .then((res) => {
              if (res.code === 200) {
                  document.getElementById(modalId).close()
                  e.target.reset()
                  router.refresh()
                  setGeneratedPassword('')
                  setError()
              } else{
                  setError(res.result)
              }
          }).catch((err) => {

              console.log("Flag createmodal.jsx")
          })
    }

    return (
      <>
        <dialog id={modalId} className={`modal ${additionalClassName}`}>
          <div className="modal-box w-11/12 max-w-5xl">
              <div className='flex items-center justify-between'>
                <h3 className="font-bold text-lg">Create user account</h3>
                <form method="dialog">
                    <button className="btn"><IoMdClose/></button>
                </form>
              </div>
              
              <p className="text-slate-400">Press ESC key or click the button below to close</p>

              <form onSubmit={register} className="modal-body mt-8 flex flex-col space-y-6 items-start">
                <div className='w-full space-y-10'>
                    <div className='w-full flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-5'>
                      
                        <TextInput error={error} placeholder='First name' inputName='first_name' inputType='text' value={firstName} onChange={(e) => passwordGenerator('first_name', e.target.value)} />
                        <TextInput error={error} placeholder='Last name' inputName='last_name' inputType='text' value={lastName} onChange={(e) => passwordGenerator('last_name', e.target.value)} />
    
                    </div>
                    <TextInput error={error} placeholder='Email' inputName='email' inputType='email' />
                    <div className='flex flex-row items-center space-x-6'>

                      <ControlledTextInput error={error} placeholder='Password' inputName='password' inputType='text' value={generatedPassword} onChange={(e) => setGeneratedPassword(e.target.value)} />
                      <button onClick={() => randomizePassword()} className='btn btn-secondary' type='button'>
                        Generate
                      </button> 
                    </div>

                  </div>
                <button className="btn btn-primary text-slate-50 px-8 ">Create user</button>
              </form>

          </div>
        </dialog>
      </>
    )
}

export default CreateModal
