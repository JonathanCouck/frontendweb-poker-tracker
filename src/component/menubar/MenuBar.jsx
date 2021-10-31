import MenuItem from './MenuItem'

export default function MenuBar() {
  return (
    <div className="grid grid-cols-3 bg-gray text-3xl">
      <MenuItem className="col-start-1  w-700px" name="Tournaments"/>
      <MenuItem className="col-start-2" name="Cashgames" />
      <MenuItem className="col-start-3" name="All" />
    </div>
  )
}