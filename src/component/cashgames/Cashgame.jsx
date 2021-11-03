import { useState } from 'react';
import { AiOutlineCheckCircle, AiFillDelete, AiFillEdit } from 'react-icons/ai';

export default function Cashgame({ id, small_blind, big_blind, in_for, out_for, date, place_id, places, adding=false, addCashgame }) {
  const [editing, setEditing] = useState(adding);
  const changeEditing = () => {
    setEditing(!editing);
  }

  const getPlaceName = (id) => places.find(place => place.id===id).name;
  const getPlaceId = (name) => places.find(place => place.name===name).id;
  
  const checkValues = () => {
    let ok = true;
    if(document.getElementById('sb').value ) {
      ok = false;
    } else if ( document.getElementById('bb').value ) {
      ok = false;
    } else if ( document.getElementById('inf').value ) {
      ok = false;
    } else if ( document.getElementById('outf').value ) {
      ok = false;
    } else if ( document.getElementById('date').value ) {
      ok = false;
    } else if ( document.getElementById('place').value ) {
      ok = false;
    }
    return ok;
  }

  const editor = () => {
    return(
      <div className="grid grid-cols-7 grid-row-6 border-2 border-red-600 rounded-md bg-red-200 m-1 text-left p-5 w-80">
        <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> Cashgame </b>
        <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Blinds: </span> 
        <span className="col-start-3 col-span-4 row-start-2"> $ <input type="number" name="sb" id="sb" min="1" max="999" className="w-8" /> / <input type="number" name="bb" id="bb" min="1" max="999" className="w-8" /> </span>
        <span className="col-start-1 col-span-4 row-start-3 font-semibold"> In for: </span>
        <span className="col-start-3 col-span-4 row-start-3"> $ <input type="number" name="inf" id="inf" min="1" max="999" className="w-20" /> </span>
        <span className="col-start-1 col-span-4 row-start-4 font-semibold"> Out for: </span> 
        <span className="col-start-3 col-span-4 row-start-4"> $ <input type="number" name="outf" id="outf" min="1" max="999" className="w-20" /> </span> 
        <span className="col-start-1 col-span-4 row-start-5 font-semibold"> Date: </span> 
        <span className="col-start-3 col-span-4 row-start-5"> <input type="date" name="date" id="date" min="1" max="999" className="w-15"/> </span>
        <span className="col-start-1 col-span-4 row-start-6 font-semibold"> Place: </span> 
        <span className="col-start-3 col-span-2 row-start-6">
          <select name="place" id="place">
            {places.map(p => <option key={p.name} value={p.name} > {p.name} </option>)}
          </select>
        </span>
        <AiOutlineCheckCircle className="col-start-5 row-start-1 hover:bg-red-600 cursor-pointer rounded-lg" color="black" size={25} />
      </div>
    )
  };

  const not_editor = () => {
    return (
      <div className="grid grid-cols-7 grid-row-6 border-2 border-red-600 rounded-md bg-red-200 m-1 text-left p-5 w-80">
        <b className="col-start-1 col-span-5 row-start-1 row-span-1 pb-2 text-lg pb-5"> Cashgame </b>
        <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Blinds: </span> 
        <span className="col-start-3 col-span-4 row-start-2"> $ {small_blind} / {big_blind} </span>
        <span className="col-start-1 col-span-2 row-start-3 font-semibold"> In for: </span>
        <span className="col-start-3 col-span-2 row-start-3"> $ {in_for} </span>
        <span className="col-start-1 col-span-2 row-start-4 font-semibold"> Out for: </span> 
        <span className="col-start-3 col-span-2 row-start-4"> $ {out_for} </span> 
        <span className="col-start-1 col-span-2 row-start-5 font-semibold"> Date: </span> 
        <span className="col-start-3 col-span-4 row-start-5"> {date.substring(0,10)} </span>
        <span className="col-start-1 col-span-2 row-start-6 font-semibold"> Place: </span> 
        <span className="col-start-3 col-span-5 row-start-6"> {getPlaceName(place_id)} </span>
        <AiFillEdit color="black" size={25} className="col-start-6 row-start-1 rounded-md m-1 hover:bg-red-600 cursor-pointer rounded-lg" onClick={changeEditing} />
        <AiFillDelete color="black" size={25} className="col-start-7 row-start-1 rounded-md m-1 hover:bg-red-600 cursor-pointer rounded-lg"/>
      </div>
    )
  };
  
  return editing ? editor() : not_editor()
};

//addCashgame(document.getElementById('bb').value, document.getElementById('sb').value, document.getElementById('date').value, document.getElementById('inf').value, document.getElementById('outf').value, getPlaceId(document.getElementById('place').value));