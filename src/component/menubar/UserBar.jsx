import Dropdown from './Dropdown'

export default function UserBar({ user, signOut }) {
  //const favoritePlace = PLACE_DATA.filter(place => place.id === user.favorite_place_id)[0]
  return(
    <div className="pl-auto pr-auto p-4 bg-gray-800 cursor-default border-2 rounded-md text-left flex" style={{color:"#61dafb",borderColor:"#212121"}}>
      <div>{user.username}</div>
      <div className="ml-auto">
        <Dropdown className="hover: cursor-pointer" signOut={signOut} />
      </div>
    </div>
  )
}