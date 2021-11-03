import Place from "../places/Place";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";

export default function Places({places, addPlace}) {

  const [addingPlace, setAddingPlace] = useState(false);

  const adding = () => {
    setAddingPlace(!addingPlace)
  }
  
  const addNewPlace = ( name, country, city, postal_code, street, house_number ) => {
    setAddingPlace(false);
    addPlace( name, country, city, postal_code, street, house_number );
  }

  return(
    <div className="m-2" >
    <span className="text-white"> Saved places across the platform: </span>
      <div className="flex text-black flex-wrap">
        {places.map(place =>
          <Place places={places} {...place}/>
        )}
        {/*addingPlace && 
        <> 
          <Place places={places} adding={true} addPlace={addNewPlace} />
          <div >
            <AiOutlineMinus color="black" size={35} className="border-2 border-yellow-600 rounded-md bg-yellow-200 m-1 hover:bg-yellow-600 cursor-pointer rounded-lg" onClick={adding} />
          </div>
        </>
        }
        {!addingPlace &&
        <div >
          <AiOutlinePlus color="black" size={35} className="border-2 border-yellow-600 rounded-md bg-yellow-200 m-1 hover:bg-yellow-600 cursor-pointer rounded-lg" onClick={adding} />
        </div>*/}
      </div>
    </div>
  )
}