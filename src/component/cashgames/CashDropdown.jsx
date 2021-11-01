import { useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"

export default function CashDropdown({onEditCashgame}) {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!isOpen)
  }
  const handleLeave = () => {
    setOpen(false)
  }

  return(
    <div>
      <AiFillCaretDown color="black" size={25} onClick={handleClick} className="block hover:bg-red-500 cursor-pointer rounded-lg"/>
      {isOpen && 
      <ul className="absolute z-10 bg-white rounded-lg text-left text-sm pt-1 pb-1" onMouseLeave={handleLeave}>
        <li className="select-none block text-black p-1 hover:bg-gray-800 hover:text-white" onClick={onEditCashgame}>Edit cashgame</li>
        <li className="select-none block text-black p-1 hover:bg-gray-800 hover:text-white">Delete cashgame</li>
      </ul>
      }
    </div>
  )
}