import MenuItem from './MenuItem'
import UserBar from './UserBar'

export default function MenuBar({user}) {
  return (
    <div className="grid grid-cols-4 bg-gray text-2xl w-screen h-5">
      <MenuItem className="col-start-1" name="Tournaments"/>
      <MenuItem className="col-start-2" name="Cashgames" />
      <MenuItem className="col-start-3" name="All" />
      <UserBar {...user} className="" />
    </div>
  )
}