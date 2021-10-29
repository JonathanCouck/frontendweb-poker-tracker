import Tournament from "./Tournament";

export default function Tournaments(props) {
  const {tournaments} = props;

  return(
    <div className="flex">
      {tournaments.map(tour =>
        <Tournament {...tour} />
      )}
    </div>
  )
}