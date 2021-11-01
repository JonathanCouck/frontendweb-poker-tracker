import MenuItem from './MenuItem'
import UserBar from './UserBar'

export default function MenuBar({user, onLogOut}) {
  return (
    <div className="grid grid-cols-4 bg-gray text-2xl w-screen h-18">
      <MenuItem className="col-start-1" name="Tournaments"/>
      <MenuItem className="col-start-2" name="Cashgames" />
      <MenuItem className="col-start-3" name="Places" />
      <UserBar user={user}/>
    </div>
  )
}