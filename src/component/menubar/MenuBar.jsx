import MenuItem from './MenuItem'

export default function MenuBar() {
  return (
    <div className="grid grid-cols-5 bg-gray-800 w-screen text-3xl mb-6" >
      <MenuItem className="col-start-1" name="Tournaments"/>
      <MenuItem className="col-start-2" name="Cashgames" />
      <MenuItem className="col-start-3" name="Add Tournament" />
      <MenuItem className="col-start-4" name="Add Cashgame" />
      <MenuItem className="col-start-4" name="User" />
    </div>
  )
}