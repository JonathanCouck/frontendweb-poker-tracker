import { useContext, useEffect, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Link, useParams, useHistory } from "react-router-dom";
import { useTournaments } from "../contexts/TournamentsProvider";
import { PlacesContext } from "../contexts/PlacesProvider";
import LabelInput from "../components/LabelInput";
import LabelSelect from "../components/LabelSelect";

const validationRules = {
  date: { required: true },
  place: { required: true },
  entrants: {
    required: true,
    min: { value: 2, message: "min 2"},
  },
  finished: {
    required: true,
    min: { value: 2, message: "min 2"},
  },
  buyin: {
    required: true,
    min: { value: 1, message: "min 1"},
  },
  cashed: {
    required: true,
    min: { value: 0, message: "min 0"},
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

export default function TournamentForm() {
  const { id } = useParams();
  const history = useHistory();
  const methods = useForm();

  const {
    handleSubmit,
    reset,
    setValue,
  } = methods;
  const {
    currentTournament,
    setTournamentToUpdate,
    createOrUpdateTournament,
  } = useTournaments();

  const { places } = useContext(PlacesContext);

  useEffect(() => {
    if (
      currentTournament &&
      (Object.keys(currentTournament).length !== 0 || currentTournament.constructor !== Object) 
    ) {
      const dateAsString = toDateInputString(new Date(currentTournament));
      setValue("user", currentTournament.user.id);
      setValue("date", dateAsString);
      setValue("place", currentTournament.place.id);
      setValue("entrants", currentTournament.entrants);
      setValue("finished", currentTournament.finished);
      setValue("buyin", currentTournament.buyin);
      setValue("cashed", currentTournament.cashed);
    } else {
      reset();
    }
  }, [currentTournament, setValue, reset]);

  useEffect(() => {
    setTournamentToUpdate(id);
  }, [id, setTournamentToUpdate]);

  const onSubmit = useCallback( async(data) => {
    try {
      await createOrUpdateTournament({
        id:currentTournament?.id,
        user: data.user,
        date: new Date(data.date),
        placeId: data.place,
        entrants: data.entrants,
        finished: data.finished,
        buyin: data.buyin,
        cashed: data.cashed,
      });
      setTournamentToUpdate(null);
      history.push("/tournaments");
    } catch(error) {
      console.error(error);
    }
  }, [
    createOrUpdateTournament, 
    currentTournament?.id, 
    setTournamentToUpdate, 
    history
  ]);

  return (
    <FormProvider {...methods} >
      <div className="font-semibold m-2">{currentTournament?.id? "Edit": "Add"} tournament:</div>
      <form onSubmit={handleSubmit(onSubmit)} className="m-2">
        <div>
          <LabelInput 
            label="date"
            type="date"
            defaultValue={toDateInputString(new Date())}
            validation={validationRules.date}
            data-cy="date_input" />
          <LabelInput 
            label="entrants"
            type="number"
            defaultValue={0}
            validation={validationRules.entrants}
            data-cy="entrants_input" />
          <LabelInput 
            label="finished"
            type="number"
            defaultValue={0}
            validation={validationRules.finished}
            data-cy="finished_input" />
          <LabelInput 
            label="buyin"
            type="number"
            defaultValue={0}
            validation={validationRules.buyin}
            data-cy="buyin_input" />
          <LabelInput 
            label="cashed"
            type="number"
            defaultValue={0}
            validation={validationRules.cashed}
            data-cy="cashed_input" />
          <LabelSelect 
            label="place"
            options={places}
            validation={validationRules.place}
            data-cy="place_input" />

          <div className="flex">
            <button className="text-black p-2 m-1 border-2 bg-gray-200 border-gray-400 font-semibold hover:bg-gray-400" type="submit" data-cy="submit_tournament">
              {
                currentTournament?.id ? "Save tournament"
                  : "Add tournament"
              }
            </button>
            <Link className="text-black button p-2 m-1 border-2 bg-gray-200 border-gray-400 font-semibold hover:bg-gray-400" to="/tournaments">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}