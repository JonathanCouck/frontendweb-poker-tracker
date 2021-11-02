import { useState } from "react"

export default function MenuItem({name, changeScreen}) {
  const [title] = useState(name)

  const handleClick = () => {
    changeScreen(title);
  }

  return (
    <div className="text-left pl-auto pr-auto p-4 bg-gray-800 select-none cursor-default border-2 rounded-md hover:bg-gray-600 cursor-pointer" 
        style={{color:"#61dafb",borderColor:"#212121"}} onClick={handleClick}>
      {name}
    </div>
  )
}