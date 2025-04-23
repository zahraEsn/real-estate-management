import { NAVBAR_HEIGHT } from "@/lib/constants"
import React from "react"

const Navbar = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full z-50 shadow-xl"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      Navbar
    </div>
  )
}

export default Navbar
