import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

function Welcome({ className }) {
  const { data: session, status } = useSession()

  return (
    <div className={className}>
      Hello {status === 'authenticated' ? session.user.name : 'Anonymus'}, {''}
      {session ? (
        <div
          className='cursor-pointer'
          onClick={() => signOut()}
        >
          <span className='text-primary'>Log out ?</span>
        </div>
      ) : (
        <div
          className='cursor-pointer'
          onClick={() => signIn()}
        >
          <span className='text-primary'>Sign in ?</span>
        </div>
      )}
    </div>
  )
}

export default Welcome
