import React, { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { TournamentsContext } from "../contexts/TournamentsProvider";
import Tournament from "./Tournament";

const plusSing = () => {
  return (
    <Link to="tournaments/add" className="button" >
      <AiOutlinePlus color="black" size={35} className="border-2 border-blue-600 rounded-md bg-blue-200 m-1 hover:bg-blue-600 cursor-pointer rounded-lg" />
    </Link>
  )
}

export default function TournamentList() {
  const { tournaments, error, loading } = useContext(TournamentsContext);
  if(loading) return <h1 data-cy="loading"> Loading... </h1>;
  
  if(error) return(
    <p data-cy="tournaments_error" className="m-2 error" >
      {JSON.stringify(error, null, 2)}
    </p>
  );
  
  if(!tournaments || !tournaments.length) {
    return (
      <> 
        <p className="m-2 flex flex-row items-center" >
          <span className="flex-1" > There are no tournaments</span>
        </p>
        <div>
          {plusSing()}
        </div>
      </>
    )
  }

  return (
    <div className="flex text-black flex-wrap" >
      {tournaments.map(tour =>
        <Tournament key={tour.id} {...tour} />
      )}

      {plusSing()}
    </div>
  )
}