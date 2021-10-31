import Tournament from "./Tournament";

export default function Tournaments(props) {
  const {tournaments, user} = props;
  return(
    <div className="flex text-black">
      {tournaments.filter(tour => tour.player_id === user.id)
        .map(tour =>
        <Tournament {...tour} />
      )}
    </div>
  )
}