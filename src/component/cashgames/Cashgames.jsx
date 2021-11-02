import Cashgame from "./Cashgame";
import { useState } from "react";

export default function Cashgames({user, cashgames, saveCashgame}) {
  //const [profitLoss, setProfitLoss] = useState(cashgames.reduce((prev, curr) => prev+(curr.out_for-curr.in_for),0));
  
  return(
    <div className="m-2" >
      <span className="text-white"> Cashgames of {user.first_name+" "+user.last_name}: </span>
      <div className="flex text-black flex-wrap">
        {cashgames.map(cash =>
          <Cashgame {...cash} key={cash.id} saveCashgame={saveCashgame} />
        )}
      </div>
    </div>

  )
}