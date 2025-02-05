'use server'
import Link from 'next/link'
import { getUser, logout } from '@/lib/session'
import { redirect } from 'next/navigation'


const NavigationBar = async () => {
    const user = await getUser()


    if (user) {
        return (
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost text-xl">User Manager</Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-2">
                        <div className='menu menu-horizontal'>
                            <li><a href="/">User list</a></li>
                            
                        </div>
                        <div className='menu menu-horizontal'>
                            <li>
                                <Link href="/profile">Welcome! {user.first_name}</Link>
                            </li>
                            <li>
                                <form action={logout}>
                                    <button type="submit">Logout</button>
                                </form>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }

  return (
    <div className="navbar bg-base-100">
        <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl">User Manager</Link>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-2">
                <div className='menu menu-horizontal'>
                    <li><Link href="/">User list</Link></li>
                </div>

                <div className='menu menu-horizontal'>
                    <li>
                        <Link href="/login">Sign-In</Link>
                    </li>
                    <li>
                        <Link href="/register">Sign-Up</Link>
                    </li>
                </div>
            </ul>
        </div>
    </div>
  )
}

export default NavigationBar
