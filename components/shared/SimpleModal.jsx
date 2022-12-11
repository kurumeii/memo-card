import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

SimpleModal.propTypes = {
  /**Name of title*/
  title: PropTypes.string,
  /**Backdrop should exit or not*/
  backdrop: PropTypes.bool,
  /** State of modal */
  isOpen: PropTypes.bool,
  /**Function to exit modal**/
  onClickExit: PropTypes.func,
  /**Should the confirm button be rendered**/
  confirmBtn: PropTypes.bool,
  /**The text of the confirm button, only when confirmBtn set to true**/
  confirmBtnText: PropTypes.string,
  /** Should the confirm button be rendered  */
  cancelBtn: PropTypes.bool,
  /** Function which confirm button to handle */
  onConfirm: PropTypes.func,
}

function SimpleModal(props) {
  const {
    title,
    backdrop,
    isOpen,
    onClickExit,
    confirmBtn,
    confirmBtnText,
    onConfirm,
    cancelBtn,
    children,
  } = props

  return (
    <>
      <Transition
        show={isOpen}
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='fixed inset-0 z-30 overflow-y-auto'>
          {/* Backdrop */}
          <div
            className='fixed inset-0 w-full h-full bg-black opacity-40'
            onClick={backdrop && onClickExit}
          />
          {/* The actual modal */}
          <div className='flex flex-1 items-center h-screen'>
            <div className='relative w-full h-full lg:h-fit max-w-5xl p-4 mx-auto bg-base-200 rounded-xl shadow-lg'>
              <div className='flex flex-1 flex-col h-full lg:h-fit lg:justify-center lg:px-5'>
                <div className='flex justify-end'>
                  <button
                    className='btn btn-ghost btn-circle'
                    onClick={onClickExit}
                  >
                    <XMarkIcon className='w-6 h-6' />
                  </button>
                </div>
                <div className='w-full py-5'>
                  {/* Tittle */}
                  <h4 className='text-xl lg:text-2xl uppercase font-semibold text-base-content text-center '>
                    {title}
                  </h4>
                </div>
                {/* Body */}
                <div className='flex flex-1 overflow-auto overscroll-contain lg:pb-10'>
                  <div className='w-full flex flex-1 '>{children}</div>
                </div>
                {/* Footer */}
                <div className='flex flex-shrink justify-between lg:justify-around items-end w-full btn-group gap-2 pt-2'>
                  {cancelBtn && (
                    <button
                      className='btn btn-outline btn-error flex-1'
                      onClick={onClickExit}
                    >
                      Cancel
                    </button>
                  )}
                  {confirmBtn && (
                    <button
                      className='btn btn-outline btn-success flex-1'
                      onClick={onConfirm}
                    >
                      {confirmBtnText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  )
}

export { SimpleModal }
