import Cashgame from "./Cashgame";

export default function Tournaments(props) {
  const {cashgames, user} = props;

  return(
    <div className="flex text-black">
      {cashgames.filter(tour => tour.player_id === user.id)
        .map(cash =>
        <Cashgame {...cash} />
      )}
    </div>
  )
}