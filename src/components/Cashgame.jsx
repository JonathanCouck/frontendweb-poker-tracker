import { memo, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { CashgamesContext } from "../contexts/CashgamesProvider";
import { useTranslation } from 'react-i18next';

const Cashgame = memo(({id, date, place, inFor, outFor, smallBlind, bigBlind}) => {
  const { t } = useTranslation();
  const { deleteCashgame } = useContext(CashgamesContext);

  const handleRemove = useCallback(() => {
    deleteCashgame(id);
  }, [deleteCashgame, id]);

  return(
    <div data-cy="cashgame" className="grid grid-cols-8 grid-row-7 border-2 border-blue-600 rounded-md bg-blue-200 m-1 text-left p-5 w-96">

      <b className="col-start-1 col-span-5 row-start-1 row-span-1 pb-2 text-lg pb-5"> {t('cashgame')} </b>
      
      <Link data-cy="cashgame_edit_btn" to={`/cashgames/edit/${id}`} className="button col-start-7 row-start-1" >
        <AiFillEdit color="black" size={25} className="rounded-md m-1 hover:bg-blue-600 cursor-pointer rounded-lg" />
      </Link>

      <button data-cy="cashgame_remove_btn" onClick={handleRemove} className="col-start-8 row-start-1" >
        <AiFillDelete color="black" size={25} className="rounded-md m-1 hover:bg-blue-600 cursor-pointer rounded-lg" />
      </button>

      <span className="col-start-1 col-span-3 row-start-2 font-semibold"> {t('date')}: </span> 
      <span data-cy="cashgame_date" className="col-start-4 col-span-4 row-start-2">
        {new Date(date).toLocaleDateString("nl-BE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })} 
      </span>

      <span className="col-start-1 col-span-3 row-start-3 font-semibold"> {t('place')}: </span> 
      <span data-cy="cashgame_place" className="col-start-4 col-span-4 row-start-3"> {place} </span>

      <span className="col-start-1 col-span-3 row-start-4 font-semibold"> {t('smallBlind')}: </span> 
      <span data-cy="cashgame_small_blind" className="col-start-4 col-span-4 row-start-4"> {smallBlind} </span>

      <span className="col-start-1 col-span-3 row-start-5 font-semibold"> {t('bigBlind')}: </span> 
      <span data-cy="cashgame_big_blind" className="col-start-4 col-span-4 row-start-5">  {bigBlind} </span>

      <span className="col-start-1 col-span-3 row-start-6 font-semibold"> {t('inFor')}: </span>
      <span data-cy="cashgame_in_for" className="col-start-4 col-span-4 row-start-6"> {inFor} </span>

      <span className="col-start-1 col-span-3 row-start-7 font-semibold"> {t('outFor')}: </span> 
      <span data-cy="cashgame_out_for" className="col-start-4 col-span-4 row-start-7"> {outFor} </span> 
    </div>
  );

});

export default Cashgame;