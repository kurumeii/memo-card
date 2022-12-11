import React from 'react'

function CardLayout({ className, array }) {
  return (
    <div className={className}>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
        {array.map(({ id, created_at, title, text_content }) => (
          <div
            key={id}
            className='col-auto'
          >
            <div className='card w-full h-96 min-w-fit max-w-xl border-2 border-primary transition-transform hover:scale-95'>
              <div className='card-body w-full h-full '>
                <div className='card-title text-2xl font-bold'>{title}</div>
                <div className='block text-base whitespace-pre-line text-ellipsis overflow-hidden'>
                  {text_content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardLayout
