import { createClient } from '@supabase/supabase-js'

const SUPERBASE_URL = 'https://htnhltrozikxzjvamuoc.supabase.co'

const SUPERBASE_KEY = process.env.SUPERBASE_API_KEY

const supabase = createClient(SUPERBASE_URL, SUPERBASE_KEY)

const createNewMemo = async ({ tableName, dataObj }) => {
  const { error, statusText } = await supabase.from(tableName).insert(dataObj)
  return {
    status: error ? error.message : statusText,
  }
}

export { createNewMemo }
