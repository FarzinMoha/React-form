import React from 'react'

function ErrMessage(props) {
  return (
    <div className='error'>
        {props.children}
    </div>
  )
}

export default ErrMessage