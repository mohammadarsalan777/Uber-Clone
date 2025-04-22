import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <div className='bg-cover bg-center bg-[url(public/UberHome.jpg)] h-screen w-full pt-8 flex justify-between flex-col bg-red-400'>
                <img className='w-16 ml-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber-logo" />
                <div className='bg-white px-3 py-3 pb-7'>
                    <h2 className='text-2xl text-center font-bold'>Get Started With Uber</h2>
                    <Link to={'/user-login'} className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
                </div>
            </div>
        </div>
    )
}

export default Home
