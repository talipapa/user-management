import React from 'react'

const Table = ({users}) => {
  return (
    <div className="overflow-x-auto">
        {users.length > 0 ? (
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
                        users.length > 0 && users.map((user, id) => (
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
                                    <button className="btn btn-ghost btn-xs">Details</button>
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        ) : (
            <div>
                No user is found
            </div>
        )}
    </div>
  )
}

export default Table
