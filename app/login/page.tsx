import React from 'react'
import SignInButton from '../_components/SignInButton'
import type { Metadata } from 'next';

export const metadata : Metadata = {
  title : "Login"
}

function page() {
  return (
    <div className='text-lg text-white/70 flex flex-col gap-5 items-center h-screen justify-center'>
        <h2>Sign in to access your guest area</h2>
        <SignInButton/>
    </div>
  )
}

export default page