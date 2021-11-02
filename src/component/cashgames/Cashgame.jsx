import CashDropdown from "./CashDropdown";
import { useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';

export default function Cashgame({ id, small_blind, big_blind, in_for, out_for, date, saveCashgame }) {
  const [editing, setEditing] = useState(false);

  const editCashgame = () => setEditing(true);

  const saveGame = () => {
    saveCashgame(id, document.getElementById('sb').value, document.getElementById('bb').value, document.getElementById('inf').value, 
      document.getElementById('outf').value, document.getElementById('date').value);
  }

  const editor = () => {
    return(
      <div className="grid grid-cols-7 grid-row-6 border-2 border-red-500 rounded-md bg-red-200 m-1 text-left p-5 w-80">
        <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> Cashgame </b>
        <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Blinds: </span> 
        <span className="col-start-3 col-span-4 row-start-2"> $ <input type="number" name="sb" id="sb" min="1" max="999" className="w-10" placeholder={small_blind}/> 
          / <input type="number" name="bb" id="bb" min="1" max="999" className="w-10" placeholder={big_blind}/> </span>
        <span className="col-start-1 col-span-4 row-start-3 font-semibold"> In for: </span>
        <span className="col-start-3 col-span-4 row-start-3"> $ <input type="number" name="inf" id="inf" min="1" max="999" className="w-15" placeholder={in_for}/> </span>
        <span className="col-start-1 col-span-4 row-start-4 font-semibold"> Out for: </span> 
        <span className="col-start-3 col-span-4 row-start-4"> $ <input type="number" name="of" id="outf" min="1" max="999" className="w-15" placeholder={out_for}/> </span> 
        <span className="col-start-1 col-span-4 row-start-5 font-semibold"> Date: </span> 
        <span className="col-start-3 col-span-4 row-start-5"> <input type="date" name="date" id="date" min="1" max="999" className="w-15"/> </span>
        <AiOutlineCheckCircle className="col-start-5 row-start-1 hover:bg-blue-500 cursor-pointer rounded-lg" color="black" size={25} onClick={saveGame}/>
      </div>
    )
  };

  const not_editor = () => {
    return (
      <div className="grid grid-cols-7 grid-row-6 border-2 border-red-500 rounded-md bg-red-200 m-1 text-left p-5 w-80">
        <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> Cashgame </b>
        <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Blinds: </span> 
        <span className="col-start-3 col-span-4 row-start-2"> $ {small_blind} / {big_blind} </span>
        <span className="col-start-1 col-span-2 row-start-3 font-semibold"> In for: </span>
        <span className="col-start-3 col-span-2 row-start-3"> $ {in_for} </span>
        <span className="col-start-1 col-span-2 row-start-4 font-semibold"> Out for: </span> 
        <span className="col-start-3 col-span-2 row-start-4"> $ {out_for} </span> 
        <span className="col-start-1 col-span-2 row-start-5 font-semibold"> Date: </span> 
        <span className="col-start-3 col-span-4 row-start-5"> {date.substring(0,10)} </span>
        <CashDropdown className="col-start-7 row-start-5 hover:bg-red-500 cursor-pointer rounded-lg" color="black" size={25}  onEditCashgame={editCashgame}/>
      </div>
    )
  };
  
  return editing ? editor() : not_editor()
};
