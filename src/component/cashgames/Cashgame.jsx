import { useState } from "react"

export default function Cashgame({ sb, bb, in_for, out_for, da }) {
  const [smallBlind] = useState(sb)
  const [bigBlind] = useState(bb)
  const [inFor] = useState(in_for)
  const [outFor] = useState(out_for)
  const [date] = useState(da)

  return (
    <div className="grid grid-cols-6 grid-row-6 border-2 border-red-500 rounded-md bg-red-200 m-1 text-left p-5 w-80">
      <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> Cashgame </b>
      <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Blinds: </span> 
      <span className="col-start-3 col-span-4 row-start-2"> $ {smallBlind} / {bigBlind} </span>
      <span className="col-start-1 col-span-2 row-start-3 font-semibold"> In for: </span>
      <span className="col-start-3 col-span-2 row-start-3"> $ {inFor} </span>
      <span className="col-start-1 col-span-2 row-start-4 font-semibold"> Out for: </span> 
      <span className="col-start-3 col-span-2 row-start-4"> $ {outFor} </span> 
      <span className="col-start-1 col-span-2 row-start-5 font-semibold"> Date: </span> 
      <span className="col-start-3 col-span-4 row-start-5"> {date.substring(0,10)} </span>
    </div>
  )
};
