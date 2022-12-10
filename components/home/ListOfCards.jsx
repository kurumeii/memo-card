import cn from 'classnames'
import React, { useCallback, useState } from 'react'
import { layoutEnums } from '../../utils/enums/enums'

import ButtonGroup from './ListCardContainer/ButtonGroup'
import Cards from './ListCardContainer/Cards'

function ListOfCards(props) {
  const { className } = props
  const [layout, setLayout] = useState(layoutEnums.card)
  const layoutBtnClassname = useCallback(
    layoutId => cn('btn', layoutId === layout ? 'btn-active' : ''),
    [layout]
  )
  return (
    <div className={className}>
      <ButtonGroup
        className={'btn-group justify-center py-3'}
        onClickEvent={setLayout}
        layoutBtnClassname={layoutBtnClassname}
      />
      <Cards layout={layout} />
    </div>
  )
}

export default ListOfCards
