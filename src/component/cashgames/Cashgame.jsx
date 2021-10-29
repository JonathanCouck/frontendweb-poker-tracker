export default function Cashgame(props) {
  const { small_blind, big_blind, in_for, out_for, date } = props;

  return (
    <div className="grid grid-cols-6 grid-row-6 border-2 border-red-500 rounded-md bg-red-200 m-1 text-left p-5 w-80">
      <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> Cashgame </b>
      <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Blinds: </span> 
      <span className="col-start-3 col-span-4 row-start-2"> $ {small_blind} / {big_blind} </span>
      <span className="col-start-1 col-span-2 row-start-3 font-semibold"> In for: </span>
      <span className="col-start-3 col-span-2 row-start-3"> $ {in_for} </span>
      <span className="col-start-1 col-span-2 row-start-4 font-semibold"> Out for: </span> 
      <span className="col-start-3 col-span-2 row-start-4"> $ {out_for} </span> 
      <span className="col-start-1 col-span-2 row-start-5 font-semibold"> Date: </span> 
      <span className="col-start-3 col-span-4 row-start-5"> {date.substring(0,10)} </span>
    </div>
  )
};
