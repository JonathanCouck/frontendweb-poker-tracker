import React, { useContext, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { CashgamesContext } from "../contexts/CashgamesProvider";
import Cashgame from "./Cashgame";
import { useTranslation } from "react-i18next";

const plusSing = () => {
  return (
    <Link to="cashgames/add" className="button" >
      <AiOutlinePlus color="black" size={35} className="border-2 border-blue-600 rounded-md bg-blue-200 m-1 hover:bg-blue-600 cursor-pointer rounded-lg" />
    </Link>
  )
}

export default function CashgameList() {
  const { t } = useTranslation();
  const { cashgames, error, loading, page } = useContext(CashgamesContext);

  if(loading) return <h1 data-cy="loading"> Loading </h1>;

  if(error) return(
    <p data-cy="cashgames_error" className="m-2 error" >
      {JSON.stringify(error, null, 2)}
    </p>
  );

  if(!cashgames || !cashgames.length) {
    return (
      <> 
        <p className="m-2 flex flex-row items-center" >
          <span className="flex-1" > No Cashgames </span>
        </p>
        <div>
          {plusSing()}
        </div>
      </>
    )
  }

  return (
    <div>
      <div className="flex text-black flex-wrap">
        {cashgames.map(cash =>
          <Cashgame key={cash.id}  
          smallBlind={cash.smallBlind}
          bigBlind={cash.bigBlind}
          inFor={cash.inFor}
          outFor={cash.outFor}
          date={cash.date}
          id={cash.id}
          place={cash.place.name}/>
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