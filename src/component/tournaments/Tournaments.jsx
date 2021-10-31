import Tournament from "./Tournament";

export default function Tournaments(props) {
  const {tournaments, user} = props;

  //const profitLoss = tournaments.reduce((prev, curr) => prev+(curr.cashed-curr.buyin),0)
  
  return(
    <div className="flex text-black flex-wrap">
      {tournaments.filter(tour => tour.player_id === user.id)
        .map(tour =>
        <Tournament {...tour} />
      )}
    </div>
  )
}