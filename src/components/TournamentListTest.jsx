import Tournament from "./Tournament";
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSession } from "../contexts/AuthProvider";
import * as tournamentsApi from '../api/tournaments';

const plusSing = () => {
  return (
    <Link to="tournaments/add" className="button" >
      <AiOutlinePlus color="black" size={35} className="border-2 border-blue-600 rounded-md bg-blue-200 m-1 hover:bg-blue-600 cursor-pointer rounded-lg" />
    </Link>
  )
}

export default function TournamentList() {
  const { user } = useSession();
  console.log(user)
  const [tournaments, setTournaments] = useState([]);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
  
  const getTournaments = async () => {
    try{
      setError('');
      setLoading(true);
      setTournaments(tournamentsApi.getTournaments())
      console.log(response.data.data);
      setTournaments(response.data.data);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=> {
    getTournaments();
  }, []);
  
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

  return(
    <div className="m-2 flex text-black flex-wrap" >
      {tournaments.map(tour =>
        <Tournament {...tour} places={places} key={tour.id} editTournament={editTournament} deleteTournament={deleteTournament} />
      )}
      {plusSing()}
    </div>
  )
}