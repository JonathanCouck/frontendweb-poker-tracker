import { useState } from 'react';
import { AiOutlineCheckCircle, AiFillDelete, AiFillEdit } from 'react-icons/ai';

export default function Tournament({ id, entrants, finished, buyin, cashed, date, place_id, places, adding=false, newTournament=false, addTournament, editTournament, deleteTournament }) {
  const [editing, setEditing] = useState(adding);
  const changeEditing = () => {
    setEditing(!editing);
  }
  
  const getPlaceName = (id) => places.find(place => place.id===id).name;
  const getPlaceId = (name) => places.find(place => place.name===name).id;

  const checkValues = () => {
    let stillOK = true;
    if(document.getElementById('finished').value === '') {
      stillOK = false;
    } else if (document.getElementById('entrants').value === '') {
      stillOK = false;
    } else if (document.getElementById('buyin').value === '') {
      stillOK = false;
    } else if (document.getElementById('cashed').value === '') {
      stillOK = false;
    } else if (document.getElementById('date').value === '') {
      stillOK = false;
    } else if (document.getElementById('place').value === '') {
      stillOK = false;
    }
    return stillOK
  }

  const editor = () => {
    return(
      <div className="grid grid-cols-7 grid-row-6 border-2 border-blue-600 rounded-md bg-blue-200 m-1 text-left p-5 w-80">
        <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> Tournament </b>
        <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Finished: </span> 
        <span className="col-start-3 col-span-4 row-start-2"> <input type="number" name="finished" id="finished" min="1" max="999" className="w-10" /> / <input type="number" name="entrants" id="entrants" min="1" max="999" className="w-10" /> </span>
        <span className="col-start-1 col-span-4 row-start-3 font-semibold"> Buyin: </span>
        <span className="col-start-3 col-span-4 row-start-3"> $ <input type="number" name="buyin" id="buyin" min="1" max="999999999" className="w-20" /> </span>
        <span className="col-start-1 col-span-4 row-start-4 font-semibold"> Cashed: </span>
        <span className="col-start-3 col-span-4 row-start-4"> $ <input type="number" name="cashed" id="cashed" min="1" max="999999999" className="w-20" /> </span>
        <span className="col-start-1 col-span-4 row-start-5 font-semibold"> Date: </span> 
        <span className="col-start-3 col-span-4 row-start-5"><input type="date" name="date" id="date" className="w-40"/> </span>
        <span className="col-start-1 col-span-4 row-start-6 font-semibold"> Place: </span> 
        <span className="col-start-3 col-span-2 row-start-6">
          <select name="place" id="place">
            {places.map(p => <option key={p.name} value={p.name} > {p.name} </option>)}
          </select>
        </span>
        <AiOutlineCheckCircle className="col-start-7 row-start-1 hover:bg-blue-600 cursor-pointer rounded-lg" color="black" size={25} />
      </div>
    )
  };
  
  const not_editor = () => {
    return(
      <div className="grid grid-cols-7 grid-row-6 border-2 border-blue-600 rounded-md bg-blue-200 m-1 text-left p-5 w-80">
        <b className="col-start-1 col-span-5 row-start-1 row-span-1 pb-2 text-lg pb-5"> Tournament </b>
        <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Finished: </span> 
        <span className="col-start-3 col-span-4 row-start-2"> {finished} / {entrants} </span>
        <span className="col-start-1 col-span-2 row-start-3 font-semibold"> Buyin: </span>
        <span className="col-start-3 col-span-2 row-start-3"> $ {buyin}</span>
        <span className="col-start-1 col-span-2 row-start-4 font-semibold"> Cashed: </span>
        <span className="col-start-3 col-span-2 row-start-4"> $ {cashed} </span>
        <span className="col-start-1 col-span-2 row-start-5 font-semibold"> Date: </span> 
        <span className="col-start-3 col-span-4 row-start-5"> {date.substring(0,10)} </span>
        <span className="col-start-1 col-span-2 row-start-6 font-semibold"> Place: </span> 
        <span className="col-start-3 col-span-5 row-start-6"> {getPlaceName(place_id)} </span>
        <AiFillEdit color="black" size={25} className="col-start-6 row-start-1 rounded-md m-1 hover:bg-blue-600 cursor-pointer rounded-lg" onClick={changeEditing}/>
        <AiFillDelete color="black" size={25} className="col-start-7 row-start-1 rounded-md m-1 hover:bg-blue-600 cursor-pointer rounded-lg"/>
      </div>
    )
  };

  return editing? editor(): not_editor();
};

//editTournament(id, document.getElementById('buyin').value, document.getElementById('cashed').value, document.getElementById('date').value, document.getElementById('entrants').value, document.getElementById('finished').value, getPlaceId(document.getElementById('place').value));