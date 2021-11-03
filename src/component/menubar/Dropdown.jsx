import { useState } from "react"
import { IoMenu } from "react-icons/io5"

export default function Dropdown({signOut, settings}) {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!isOpen)
  }
  const handleLeave = () => {
    setOpen(false)
  }

  const handleSettings = () => {
    setOpen(false);
    settings();
  }
  const handleSignOut = () => {
    setOpen(false);
    signOut();
  }

  return(
    <div>
      <IoMenu color="#61dafb" size={35} onClick={handleClick} className="block ml-auto hover:bg-gray-600 cursor-pointer rounded-lg"/>
      {isOpen && 
      <ul className="absolute z-10 bg-white rounded-lg text-left pt-1 pb-1 text-base" onMouseLeave={handleLeave} style={{right: 0, left: 'auto'}}>
        <li className="block text-black p-1 hover:bg-gray-800 hover:text-white" onClick={handleSettings} >Account settings</li>
        <li className="block text-black p-1 hover:bg-gray-800 hover:text-white" onClick={handleSignOut} >Sign out</li>
      </ul>
      }
    </div>
  )
}