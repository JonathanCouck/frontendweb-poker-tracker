import { useState } from "react";
import Tournament from "./Tournament";

export default function Tournaments({user, tournaments, saveTournament, places}) {
  //const [profitLoss, setProfitLoss] = useState(tournaments.reduce((prev, curr) => prev+(curr.cashed-curr.buyin),0));

  const getPlaceName = (id) => {
    return places.filter(place => place.id===id)[0].name;
  }
  const getPlaceId = (name) => {
    return places.filter(place => place.name===name)[0].id;
  }
  const saveTournament2 = (id, entrants, finished, buyin, cashed, date, place) => {
    saveTournament(id, entrants, finished, buyin, cashed, date, getPlaceId(place))
  }

  return(
    <div className="m-2" >
      <span className="text-white"> Tournaments of {user.first_name+" "+user.last_name}: </span>
      <div className="flex text-black flex-wrap">
        {tournaments.map(tour =>
          <Tournament {...tour} place={getPlaceName(tour.place_id)} saveTournament={saveTournament2} />
        )}
      </div>
    </div>
  )
}