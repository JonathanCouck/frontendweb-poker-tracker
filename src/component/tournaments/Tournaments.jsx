import { useState } from "react";
import Tournament from "./Tournament";

export default function Tournaments({user, tournaments, saveTournament}) {
  const [profitLoss, setProfitLoss] = useState(tournaments.reduce((prev, curr) => prev+(curr.cashed-curr.buyin),0));

  return(
    <>
      Tournaments of {user.first_name+" "+user.last_name}: (Profit/loss of ${profitLoss})
      <div className="flex text-black flex-wrap">
        {tournaments.map(tour =>
          <Tournament {...tour} saveTournament={saveTournament} />
        )}
      </div>
    </>
  )
}