import { useCallback, useContext, useMemo } from "react";
import { useHistory } from 'react-router';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs"
import { PlacesContext } from "../contexts/PlacesProvider";

import React from 'react'

const Place = ({ index, id, name, country, website }) => {
  const history = useHistory();
  const { deletePlace, setPlaceToUpdate, currentPlace } = useContext(PlacesContext);

  const handleRemove = useCallback(() => {
    if(window.confirm('Are you sure you want to delete this place')) {
      deletePlace(id);
    }
  });

  const handleUpdate = useCallback(async () => {
    setPlaceToUpdate(id);
    history.push(`/places/edit/${id}`);
  });

  return (
    <tr data-cy="place" className="hover:bg-blue-200 border-t border-gray-500">
        <td data-cy="place_index"><div className="m-2">{index}</div></td>
        <td data-cy="place_name"> <a className="m-2" href={website} target="_blank">{name}</a></td>
        <td data-cy="place_country"><div className="m-2">{country}</div></td>
        <td className="flex m-2">
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

export default function PlaceList({ search }) {
  const history = useHistory();
  const { places, error, loading } = useContext(PlacesContext);

  const filteredPlaces = useMemo(() => {
    return places.filter((t) => {
      return t.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [places, search]);

  return (
    <div className="flex">
      <table data-cy="places" className="text-left bg-blue-300 text-black border-2 border-blue-400 m-5">
        <thead className="bg-gray-200">
          <tr>
            <th className="w-12"><div className="m-2">#</div></th>
            <th className="w-60"><div className="m-2">name (click for website)</div></th>
            <th className="w-40"><div className="m-2">country</div></th>
            <th/>
          </tr>
        </thead>
        <tbody>
          {
            loading? <tr><td colSpan="4">Loading</td></tr> :

            error? <p data-cy="places_error" className="m-2 error" >{JSON.stringify(error, null, 2)}</p> :

            (!filteredPlaces || !filteredPlaces.length)? <tr><td colSpan="4">No places with filter</td></tr> :

            (!places || !places.length)? <tr><td colSpan="4">No places</td></tr> :

            filteredPlaces.map((p, index) => <Place key={p.id} index={index+1} {...p} />)
          }
          
        </tbody>
      </table>
      <div className="m-5">
        <button className="bg-gray-200 hover:bg-gray-300 rounded-md p-2 mt-1" onClick={() => history.push(`/places/add`)}>
            <BsPlusLg size={25} color="black" title="add place" />
        </button>
      </div>
    </div>
    
  )
}