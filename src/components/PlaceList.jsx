import { useContext } from "react";
import { PlacesContext } from "../contexts/PlacesProvider";
import Place from "./Place";

export default function PlaceList() {
  const { places } = useContext(PlacesContext);
  return (
    <div className="flex flex-wrap" >
      {places.map(p => <Place key={p.id} {...p} />)}
    </div>
  )
}