import { format } from 'date-fns'
import React from 'react'

const ChangePassModal = ({modalId, additionalClassName, user}) => {
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
              <div className="modal-body mt-3 flex flex-col space-y-4">
                Change password modal           
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

export default ChangePassModal
