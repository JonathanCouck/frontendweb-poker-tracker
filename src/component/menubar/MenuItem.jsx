export default function MenuItem(props) {
  const {name} = props
  return (
    <div class="pl-auto pr-auto pt-4 pb-4 cursor-default border-2 hover:bg-gray-600 cursor-pointer" style={{color:"#61dafb",borderColor:"#212121"}}>
      {name}
    </div>
  )
}