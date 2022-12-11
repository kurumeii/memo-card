import { MagnifyingGlassIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import cn from 'classnames'
function Navbar() {
  const { data: session, status } = useSession()
  const [clicked, setClicked] = useState(false)
  return (
    <>
      {/* Navbar */}
      <div className='navbar bg-base-300 w-full min-h-20 h-24 sticky top-0 z-20'>
        <div className='navbar-start'>
          <div className='hidden md:block normal-case text-2xl font-semibold ml-5'>Memo Note</div>
          <button
            className='md:hidden btn btn-ghost'
            onClick={() => setClicked(prev => !prev)}
          >
            <Bars3Icon className='w-7 h-7' />
          </button>
        </div>
        <div className='hidden md:flex navbar-center'>
          <div className='input-group'>
            <input
              type='text'
              className='input input-bordered'
              placeholder='Search...'
              autoComplete='off'
            />
            <button className='btn btn-square'>
              <MagnifyingGlassIcon className='w-6 h-6' />
            </button>
          </div>
        </div>
        <div className='hidden md:flex navbar-end'>
          {session ? (
            <div className='dropdown dropdown-end'>
              <label
                tabIndex={0}
                className='btn btn-ghost btn-circle avatar'
              >
                <div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 relative'>
                  <Image
                    src={session.user.image}
                    alt='avatar'
                    fill
                    sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
              >
                <li>
                  <button
                    className='btn'
                    onClick={() => signOut()}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className='btn btn-ghost btn-circle'
              onClick={() => signIn()}
            >
              <UserIcon className='w-7 h-7' />
            </button>
          )}
        </div>
      </div>

      {/* Side drawer */}
      <div
        className={cn(
          'fixed top-0 bottom-0 w-full h-screen bg-base-300 -inset-x-full transition-transform overflow-hidden overscroll-contain z-30 p-14 flex flex-1 flex-col gap-y-10',
          clicked && 'translate-x-full'
        )}
      >
        <div className='flex justify-end'>
          <button
            className='btn btn-ghost btn-circle'
            onClick={() => setClicked(prev => !prev)}
          >
            <XMarkIcon className='w-10 h-10' />
          </button>
        </div>
        <ul className='menu p-4 w-full'>
          <li>
            <div>Create new</div>
          </li>
        </ul>

        {session ? (
          <div className='avatar justify-end flex-1 items-center flex-col gap-5'>
            <div className='w-20 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2 relative'>
              <Image
                src={session.user.image}
                alt='avatar'
                fill
                sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
              />
            </div>
            <span className='font-semibold text-xl'>Hello {session.user.name}</span>
            <button
              className='btn btn-wide btn-outline btn-error'
              onClick={() => signOut()}
            >
              Logout ?
            </button>
          </div>
        ) : (
          <div className='flex justify-center flex-1 items-end'>
            <button
              className='btn btn-ghost btn-wide btn-lg'
              onClick={() => signIn()}
            >
              <UserIcon className='w-10 h-10' />
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar
