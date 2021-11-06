import Tournament from "./Tournament";
import NewTournament from "./NewTournament";
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useState } from "react";

export default function Tournaments({ user, tournaments, places, addTournament, editTournament, deleteTournament }) {

  const [adder, setAdder] = useState(false);

  const changeAdder = () => {
    setAdder(!adder)
  }

  const _addTournament = (t) => {
    t.player_id = user.id;
    addTournament(t);
    setAdder(false);
  }
  const _editTournament = (t) => {
    t.player_id = user.id;
    editTournament(t)
  }

  const _deleteTournament = (id) => {
    deleteTournament(id)
  }

  return(
    <div className="m-2" >
      <span className="text-white"> Tournaments of {user.username}: </span>
      <div className="flex text-black flex-wrap">
        {tournaments.map(tour =>
          <Tournament {...tour} places={places} key={tour.id} editTournament={_editTournament} deleteTournament={_deleteTournament} />
        )}
        {adder && 
        <> 
          <NewTournament places={places} addTournament={_addTournament} />
          <div >
            <AiOutlineMinus color="black" size={35} className="border-2 border-blue-600 rounded-md bg-blue-200 m-1 hover:bg-blue-600 cursor-pointer rounded-lg" onClick={changeAdder} />
          </div>
        </>
        }
        {!adder &&
        <div >
          <AiOutlinePlus color="black" size={35} className="border-2 border-blue-600 rounded-md bg-blue-200 m-1 hover:bg-blue-600 cursor-pointer rounded-lg" onClick={changeAdder} />
        </div>}
      </div>
    </div>
  )
}