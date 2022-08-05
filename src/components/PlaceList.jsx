import { useCallback, useMemo } from "react";
import { useHistory } from 'react-router';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { usePlaces } from "../contexts/PlacesProvider";

import React from 'react'
import { useSession } from "../contexts/AuthProvider";

const Place = ({ index, id, name, country, city, website }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { hasRole } = useSession();
  const { deletePlace, setPlaceToUpdate } = usePlaces();

  const handleRemove = useCallback(() => {
    if(window.confirm(t('Places.sure'))) {
      deletePlace(id);
    }
  });

  const handleUpdate = useCallback(async () => {
    setPlaceToUpdate(id);
    history.push(`/places/edit/${id}`);
  });

  return (
    <tr data-cy="place" className="hover:bg-blue-400 border-t border-gray-500">
        <td className="p-2 border-r border-gray-200" data-cy="place_index"> {index} </td>
        <td className="p-2 border-r border-gray-200" data-cy="place_name"> <a href={website} target="_blank">{name}</a> </td>
        <td className="p-2 border-r border-gray-200" data-cy="place_country"> {country} </td>
        <td className="p-2 border-r border-gray-200" data-cy="place_city"> {city} </td>
        { hasRole('admin') &&
          <td className="flex p-2">
            <button data-cy="place_edit_btn" onClick={handleUpdate}>
              <AiFillEdit size={22} color="black" title={t('Places.edit')} />
            </button>
            <button data-cy="place_delete_btn" onClick={handleRemove}>
              <AiFillDelete size={22} color="black" title={t('Places.delete')} />
            </button>
          </td>
        }
    </tr>
  )
}

export default function PlaceList({ search }) {
  const { t } = useTranslation();
  const history = useHistory();
  const { places, error, loading } = usePlaces();
  const { hasRole } = useSession();

  const filteredPlaces = useMemo(() => {
    return places.filter((t) => {
      return t.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [places, search]);

  return (
    <div className="flex m-5 text-black">
      <table className='text-left border-2 border-white'>
        <thead>
          <tr className='bg-gray-400'>
            <th className="w-12"><div className="m-2">#</div></th>
            <th className="w-60"><div className="m-2">{t('Places.name')} ({t('Places.clickForWebsite')})</div></th>
            <th className="w-40"><div className="m-2">{t('Places.country')}</div></th>
            <th className="w-40"><div className="m-2">{t('Places.city')}</div></th>
            {
              hasRole('admin') && <th/>
            }
          </tr>
        </thead>
        <tbody className="bg-blue-300">
          {
            loading? <tr><td colSpan="4" className='p-2 font-semibold'>{t('Places.loading')}</td></tr> :

            error? <p data-cy="places_error" className="m-2 error" >{JSON.stringify(error, null, 2)}</p> :

            (!filteredPlaces || !filteredPlaces.length)? <tr><td colSpan="4" className='p-2 font-semibold'>{t('Places.noPlacesFilter')}</td></tr> :

            (!places || !places.length)? <tr><td colSpan="4" className='p-2 font-semibold'>{t('Places.noPlaces')}</td></tr> :

            filteredPlaces.map((p, index) => <Place key={p.id} index={index+1} {...p} />)
          }
          
        </tbody>
      </table>
      {hasRole('admin') &&
        <div className="m-5">
          <button data-cy="add_place" className="bg-gray-300 hover:bg-gray-400 rounded-md p-2 mt-1" onClick={() => history.push(`/places/add`)}>
              <BsPlusLg size={25} color="black" title={t('Places.add')} />
          </button>
        </div>
      }
    </div>
    
  )
}