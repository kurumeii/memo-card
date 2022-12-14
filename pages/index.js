import { unstable_getServerSession } from 'next-auth/next'
import Head from 'next/head'
import { createContext, useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CreateNewButton from '../components/home/CreateNewButton'
import ListOfCards from '../components/home/ListOfCards'
import Navbar from '../components/home/Navbar'
import { fetchAllMemos, getUserInfo, initClient } from '../libs/superbase'

import { authOptions } from './api/auth/[...nextauth]'

const swal = withReactContent(Swal)

export const getServerSideProps = async context => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  if (!session)
    return {
      props: {
        data: [],
      },
    }
  const { supabaseAccessToken } = session
  initClient(supabaseAccessToken)

  const userInfoRes = await getUserInfo({
    tableName: 'users',
    email: session.user.email,
  })
  const memos = await fetchAllMemos({
    tableName: 'memos',
    userid: userInfoRes.data[0].id,
  })

  return {
    props: {
      token: supabaseAccessToken,
      data: memos.error ? [] : memos.data,
      userid: userInfoRes.data[0].id,
    },
  }
}
export const UserContext = createContext()

export default function Home({ token, data, userid }) {
  const [list, setList] = useState(data)

  useEffect(() => {
    if (!token) return
    const supabase = initClient(token)
    supabase
      .channel('tr_check_filters')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'memos' }, payload => {
        if (payload.eventType === 'INSERT') {
          setList(prev => [...prev, payload.new])
        }
        if (payload.eventType === 'UPDATE') {
          setList(prev => {
            let newList = [...prev]
            newList.splice(
              newList.findIndex(v => v.id === payload.old.id),
              1,
              payload.new
            )
            return newList
          })
        }
        if (payload.eventType === 'DELETE') {
          setList(prev => {
            let newList = [...prev]
            newList.splice(
              newList.findIndex(v => v.id === payload.old.id),
              1
            )
            return newList
          })
        }
      })
      .subscribe()

    return () => {
      supabase.removeAllChannels()
    }
  }, [token])

  return (
    <UserContext.Provider value={userid}>
      <div className='min-h-screen h-full w-full bg-base-100 overflow-hidden'>
        <Head>
          <title>Memory Note</title>
          <link
            rel='icon'
            href='/favicon.ico'
          />
        </Head>
        <Navbar />
        <div className='px-10'>
          {list.length !== 0 && <CreateNewButton className={'flex justify-start w-full py-4'} />}
          <ListOfCards
            className={'flex flex-1 justify-start flex-col w-full'}
            list={list}
          />
        </div>
      </div>
    </UserContext.Provider>
  )
}
