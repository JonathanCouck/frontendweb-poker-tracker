import { useContext, useEffect, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Link, useParams, useHistory } from "react-router-dom";
import { useCashgames } from "../contexts/CashgamesProvider";
import { PlacesContext } from "../contexts/PlacesProvider";
import { useSession } from "../contexts/AuthProvider";

import LabelInput from "../components/LabelInput";
import LabelSelect from "../components/LabelSelect";

const validationRules = {
  date: { required: "this is required" },
  place: { required: "this is required" },
  bigBlind: { 
    required: "this is required",
    min: {value: 1, message: "min 1"},
  },
  smallBlind: { 
    required: "this is required",
    min: {value: 1, message: "min 1"},
  },
  inFor: { 
    required: "this is required",
    min: {value: 1, message: "min 1"},
  },
  outFor: { 
    required: "this is required",
    min: {value: 1, message: "min 1"},
  },
}

const toDateInputString = (date) => {
  if(!date) return null;
  if(typeof date !== Object) {
    date = new Date(date);
  }
  const asString = date.toISOString();
  return asString.substring(0, asString.indexOf("T"));
}

export default function CashgameForm() {
  const { id } = useParams();
  const { user } = useSession();
  const history = useHistory();
  const methods = useForm();

  const {
    handleSubmit,
    reset,
    setValue,
  } = methods;

  const {
    currentCashgame,
    setCashgameToUpdate,
    createOrUpdateCashgame,
  } = useCashgames();

  const { places } = useContext(PlacesContext);

  useEffect(() => {
    if (
      currentCashgame && 
      (Object.keys(currentCashgame).length !== 0 || currentCashgame.constructor !== Object)
    ) {
      const dateAsString = toDateInputString(new Date(currentCashgame.date));
      setValue("user", user.id);
      setValue("date", dateAsString);
      setValue("place", currentCashgame.place.id);
      setValue("inFor", currentCashgame.inFor);
      setValue("outFor", currentCashgame.outFor);
      setValue("smallBlind", currentCashgame.smallBlind);
      setValue("bigBlind", currentCashgame.bigBlind);
    } else {
      reset();
    }
  }, [currentCashgame, setValue, reset]);

  useEffect(() => {
    setCashgameToUpdate(id);
  }, [id, setCashgameToUpdate]);

  const onSubmit = useCallback( async(data) => {
    try {
      await createOrUpdateCashgame({
        id:currentCashgame?.id,
        date: new Date(data.date),
        placeId: data.place,
        inFor: data.inFor,
        outFor: data.outFor,
        smallBlind: data.smallBlind,
        bigBlind: data.bigBlind,
      });
      setCashgameToUpdate(null);
      history.push("/cashgames");
    } catch(error) {
      console.error(error);
    }
  }, [
    createOrUpdateCashgame, 
    currentCashgame?.id, 
    setCashgameToUpdate, 
    history
  ]);

  return (
    <FormProvider {...methods}>
      <div className="font-semibold m-2">{currentCashgame?.id? 'Edit cashgame': 'Add cashgame'}:</div>
      <form onSubmit={handleSubmit(onSubmit)} className="m-2">
      <div>
          <LabelInput 
            label="date"
            type="date"
            defaultValue={toDateInputString(new Date())}
            validation={validationRules.date}
            data-cy="date_input" />
          <LabelInput 
            label="inFor"
            type="number"
            defaultValue={0}
            validation={validationRules.inFor}
            data-cy="in_for_input" />
          <LabelInput 
            label="outFor"
            type="number"
            defaultValue={0}
            validation={validationRules.outFor}
            data-cy="out_for_input" />
          <LabelInput 
            label="smallBlind"
            type="number"
            defaultValue={0}
            validation={validationRules.smallBlind}
            data-cy="small_blind_input" />
          <LabelInput 
            label="bigBlind"
            type="number"
            defaultValue={0}
            validation={validationRules.bigBlind}
            data-cy="big_blind_input" />
          <LabelSelect 
            label="place"
            options={places}
            validation={validationRules.place}
            data-cy="place_input" />

          <div className="flex">
            <button className="text-black p-2 m-1 border-2 bg-gray-200 border-gray-400 font-semibold hover:bg-gray-400" type="submit" data-cy="submit_cashgame">
              {
                currentCashgame?.id ? 'Save cashgame'
                  : 'Add cashgame'
              }
            </button>
            <Link className="text-black button p-2 m-1 border-2 bg-gray-200 border-gray-400 font-semibold hover:bg-gray-400" to="/cashgames">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}