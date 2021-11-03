import Tournament from "./Tournament";
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useState } from "react";

export default function Tournaments({ user, tournaments, places, addTournament, editTournament, deleteTournament }) {

  const [adder, setAdder] = useState(false);

  const changeAdder = () => {
    setAdder(!adder)
  }

  const _addTournament = () => {
    addTournament()
  }
  const _editTournament = () => {
    editTournament()
  }
  const _deleteTournament = () => {
    deleteTournament()
  }

  return(
    <div className="m-2" >
      <span className="text-white"> Tournaments of {user.username}: </span>
      <div className="flex text-black flex-wrap">
        {tournaments.map(tour =>
          <Tournament {...tour} places={places} key={tour.id} />
        )}
        {adder && 
        <> 
          <Tournament places={places} adding={true} newTournament={true} />
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