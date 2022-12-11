import { PlusIcon } from '@heroicons/react/24/solid'
import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { createNewMemo } from '../../libs/superbase'
import { UserIdContext } from '../../pages'
import { failSawlOpt, successSwalOpt } from '../../utils/configs/sweetAlert'
import { SimpleModal as Modal } from '../shared/SimpleModal'

const swal = withReactContent(Swal)
const initFields = {
  title: '',
  text_content: '',
  userid: 0,
}

function CreateNewButton({ className, handleRefreshList }) {
  const [createBtnClicked, setCLick] = useState(false)
  const [fieldValue, setFieldValue] = useState(initFields)
  const userid = useContext(UserIdContext)
  const openModal = () => setCLick(true)
  const closeModal = () => setCLick(false)
  const onChangeField = e => {
    setFieldValue(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }
  const confirmCreate = async () => {
    const { status, error } = await createNewMemo({
      tableName: 'memos',
      dataToInsert: {
        title: fieldValue.title.replace(/\s/g, ''),
        text_content: fieldValue.text_content.trim(),
        userid,
      },
    })
    if (error) {
      swal.fire({
        ...failSawlOpt,
        title: error,
      })
    } else {
      const { isDismissed } = await swal.fire({
        ...successSwalOpt,
        title: status,
      })
      if (isDismissed) {
        closeModal()
        setFieldValue(initFields)
        // handleRefreshList()
      }
    }
  }
  return (
    <div className={className}>
      <button
        className='btn btn-outline btn-success'
        onClick={openModal}
      >
        <PlusIcon className='w-6 h-6' /> Create new note
      </button>

      <Modal
        title={'Create new memo'}
        isOpen={createBtnClicked}
        onClickExit={closeModal}
        confirmBtn
        cancelBtn
        confirmBtnText={'Confirm'}
        onConfirm={confirmCreate}
      >
        <div className='w-full flex flex-col gap-5'>
          <div className='form-control w-full'>
            <label className='label'>
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 label-text">
                Title ?
              </span>
            </label>
            <input
              type='text'
              placeholder='Type here...'
              className='input input-bordered w-full placeholder:italic placeholder:text-slate-400 placeholder:text-sm'
              autoComplete='off'
              required
              value={fieldValue.title}
              name='title'
              onChange={onChangeField}
            />
          </div>
          {/* Text content */}
          <div className='form-control w-full'>
            <label className='label'>
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 label-text">
                What are you going to write ?
              </span>
            </label>
            <textarea
              className='textarea textarea-bordered h-24 min-h24 placeholder:italic placeholder:text-slate-400 resize-none hover:resize-y'
              placeholder='Write something...'
              autoComplete='off'
              required
              value={fieldValue.content}
              name='text_content'
              onChange={onChangeField}
            ></textarea>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CreateNewButton
