import React from 'react'
import { ListBulletIcon, QueueListIcon } from '@heroicons/react/24/solid'
import { layoutEnums } from '../../../utils/enums/enums'

function ButtonGroup({ className, onClickEvent, layoutBtnClassname }) {
  return (
    <div className={className}>
      <button
        className={layoutBtnClassname(layoutEnums.card)}
        onClick={() => onClickEvent(layoutEnums.card)}
      >
        <QueueListIcon className='w-6 h-6' />
      </button>
      <button
        className={layoutBtnClassname(layoutEnums.list)}
        onClick={() => onClickEvent(layoutEnums.list)}
      >
        <ListBulletIcon className='w-6 h-6' />
      </button>
    </div>
  )
}

export default ButtonGroup
