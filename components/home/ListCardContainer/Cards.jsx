import React from 'react'
import { layoutEnums } from '../../../utils/enums/enums'
import CardLayout from './CardLayout'
import ListLayout from './ListLayout'

function Cards({ layout, array }) {
  return (
    <>
      {layout === layoutEnums.card ? (
        <CardLayout
          className={'overflow-y-auto  w-full max-h-screen py-3'}
          array={array}
        />
      ) : (
        <ListLayout
          className={'overflow-x-auto w-full max-h-screen py-3'}
          array={array}
        />
      )}
    </>
  )
}

export default Cards
