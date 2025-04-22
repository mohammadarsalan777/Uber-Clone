import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from './../../node_modules/axios/lib/axios';
import { userendpoint } from '../../utils/endpoint';
import { toast } from 'react-toastify';

const UserSignup = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = { firstname: firstname, lastname: lastname, email: email, password: password }

        try {
            await axios.post(`${userendpoint}/register`, formData).then((response) => {
                console.log(response.data)
                if (response.status === 201 || response.status === 200) {
                    toast.success(response.data.message)
                } else {
                    toast.success(response.data.message)
                }
            })
        } catch (error) {
            console.log(error)
            if (!error) {
                toast.error(error.response.data?.message || 'Something went wrong')
            }
            toast.error(error.response.data?.errors[0].msg)

        }

        // setEmail('')
        // setPassword('')
        // setFirstname('')
        // setLastname('')
    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <form onSubmit={submitHandler}>
                    <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber-logo" />
                    <h3 className='text-base mb-2'>What's your Name</h3>
                    <div className='flex gap-2'>
                        <input
                            type="text"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-sm outline-1 outline-[#10b461]'
                            placeholder="First name"
                            required

                        />

                        <input
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-sm outline-1 outline-[#10b461]'
                            placeholder="Last name"
                            required

                        />
                    </div>
                    <h3 className='text-base mb-2'>What's your Email</h3>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base outline-1 outline-[#10b461]'
                        placeholder="email@example.com"
                        required

                    />

                    <h3 className='text-base mb-2'>Enter your Password</h3>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base outline-1 outline-[#10b461]'
                        placeholder="Enter password"
                        required
                    />
                    <button
                        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'
                        type='submit'
                    >
                        Sign up
                    </button>
                    <p className='text-center'>Already have account? <Link to={'/user-login'} className='text-blue-600'>Log in here</Link></p>
                </form>
            </div>

            <div className='mt-4'>
                <p className='text-sm text-justify text-gray-500 '>
                    <input type="checkbox" className='h-3' /> <small>By signing up, you agree to Uber's <span className='text-blue-600'>Terms of Service</span> and <span className='text-blue-600'>Privacy Policy</span>. You also consent to receive calls or SMS messages, including by automated dialer, from Uber and others about your account, and rides at the number provided. I understand that I can opt out of receiving text messages at any time.
                    </small>
                </p>
            </div>
        </div>
    )
}

export default UserSignup
