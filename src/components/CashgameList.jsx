import React, { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CashgamesContext } from "../contexts/CashgameProvider";
import Cashgame from "./Cashgame";

const plusSing = () => {
  return (
    <Link to="cashgames/add" className="button" >
      <AiOutlinePlus color="black" size={35} className="border-2 border-red-600 rounded-md bg-blue-200 m-1 hover:bg-blue-600 cursor-pointer rounded-lg" />
    </Link>
  )
}

export default function CashgameList() {
  const { cashgames, error, loading } = useContext(CashgamesContext);

  if(loading) return <h1 data-cy="loading"> Loading... </h1>;

  if(error) return(
    <p data-cy="cashgames_error" className="error" >
      {JSON.stringify(error, null, 2)}
    </p>
  );

  if(!cashgames || !cashgames.length) {
    return (
      <p className="info flex flex-row items-center" >
        <span className="flex-1" > There are no cashgames</span>
        {plusSing()}
      </p>
    )
  }

  return (
    <div className="flex text-black flex-wrap" >
      {cashgames.map(cash =>
        <Cashgame key={cash.id} {...cash} />
      )}

      {plusSing()}
    </div>
  )
}