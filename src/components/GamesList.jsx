import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsPlusLg } from 'react-icons/bs'
import { useGames } from "../contexts/GamesProvider";
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

const Game = ({id, place, type, inFor, outFor, par1, par2, date, index}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { deleteGame, setGameToUpdate, currentGame} = useGames();

  const handleRemove = useCallback(() => {
    if(window.confirm(t('Games.sure'))) {
      deleteGame(id);
    }
  });

  const handleUpdate = useCallback(async () => {
    setGameToUpdate(id);
    history.push(`/games/edit/${id}`);
  });

  return (
    <tr data-cy="game" className={`p-2 border-t border-gray-500 ${inFor<outFor?'bg-green-300 hover:bg-green-400':'bg-red-300 hover:bg-red-400'}`}>
      <td data-cy="game_index" className='p-2 border-r border-gray-200'>{index}</td>
      <td data-cy="game_date" className='p-2 border-r border-gray-200'>
        {new Date(date).toLocaleDateString("nl-BE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </td>
      <td data-cy="game_place" className='p-2 border-r border-gray-200'><a data-cy="game_website" href={place.website} target="_blank">{place.name}</a></td>
      <td data-cy="game_type" className='p-2 border-r border-gray-200'>{type}</td>
      <td data-cy="game_inFor" className='p-2 border-r border-gray-200'>{inFor}</td>
      <td data-cy="game_outFor" className='p-2 border-r border-gray-200'>{outFor}</td>
      <td data-cy="game_par1_tour" className='p-2 border-r border-gray-200'>{type=='TOUR'?`${par1} / ${par2}`:'-'}</td>
      <td data-cy="game_par2_cash" className='p-2 border-r border-gray-200'>{type=='CASH'?`${par1} / ${par2}`:'-'}</td>
      <td className="flex p-2">
        <button data-cy="game_edit_btn" onClick={handleUpdate}>
          <AiFillEdit size={22} color="black" title={t('Games.edit')} />
        </button>
        <button data-cy="game_delete_btn" onClick={handleRemove}>
          <AiFillDelete size={22} color="black" title={t('Games.delete')} />
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
            <button className={`w-32 py-1 font-semibold rounded-tl-lg ${filter==='ALL'?'bg-gray-400':''} hover:bg-gray-400`} id='huurder' onClick={() => setFilter('ALL')}>{t('Games.allGames')}</button>
            <button className={`w-32 py-1 font-semibold ${filter==='CASH'?'bg-gray-400':''} hover:bg-gray-400`} id='verhuurder' onClick={() => setFilter('CASH')}>{t('Games.cashgames')}</button>
            <button className={`w-32 py-1 font-semibold rounded-tr-lg ${filter==='TOUR'?'bg-gray-400':''} hover:bg-gray-400`} id='admin' onClick={() => setFilter('TOUR')}>{t('Games.tournaments')}</button>
        </div>
        <table className='text-left border-2 border-white'>
          <thead>
            <tr className='bg-gray-400'>
              <th className='w-12 p-2'>#</th>
              <th className='w-32 p-2'>{t('Games.date')}</th>
              <th className='w-52 p-2'>{t('Games.place')} ({t('Games.clickForWebsite')})</th>
              <th className='w-16 p-2'>{t('Games.type')}</th>
              <th className='w-20 p-2'>{t('Games.in')} (€)</th>
              <th className='w-20 p-2'>{t('Games.out')} (€)</th>
              <th className='w-52 p-2'>{t('Games.finished')} / {t('Games.entrants')}</th>
              <th className='w-20 p-2'>{t('Games.sb')} / {t('Games.bb')}</th>
              <th className='w-16 p-2'/>
            </tr>
          </thead>
          <tbody className={`bg-blue-300`}>
          { 
          
            loading? <tr><td colSpan="9" className='p-2 font-semibold'>{t('Games.loading')}</td></tr> :
            (!filteredGames || !filteredGames.length)? <tr><td colSpan="9" className='p-2 font-semibold'>{t('Games.noGames')}</td></tr> :

            filteredGames.map((g, index) => <Game key={g.id} index={index+1} {...g}/>)
          }
          <tr className='bg-gray-300 border-t border-gray-500'>
            <td colSpan={4} className='p-2 font-semibold'>{t('Games.total')}:</td>
            <td className='p-2'>{filteredGames.reduce((t, g) => t+g.inFor, 0)}</td>
            <td className='p-2'>{filteredGames.reduce((t, g) => t+g.outFor, 0)}</td>
            <td colSpan={3}/>
          </tr>
          </tbody>
        </table>
      </div>
      <div className="mx-5 my-12">
        <button data-cy="add_game" className="bg-gray-300 hover:bg-gray-400 rounded-md p-2 mt-1" onClick={() => history.push(`/games/add`)}>
            <BsPlusLg size={25} color="black" title={t('Games.add')} />
        </button>
      </div>
    </div>
    
  )
}

export default GamesList