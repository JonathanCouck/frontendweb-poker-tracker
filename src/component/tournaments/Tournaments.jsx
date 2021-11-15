import Tournament from "./Tournament";
import NewTournament from "./NewTournament";
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Tournaments({ user, places }) {
  const [tournaments, setTournaments] = useState([]);
  const [adder, setAdder] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
  const [earnings, setEarnings] = useState(0);
  
  const getTournaments = async () => {
    try{
      setError('');
      setLoading(true);
      const response = await axios.get(`http://localhost:9000/api/tournaments/${user.id}`,{
        params: {
          limit: 16,
          offset: 0
        }
      });
      console.log(response.data.data);
      setTournaments(response.data.data);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=> {
    getTournaments();
  }, []);

  const calcEarnings = () => {
    setEarnings(tournaments.reduce((prev, curr) => prev + (curr.cashed - curr.buyin) ,0));
  }

  const changeAdder = () => {
    setAdder(!adder)
  }

  const addTournament = async(t) => {
    t.player_id = user.id;
    try{
      setError('');
      setLoading(true);
      await axios.post(`http://localhost:9000/api/tournaments`, t);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }

    getTournaments();
    setAdder(false);
  }
  const editTournament = async(t) => {
    t.player_id = user.id;
    try{
      setError('');
      setLoading(true);
      await axios.put(`http://localhost:9000/api/tournaments/${t.id}`, t);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }

    getTournaments();
  }

  const deleteTournament = async(id) => {
    try{
      setError('');
      setLoading(true);
      await axios.delete(`http://localhost:9000/api/tournaments/${id}`);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }

    getTournaments();
  }

  return(
    <div className="m-2" >
      <span className="text-white" >Tournaments of {user.username}: Total earnings of --TODO--</span>
      <div className="flex text-black flex-wrap">
        {tournaments.map(tour =>
          <Tournament {...tour} places={places} key={tour.id} editTournament={editTournament} deleteTournament={deleteTournament} />
        )}
        {adder && 
        <> 
          <NewTournament places={places} addTournament={addTournament} />
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