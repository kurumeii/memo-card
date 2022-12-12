import cn from 'classnames'
import React, { useCallback, useState } from 'react'
import { layoutEnums } from '../../utils/enums/enums'
import CreateNewButton from './CreateNewButton'

import ButtonGroup from './ListCardContainer/ButtonGroup'
import Cards from './ListCardContainer/Cards'

function ListOfCards(props) {
  const { className, list } = props
  const [layout, setLayout] = useState(layoutEnums.card)
  const layoutBtnClassname = useCallback(
    layoutId => cn('btn w-32 lg:w-24', layoutId === layout ? 'btn-active' : ''),
    [layout]
  )
  return (
    <div className={className}>
      {list.length !== 0 ? (
        <>
          <ButtonGroup
            className={'btn-group justify-center p-3'}
            onClickEvent={setLayout}
            layoutBtnClassname={layoutBtnClassname}
          />
          <Cards
            layout={layout}
            array={list}
          />
        </>
      ) : (
        <>
          <div className='flex flex-col w-full border-opacity-50'>
            <div className='flex flex-1 flex-col items-center gap-2 lg:flex-row lg:justify-center py-4'>
              <span className='italic text-lg'>Let&apos;s create a new one !</span>
              <CreateNewButton className={'flex justify-center w-full lg:w-fit'} />
            </div>
            <div className='divider'>OR</div>
            <div className='flex flex-1 flex-col items-center gap-2 lg:flex-row lg:justify-center py-4'>
              <span className='italic text-lg'> Sign in to get all the saved list</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ListOfCards
