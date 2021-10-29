import Cashgame from "./Cashgame";

export default function Tournaments(props) {
  const {cashgames} = props;

  return(
    <div className="flex">
      {cashgames.map(cash =>
        <Cashgame {...cash} />
      )}
    </div>
  )
}