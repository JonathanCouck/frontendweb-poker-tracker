import PLACE_DATA from '../mock_data/place_mock'

export default function UserBar(props) {
  const {id, first_name, last_name, birth_date, favorite_place_id} = props
  const favoritePlace = PLACE_DATA.filter(place => place.id === favorite_place_id)[0]
  return(
    <div className="pl-auto pr-auto p-4 bg-gray-800 cursor-default border-2 rounded-md h-screen text-left" style={{color:"#61dafb",borderColor:"#212121"}}>
      <div>
        <div>Name: {first_name} {last_name} </div>
        <div>Birth date: {birth_date.substring(0,10)}</div>
        <div>Favorite place: {favoritePlace.name}</div>
      </div>
      <div className="text-right hover: cursor-pointer">
        ChangeUser
      </div>
    </div>
  )
}