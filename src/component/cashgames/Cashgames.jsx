import Cashgame from "./Cashgame";

export default function Tournaments(props) {
  const {cashgames, user} = props;

  //const profitLoss = cashgames.reduce((prev, curr) => prev+(curr.out_for-curr.in_for),0)
  
  return(
    <div className="flex text-black flex-wrap">
      {cashgames.filter(tour => tour.player_id === user.id)
        .map(cash =>
        <Cashgame sb={cash.small_blind} bb={cash.big_blind} in_for={cash.in_for} out_for={cash.out_for} da={cash.date}/>
      )}
    </div>
  )
}