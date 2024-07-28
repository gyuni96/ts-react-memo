import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
      <div> Header</div>
      <Outlet />
    </div>
  )
}

export default AppLayout
