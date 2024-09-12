import React from 'react'
import { useSelector } from 'react-redux'

function Verifyotpss() {
    const rest=useSelector((state)=>state.auth.resetkey)
    console.log("resetkey");
  return (
    <div>
      
    </div>
  )
}

export default Verifyotpss