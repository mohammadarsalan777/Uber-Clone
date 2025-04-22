import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const submitHandler = (e) => {
        e.preventDefault()
        const formData = { email: email, password: password }
        console.log(formData)
        setEmail('')
        setPassword('')
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <form onSubmit={submitHandler}>
                    <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber-logo" />
                    <h3 className='text-xl mb-2'>What's your Email</h3>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base outline-1 outline-[#10b461]'
                        placeholder="email@example.com"
                        required

                    />

                    <h3 className='text-xl mb-2'>Enter Password</h3>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base outline-1 outline-[#10b461]'
                        placeholder="Enter password"
                        required
                    />
                    <button
                        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'
                        type='submit'
                    >
                        Login
                    </button>
                    <p className='text-center'>New here? <Link to={'/user-signup'} className='text-blue-600'>Create an Account</Link></p>
                </form>
            </div>
            <div>
                <Link to={'/captain-login'}>
                    <button
                        className='bg-[#10b461] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base '
                    >Sign in as Captain
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default UserLogin
