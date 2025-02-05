'use client'

import React from 'react'
import ViewModal from './ViewModal'
import { viewUser } from '@/lib/adminCrud'
import { IoMdMore } from "react-icons/io";
import UpdateModal from '../(homepage)/_components/Admin/UpdateModal';
import ChangePassModal from '../(homepage)/_components/Admin/ChangePassModal';
import DeleteModal from '../(homepage)/_components/Admin/DeleteModal';


const Table = ({users, currentUser}) => {
    const [selectedUser, setSelectedUser] = React.useState(null)
    const selectUser = (user, userAction) => {
        viewUser(user._id).then((res) => {
            setSelectedUser(res)
        }).catch((err) => {
            console.error("Table.jsx flag")
        })
        switch (userAction) {
            case "view":
                document.getElementById('showUser').showModal()
                break;
            case "update":
                document.getElementById('updateUser').showModal()
                break;
            case "change-password":
                document.getElementById('changePassword').showModal()
                break;

            case "delete":
                document.getElementById('deleteUser').showModal()
                break;
            default:
                break;
        }
    }

    return (
        <>
            {users.length > 0 && (
                <div className='bg-slate-50 lg:shadow-xl lg:rounded-3xl px-8 py-6'>
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Profile</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, id) => (
                                    <tr key={id}>
                                        <td>                  
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                        src={`https://ui-avatars.com/api?background=random&name=${user.first_name}+${user.last_name}`}
                                                        alt="User image" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>                  
                                            <div className="flex items-center gap-3">        
                                                <div>
                                                    <div className="font-bold">{user.first_name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>                  
                                            <div className="flex items-center gap-3">        
                                                <div>
                                                    <div className="font-bold">{user.last_name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='font-bold'>{user.email}</div>
                                        </td>
                                        <th>
                                        <div className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn text-2xl"><IoMdMore/></div>
                                            <ul tabIndex={0} className="dropdown-content menu bg-slate-600 text-white rounded-box  w-52 p-2 z-[100] shadow">
                                                <li onClick={() => selectUser(user, 'view')}><a>View account</a></li>
                                                {currentUser?.role === "admin" && (
                                                    <>
                                                        <li onClick={() => selectUser(user, 'update')}><a>Update account</a></li>
                                    
                                                    </>
                                                )}
                                                {currentUser?.role === "admin" && currentUser?.id !== user._id && (
                                                    <li onClick={() => selectUser(user, 'delete')}><a>Delete account</a></li>
                                                )
                                                }
                                            </ul>
                                        </div>
                                        </th>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )}

            <ViewModal modalId="showUser" additionalClassName="modal-lg" user={selectedUser}/>
            <UpdateModal modalId="updateUser" additionalClassName="modal-lg" user={selectedUser}/>
            <ChangePassModal modalId="changePassword" additionalClassName="modal-lg" user={selectedUser}/>
            <DeleteModal modalId="deleteUser" additionalClassName="modal-lg" user={selectedUser}/>            
        </>
    )
}

export default Table
