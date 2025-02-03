import Link from 'next/link'
import React from 'react'

const NavigationBar = () => {
  return (
    <div className="navbar bg-base-100">
        <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl">User manager</Link>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-2">
                <div className='menu menu-horizontal'>
                    <li><Link href="/">User list</Link></li>
                </div>

                <div className='menu menu-horizontal'>
                    <li>
                        <a>Sign-In</a>
                    </li>
                    <li>
                        <a>Sign-Up</a>
                    </li>
                </div>
            </ul>
        </div>
    </div>
  )
}

export default NavigationBar
