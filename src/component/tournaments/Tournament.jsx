import { useState } from 'react';
import TourDropdown from './TourDropdown';
import { AiOutlineCheckCircle } from 'react-icons/ai';

export default function Tournament({ id, entrants, finished, buyin, cashed, date, saveTournament, place }) {
  const [editing, setEditing] = useState(false);

  const editTournament = () => setEditing(true);

  const saveGame = () => {
    saveTournament(id, document.getElementById('entrants').value, document.getElementById('finished').value, document.getElementById('buyin').value, 
      document.getElementById('cashed').value, document.getElementById('date').value, place);
    
    setEditing(false)
  }

  const editor = () => {
    return(
      <div className="grid grid-cols-7 grid-row-6 border-2 border-blue-500 rounded-md bg-blue-200 m-1 text-left p-5 w-80">
        <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> Tournament </b>
        <span className="col-start-1 col-span-4 row-start-2 font-semibold"> Finished: </span> 
        <span className="col-start-3 col-span-4 row-start-2"> <input type="number" name="finished" id="finished" min="1" max="999" className="w-10" placeholder={finished}/> 
          / <input type="number" name="entrants" id="entrants" min="1" max="999" className="w-10" placeholder={entrants}/> </span>
        <span className="col-start-1 col-span-4 row-start-3 font-semibold"> Buyin: </span>
        <span className="col-start-3 col-span-4 row-start-3"> $ <input type="number" name="buyin" id="buyin" min="1" max="999999999" className="w-10" placeholder={buyin}/> </span>
        <span className="col-start-1 col-span-4 row-start-4 font-semibold"> Cashed: </span>
        <span className="col-start-3 col-span-4 row-start-4"> $ <input type="number" name="cashed" id="cashed" min="1" max="999999999" className="w-30" placeholder={cashed}/> </span>
        <span className="col-start-1 col-span-4 row-start-5 font-semibold"> Date: </span> 
        <span className="col-start-3 col-span-2 row-start-5"><input type="date" name="date" id="date" className="w-40"/> </span>
        <AiOutlineCheckCircle className="col-start-5 row-start-1 hover:bg-blue-500 cursor-pointer rounded-lg" color="black" size={25} onClick={saveGame} />
      </div>
    )
  };
  
  const not_editor = () => {
    return(
      <div className="grid grid-cols-8 grid-row-6 border-2 border-blue-500 rounded-md bg-blue-200 m-1 text-left p-5 w-80">
        <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> Tournament </b>
        <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Finished: </span> 
        <span className="col-start-3 col-span-4 row-start-2"> {finished} / {entrants} </span>
        <span className="col-start-1 col-span-2 row-start-3 font-semibold"> Buyin: </span>
        <span className="col-start-3 col-span-2 row-start-3"> $ {buyin}</span>
        <span className="col-start-1 col-span-2 row-start-4 font-semibold"> Cashed: </span>
        <span className="col-start-3 col-span-2 row-start-4"> $ {cashed} </span>
        <span className="col-start-1 col-span-2 row-start-5 font-semibold"> Date: </span> 
        <span className="col-start-3 col-span-4 row-start-5"> {date.substring(0,10)} </span>
        <span className="col-start-1 col-span-2 row-start-6 font-semibold"> Place: </span> 
        <span className="col-start-3 col-span-5 row-start-6"> {place} </span>
        <TourDropdown className="col-start-7 row-start-7" onEditTournament={editTournament}/>
      </div>
    )
  };

  if(editing) {
    return editor();
  } else {
    return not_editor();
  }
};