import { useState } from "react";
import Tournament from "./Tournament";

export default function Tournaments({user, tournaments, saveTournament}) {
  //const [profitLoss, setProfitLoss] = useState(tournaments.reduce((prev, curr) => prev+(curr.cashed-curr.buyin),0));

  return(
    <div className="m-2" >
      <span className="text-white"> Tournaments of {user.first_name+" "+user.last_name}: </span>
      <div className="flex text-black flex-wrap">
        {tournaments.map(tour =>
          <Tournament {...tour} saveTournament={saveTournament} />
        )}
      </div>
    </div>
  )
}