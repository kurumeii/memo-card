import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const initClient = supabaseAccessToken => {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
  })
  return supabase
}

/**
 *
 * @param {tableName} tableName
 * Table name
 * @param {dataToInsert} dataToInsert
 * An array contains an object which of all exact name of column from superbase
 * @returns Object { status: string, error: string}
 */
const createNewMemo = async ({ tableName, dataToInsert }) => {
  const { error, statusText } = await supabase.from(tableName).insert([dataToInsert])

  return {
    status: statusText,
    error: error?.message,
  }
}

/**
 *
 * @param {tableName} tableName
 * Table name
 * @param {userid} userid
 * The current userid
 * @returns Object { status: String, error: string, data: Array}
 */
const fetchAllMemos = async ({ tableName, userid }) => {
  const { data, error, statusText } = await supabase.from(tableName).select().eq('userid', userid)
  return {
    status: statusText,
    error: error?.message,
    data,
  }
}

const getUserInfo = async ({ tableName, email }) => {
  const { data, error } = await supabase.from(tableName).select().eq('email', email)
  return {
    error: error?.message,
    data,
  }
}

export { initClient, createNewMemo, fetchAllMemos, getUserInfo }
