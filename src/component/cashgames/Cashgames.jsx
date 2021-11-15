import Cashgame from "./Cashgame";
import NewCashgame from "./NewCashgame";
import CASHGAME_DATA from '../../mock_data/cashgame_mock';
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Cashgames({user, places }) {
  const [cashgames, setCashgames] = useState(CASHGAME_DATA.filter(cash => cash.player_id === user.id));
  const [adder, setAdder] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
  const [earnings, setEarnings] = useState(0);

  const getCashgames = async () => {
    try{
      setError('');
      setLoading(true);
      const response = await axios.get(`http://localhost:9000/api/cashgames/${user.id}`,{
        params: {
          limit: 16,
          offset: 0
        }
      });
      console.log(response.data.data);
      setCashgames(response.data.data);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=> {
    getCashgames();
  }, []);

  const calcEarnings = () => {
    setEarnings(cashgames.reduce((prev, curr) => prev + (curr.out_for - curr.in_for) ,0))
  };
  
  const changeAdder = () => {
    setAdder(!adder);
  }

  const addCashgame = async(c) => {
    c.player_id = user.id;
    try{
      setError('');
      setLoading(true);
      await axios.post(`http://localhost:9000/api/cashgames`, c);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }

    getCashgames();
    setAdder(false);
  }
  const editCashgame = async(c) => {
    c.player_id = user.id;
    try{
      setError('');
      setLoading(true);
      await axios.put(`http://localhost:9000/api/cashgames/${c.id}`, c);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }

    getCashgames();
  }
  const deleteCashgame = async(id) => {
    try{
      setError('');
      setLoading(true);
      await axios.delete(`http://localhost:9000/api/cashgames/${id}`);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }

    getCashgames();
  }

  return(
    <div className="m-2" >
      <span className="text-white" >Cashgames of {user.username}: Total earnings of -TODO--</span>
      <div className="flex text-black flex-wrap">
        {cashgames.map(cash =>
          <Cashgame {...cash} key={cash.id} places={places} editCashgame={editCashgame} deleteCashgame={deleteCashgame} />
        )}
        {adder && <> 
          <NewCashgame places={places} addCashgame={addCashgame} />
          <div>
            <AiOutlineMinus color="black" size={35} className="border-2 border-red-600 rounded-md bg-red-200 m-1 hover:bg-red-600 cursor-pointer rounded-lg" onClick={changeAdder} />
          </div>
        </>
        }
        {!adder && <> 
          <div >
            <AiOutlinePlus color="black" size={35} className="border-2 border-red-600 rounded-md bg-red-200 m-1 hover:bg-red-600 cursor-pointer rounded-lg" onClick={changeAdder} />
          </div>
        </>
        }
      </div>
    </div>

  )
}