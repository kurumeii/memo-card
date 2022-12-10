import React from 'react'

function CardLayout({ className }) {
  const arr = Array.from({ length: 100 }, (_, index) => index++)
  return (
    <div className={className}>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10'>
        {arr.map((item, index) => (
          <div
            key={index}
            className='col-auto'
          >
            <div className='card w-full border-2 border-primary'>
              <div className='card-body'>
                <div className='card-title text-2xl font-bold'>Title: {item}</div>
                <p>This is a dummy text for title {item}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardLayout
