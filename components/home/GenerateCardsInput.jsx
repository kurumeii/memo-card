import React, { useState } from 'react'
import { DocumentPlusIcon } from '@heroicons/react/24/solid'
function GenerateCardsInput({ className }) {
  const [initValue, setInitValue] = useState('')
  return (
    <div className={className}>
      <div className='form-control'>
        <div className='input-group'>
          <input
            type='text'
            placeholder='What do you want to note'
            className='input input-bordered'
            autoComplete='off'
            value={initValue}
            onChange={e => setInitValue(e.target.value.trim())}
          />
          <button className='btn btn-square btn-outline btn-primary'>
            <DocumentPlusIcon className='w-6 h-6' />
          </button>
        </div>
        <div className='grid gap-10'></div>
      </div>
    </div>
  )
}

export default GenerateCardsInput
