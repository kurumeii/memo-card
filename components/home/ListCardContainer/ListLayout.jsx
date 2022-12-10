import React from 'react'

function ListLayout({ className }) {
  const arr = Array.from({ length: 100 }, (_, index) => index++)
  const dummyDate = new Date().toLocaleDateString('vi', {
    dateStyle: 'medium',
  })
  return (
    <div className={className}>
      <table className='table w-full'>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>Title {item}</td>
              <td>This is a dummy text for title {item}</td>
              <td>{dummyDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListLayout
