import { format } from 'date-fns'
import React from 'react'

const ViewModal = ({modalId, additionalClassName, user}) => {
  return (
    <dialog id={modalId} className={`modal ${additionalClassName}`}>
      <div className="modal-box">
          <h3 className="font-bold text-lg">User details</h3>
          <p className="text-slate-400">Press ESC key or click the button below to close</p>

          {!user ? (
            <div className="modal-body mt-3 flex flex-col space-y-4">
              Loading....
            </div>
          ) : (
            <div className="modal-body mt-3 flex flex-col space-y-4">
              <div className="flex items-center gap-3">
                <img src={`https://ui-avatars.com/api?background=random&name=${user.first_name}+${user.last_name}`}alt="User image" />
              </div>

              <div className='space-y-2'>
                <div className='flex items-center gap-3'>
                  <span>User perm</span>  
                  <span className={`border-l-2 capitalize ${user.user_role === "admin" ? "border-red-600" : "border-green-400" } bg-slate-200 px-2`}>{user.user_role}</span>
                </div>
                <div className='flex items-center gap-3'>
                  <span>First name</span>  
                  <span className='border-l-2 border-blue-900  bg-slate-200 px-2'>{user.first_name}</span>  
                </div>  
                <div className='flex items-center gap-3'>
                  <span>Last name</span>  
                  <span className='border-l-2 border-blue-900  bg-slate-200 px-2'>{user.last_name}</span>  
                </div>
                <div className='flex items-center gap-3'>
                  <span>Email</span>  
                  <span className='border-l-2 border-blue-900  bg-slate-200 px-2'>{user.email}</span>
                </div>
                <div className='flex items-center gap-3'>
                  <span>Joined at</span>  
                  <span className='border-l-2 border-blue-900  bg-slate-200 px-2'>{format(user.createdAt, "PPpp")}</span>
                </div>
                <div className='flex items-center gap-3'>
                  <span>Updated at</span>  
                  <span className='border-l-2 border-blue-900  bg-slate-200 px-2'>{format(user.updatedAt, "PPpp")}</span>
                </div>

              </div>              
            </div>
          )}

          
          <div className="modal-action">
          <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
          </form>
          </div>
      </div>
    </dialog>
  )
}

export default ViewModal
