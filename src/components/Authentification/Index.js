import React from 'react'
import { Outlet } from 'react-router-dom'

const Authentification = () => {
  return (
    <div className="d-flex justify-content-center align-items-center p-2 login">
      <Outlet />
    </div>
  )
}

export default Authentification
