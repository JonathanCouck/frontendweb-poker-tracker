import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsPlusLg } from 'react-icons/bs'
import { useGames } from "../contexts/GamesProvider";

const Game = ({id, place, type, inFor, outFor, par1, par2, date, index}) => {
  const history = useHistory();
  const { deleteGame, setGameToUpdate, currentGame} = useGames();

  const handleRemove = useCallback(() => {
    if(window.confirm('Are you sure you want to delete this place')) {
      deleteGame(id);
    }
  });

  const handleUpdate = useCallback(async () => {
    setGameToUpdate(id);
    history.push(`/games/edit/${id}`);
  });

  return (
    <tr className={`p-2 border-t border-gray-500 ${type==='CASH'?'bg-red-300 hover:bg-red-400':'bg-blue-300 hover:bg-blue-400'}`}>
      <td className='p-2 border-r border-gray-200'>{index}</td>
      <td className='p-2 border-r border-gray-200'>
        {new Date(date).toLocaleDateString("nl-BE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </td>
      <td className='p-2 border-r border-gray-200'><a href={place.website} target="_blank">{place.name}</a></td>
      <td className='p-2 border-r border-gray-200'>{type}</td>
      <td className='p-2 border-r border-gray-200'>{inFor}</td>
      <td className='p-2 border-r border-gray-200'>{outFor}</td>
      <td className='p-2 border-r border-gray-200'>{type=='TOUR'?`${par1} / ${par2}`:'-'}</td>
      <td className='p-2 border-r border-gray-200'>{type=='CASH'?`${par1} / ${par2}`:'-'}</td>
      <td className="flex p-2">
        <button data-cy="game_edit_btn" onClick={handleUpdate}>
          <AiFillEdit size={22} color="black" title="edit" />
        </button>
        <button data-cy="game_remove_btn" onClick={handleRemove}>
          <AiFillDelete size={22} color="black" title="delete" />
        </button>
      </td>
    </tr>
  )
}


const GamesList = () => {
  const history = useHistory();
  const { games, loading, error } = useGames();
  const [filter, setFilter] = useState('ALL')

  const filteredGames = useMemo(() => {
    let filteredGames = structuredClone(games)
    if(filter !== 'ALL') {
      filteredGames = filteredGames.filter(g => {
        if(g.type===filter){
          return true;
        } 
        return false;
      })
    }
    
    return filteredGames;
  }, [games, filter])

  return (
    <div className='flex'>
      <div className='text-black m-5'>
        <div className='bg-gray-300 flex w-min rounded-t-lg border-white divide-x-2'>
            <button className={`w-28 py-1 font-semibold rounded-tl-lg ${filter==='ALL'?'bg-gray-400':''} hover:bg-gray-400`} id='huurder' onClick={() => setFilter('ALL')}>All games</button>
            <button className={`w-28 py-1 font-semibold ${filter==='CASH'?'bg-gray-400':''} hover:bg-gray-400`} id='verhuurder' onClick={() => setFilter('CASH')}>Cashgames</button>
            <button className={`w-28 py-1 font-semibold rounded-tr-lg ${filter==='TOUR'?'bg-gray-400':''} hover:bg-gray-400`} id='admin' onClick={() => setFilter('TOUR')}>Tournaments</button>
        </div>
        <table className='text-left border-2 border-white'>
          <thead>
            <tr className='bg-gray-400'>
              <th className='w-12 p-2'>#</th>
              <th className='w-32 p-2'>Date</th>
              <th className='w-52 p-2'>Place (click for website)</th>
              <th className='w-16 p-2'>Type</th>
              <th className='w-20 p-2'>In (€)</th>
              <th className='w-20 p-2'>Out (€)</th>
              <th className='w-40 p-2'>Place / Entrants</th>
              <th className='w-20 p-2'>SB / BB</th>
              <th className='w-16 p-2'/>
            </tr>
          </thead>
          <tbody className={`bg-${filter==='CASH'?'red':filter==='TOUR'?'blue':'purple'}-300`}>
          { 
          
            loading? <tr><td colSpan="9" className='p-2 font-semibold'>Loading</td></tr> :
            (!filteredGames || !filteredGames.length)? <tr><td colSpan="9" className='p-2 font-semibold'>No games</td></tr> :

            filteredGames.map((g, index) => <Game key={g.id} index={index+1} {...g}/>)
          }
          <tr className='bg-gray-300'>
            <td colSpan={4} className='p-2 font-semibold'>TOTAL:</td>
            <td className='p-2'>{filteredGames.reduce((t, g) => t+g.inFor, 0)}</td>
            <td className='p-2'>{filteredGames.reduce((t, g) => t+g.outFor, 0)}</td>
            <td colSpan={3}/>
          </tr>
          </tbody>
        </table>
      </div>
      <div className="mx-5 my-12">
        <button className="bg-gray-300 hover:bg-gray-400 rounded-md p-2 mt-1" onClick={() => history.push(`/games/add`)}>
            <BsPlusLg size={25} color="black" title="add place" />
        </button>
      </div>
    </div>
    
  )
}

export default GamesList