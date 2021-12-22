import React, { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { TournamentsContext } from "../contexts/TournamentsProvider";
import Tournament from "./Tournament";
import { useTranslation } from "react-i18next";


const plusSing = () => {
  return (
    <Link to="tournaments/add" className="button" data-cy="add_tournament">
      <AiOutlinePlus color="black" size={35} className="border-2 border-blue-600 rounded-md bg-blue-200 m-1 hover:bg-blue-600 cursor-pointer rounded-lg" />
    </Link>
  )
}

export default function TournamentList() {
  const { t } = useTranslation();
  const { tournaments, page, error, loading } = useContext(TournamentsContext);
  if(loading) return <h1 data-cy="loading"> {t('loading')} </h1>;
  
  if(error) return(
    <p data-cy="tournaments_error" className="m-2 error" >
      {JSON.stringify(error, null, 2)}
    </p>
  );
  
  if(!tournaments || !tournaments.length) {
    return (
      <> 
        <p className="m-2 flex flex-row items-center" >
          <span className="flex-1" > {t('noTournaments')} </span>
        </p>
        <div>
          {plusSing()}
        </div>
      </>
    )
  }

  return (
    <div>
      <div className="flex text-black flex-wrap" >
        {tournaments.map(tour => 
          <Tournament key={tour.id} buyin={tour.buyin} cashed={tour.cashed} entrants={tour.entrants} finished={tour.finished} id={tour.id} place={tour.place.name} date={tour.date} />
        )}

        {plusSing()}
      </div>
      
      <div className="flex">
        <IoMdArrowDropleftCircle color="#bfdbfe" size={35} />
        <span className="text-blue-200 m-1 text-lg">{(page+1)}</span>
        <IoMdArrowDroprightCircle color="#bfdbfe" size={35} />
      </div>
    </div>
  )
}