import Cashgame from "./Cashgame";
import NewCashgame from "./NewCashgame";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";

export default function Cashgames({user, cashgames, places, addCashgame, editCashgame, deleteCashgame }) {
  const [adder, setAdder] = useState(false);
  
  const changeAdder = () => {
    setAdder(!adder);
  }

  const _addCashgame = (c) => {
    c.player_id = user.id;
    addCashgame(c);
    changeAdder();
  }
  const _editCashgame = (c) => {
    c.player_id = user.id;
    editCashgame(c);
  }
  const _deleteCashgame = (id) => {
    deleteCashgame(id)
  }

  return(
    <div className="m-2" >
      <span className="text-white"> Cashgames of {user.username}: </span>
      <div className="flex text-black flex-wrap">
        {cashgames.map(cash =>
          <Cashgame {...cash} key={cash.id} places={places} editCashgame={_editCashgame} deleteCashgame={_deleteCashgame} />
        )}
        {adder && <> 
          <NewCashgame places={places} addCashgame={_addCashgame} />
          <div>
            <AiOutlineMinus color="black" size={35} className="border-2 border-red-600 rounded-md bg-red-200 m-1 hover:bg-red-600 cursor-pointer rounded-lg" onClick={changeAdder} />
          </div>
        </>
        }
        {!adder && <> 
          <div >
            <AiOutlinePlus color="black" size={35} className="border-2 border-red-600 rounded-md bg-red-200 m-1 hover:bg-red-600 cursor-pointer rounded-lg" onClick={changeAdder} />
          </div>
        </>
        }
      </div>
    </div>

  )
}