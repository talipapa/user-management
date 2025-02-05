'use client'

import React from 'react'
import Image from "next/image";
import CreateModal from '@/app/(homepage)/_components/Admin/CreateModal';
import Table from '@/app/components/Table';


const ClientWrapper = ({users, currentUser}) => {
  const showCreateModal = () => {
    document.getElementById('createUser').showModal()

  }
  
  return (
    <>
      <div className="w-full lg:w-[70%] space-y-5">  
        {
          currentUser && currentUser.role === "admin" ? (
            <button onClick={() => showCreateModal()} className="btn btn-active btn-accent text-white">Create account</button>
          ) : null
        }
        <Table users={users} currentUser={currentUser ? currentUser : null}/>
      </div>


      <CreateModal modalId="createUser" additionalClassName="modal-lg"/>     
      
    </>
  )
}

export default ClientWrapper
