import React from 'react'

function ListLayout({ className, array }) {
  return (
    <div className={className}>
      {array.length !== 0 && (
        <table className='table w-full'>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Text content</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {array.map(({ id, created_at, userid, title, text_content }, index) => (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{title}</td>
                <td className='truncate'>{text_content}</td>
                <td>{created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ListLayout
