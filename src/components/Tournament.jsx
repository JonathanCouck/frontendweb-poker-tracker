import { memo, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { TournamentsContext } from "../contexts/TournamentsProvider";

const Tournament = memo(({id, date, place, buyin, cashed, entrants, finished}) => {
  const { deleteTournament } = useContext(TournamentsContext);

  const handleRemove = useCallback(() => {
    deleteTournament(id);
  }, [deleteTournament, id]);

  return(
    <div className="grid grid-cols-7 grid-row-7 border-2 border-blue-600 rounded-md bg-blue-200 m-1 text-left p-5 w-80">

      <b className="col-start-1 col-span-5 row-start-1 row-span-1 pb-2 text-lg pb-5"> Tournament </b>
      
      <Link data-cy="tournament_edit_btn" to={`/tournaments/edit/${id}`} className="col-start-6 row-start-1" >
        <AiFillEdit color="black" size={25} className="rounded-md m-1 hover:bg-blue-600 cursor-pointer rounded-lg" />
      </Link>

      <button data-cy="tournament_remove_btn" onClick={handleRemove} className=" col-start-7 row-start-1" >
        <AiFillDelete color="black" size={25} className="rounded-md m-1 hover:bg-blue-600 cursor-pointer rounded-lg" />
      </button>

      <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Date: </span> 
      <span data-cy="tournament_date" className="col-start-3 col-span-4 row-start-2"> 
        {new Date(date).toLocaleDateString("nl-BE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })} 
      </span>

      <span className="col-start-1 col-span-2 row-start-3 font-semibold"> Place: </span> 
      <span data-cy="tournament_place" className="col-start-3 col-span-5 row-start-3"> {place} </span>

      <span className="col-start-1 col-span-2 row-start-4 font-semibold"> Finished: </span> 
      <span data-cy="tournament_finished" className="col-start-3 col-span-4 row-start-4"> {finished} </span>

      <span className="col-start-1 col-span-2 row-start-5 font-semibold"> Entrants: </span> 
      <span data-cy="tournament_entrants" className="col-start-3 col-span-4 row-start-5"> {entrants} </span>

      <span className="col-start-1 col-span-2 row-start-6 font-semibold"> Buyin: </span>
      <span data-cy="tournament_buyin" className="col-start-3 col-span-2 row-start-6"> {buyin}</span>

      <span className="col-start-1 col-span-2 row-start-7 font-semibold"> Cashed: </span>
      <span data-cy="tournament_cashed" className="col-start-3 col-span-2 row-start-7"> {cashed} </span>
    </div>
  );
});

export default Tournament;