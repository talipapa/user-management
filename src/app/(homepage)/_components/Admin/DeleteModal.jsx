import React, { useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useRouter } from 'next/navigation'
import { deleteUser } from '../../_action/_admin/action'

const DeleteModal = ({modalId, additionalClassName, user}) => {
    const router = useRouter()

    const [error, setError] = React.useState()

    const register = (e) => {
      e.preventDefault()
      setError()
      deleteUser(user._id)
          .then((res) => {
            console.log(res)
              if (res.status === 200) {
                  document.getElementById(modalId).close()
                  e.target.reset()
                  router.refresh()
                  setError()
              } else{
                  setError(res.result)
              }
          }).catch((err) => {
              console.log(err)
          })
    }

    return (
      <>
        <dialog id={modalId} className={`modal ${additionalClassName}`}>
          <div className="modal-box w-11/12 max-w-5xl">
              <div className='flex items-center justify-between'>
                <h3 className="font-bold text-lg">Are you sure?</h3>
                <form method="dialog">
                    <button className="btn"><IoMdClose/></button>
                </form>
              </div>
              
              <p className="text-slate-400">Changes won't be reversible</p>

              <form onSubmit={register} className="modal-body mt-8 flex flex-col space-y-6 items-start">
                <button className="btn bg-red-600 hover:bg-red-400 text-slate-50 px-8 ">Delete User</button>
              </form>

          </div>
        </dialog>
      </>
    )
}

export default DeleteModal
