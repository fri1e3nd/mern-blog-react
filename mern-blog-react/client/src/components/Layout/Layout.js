import React from 'react'
import {Navbar} from '../../components/Navbar/Navbar'

export default function Layout({children}) {

  return (
    <React.Fragment>
      <div>
        <Navbar />
        {children}
      </div>
    </React.Fragment>
  )

}