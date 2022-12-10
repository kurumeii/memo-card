import React from 'react'
import { layoutEnums } from '../../../utils/enums/enums'
import CardLayout from './CardLayout'
import ListLayout from './ListLayout'

function Cards({ layout }) {
  return (
    <>
      {layout === layoutEnums.card ? (
        <CardLayout className={'overflow-x-auto w-full max-h-screen py-3'} />
      ) : (
        <ListLayout className={'overflow-x-auto w-full max-h-screen py-3'} />
      )}
    </>
  )
}

export default Cards
