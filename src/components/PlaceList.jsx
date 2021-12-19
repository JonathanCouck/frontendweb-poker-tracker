import { useContext, useMemo } from "react";
import { PlacesContext } from "../contexts/PlacesProvider";
import Place from "./Place";
import { useTranslation } from "react-i18next";

export default function PlaceList({ search }) {
  const { t } = useTranslation();
  const { places, error, loading } = useContext(PlacesContext);

  const filteredPlaces = useMemo(() => {
    return places.filter((t) => {
      return t.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [places, search]);

  if(loading) return <h1 data-cy="loading"> {t('loading')} </h1>;

  if(error) return(
    <p data-cy="places_error" className="m-2 error" >
      {JSON.stringify(error, null, 2)}
    </p>
  );

  if(!filteredPlaces || !filteredPlaces.length) {
    return (
      <> 
        <p className="m-2 flex flex-row items-center" >
          <span className="flex-1" > {t('noPlacesFilter')} </span>
        </p>
      </>
    )
  }

  if(!places || !places.length) {
    return (
      <> 
        <p className="m-2 flex flex-row items-center" >
          <span className="flex-1" > {t('noPlaces')} </span>
        </p>
      </>
    )
  }

  return (
    <div data-cy="places" className="flex flex-wrap" >
      {filteredPlaces.map(p => <Place key={p.id} {...p} />)}
    </div>
  )
}