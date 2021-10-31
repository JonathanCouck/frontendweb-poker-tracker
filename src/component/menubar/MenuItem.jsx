export default function MenuItem(props) {
  const {name} = props

  const handleClick = () => {
    console.log(`clicked ${name}`)
  }

  return (
    <div className="pl-auto pr-auto pt-4 pb-4 bg-gray-800 select-none cursor-default border-2 rounded-md hover:bg-gray-600 cursor-pointer" 
        style={{color:"#61dafb",borderColor:"#212121"}} onClick={handleClick}>
      {name}
    </div>
  )
}