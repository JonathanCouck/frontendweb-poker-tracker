import { AiOutlineCheckCircle } from "react-icons/ai"

export default function Place({places, name, country, city, postal_code, street, house_number, addPlace, adding=false}) {

  const addNewPlace = () => {
    if(checkValues()) {
      addPlace(document.getElementById('name').value, document.getElementById('country').value, document.getElementById('city').value, 
        document.getElementById('postal').value, document.getElementById('street').value, document.getElementById('house').value);
    } else {
      console.log('Bad values for place');
    }
  }
  
  const checkValues = () => {
    let stillOK = true;
    if(document.getElementById('name').value === '' || places.find(pl => pl.name === document.getElementById('name').value)) {
      stillOK = false;
    } else if (document.getElementById('country').value === '') {
      stillOK = false;
    } else if (document.getElementById('postal').value === '') {
      stillOK = false;
    } else if (document.getElementById('city').value === '') {
      stillOK = false;
    } else if (document.getElementById('street').value === '') {
      stillOK = false;
    } else if (document.getElementById('house').value === '') {
      stillOK = false;
    }
    return stillOK
  }

  const editor = () => {
    return (
      <div className="grid grid-cols-5 grid-row-6 border-2 border-yellow-600 rounded-md bg-yellow-200 m-1 text-left p-5 w-96">
        <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> <input type="text" name="name" id="name" className="w-60" /> </b>
        <span className="col-start-1 col-span-2 row-start-2 font-semibold" > Country: </span>
        <span className="col-start-3 col-span-3 row-start-2"> <input type="text" name="country" id="country" className="w-40" /></span>
        <span className="col-start-1 col-span-2 row-start-3 font-semibold" id="lblPostal" > Postal code: </span>
        <span className="col-start-3 col-span-3 row-start-3"> <input type="number" name="postal" id="postal" min="1000" max="99999" className="w-40" /> </span>
        <span className="col-start-1 col-span-2 row-start-4 font-semibold"> City: </span>
        <span className="col-start-3 col-span-3 row-start-4"> <input type="text" name="city" id="city" className="w-40" /> </span>
        <span className="col-start-1 col-span-2 row-start-5 font-semibold"> Street: </span> 
        <span className="col-start-3 col-span-3 row-start-5"> <input type="text" name="street" id="street" className="w-40" /> </span>
        <span className="col-start-1 col-span-2 row-start-6 font-semibold"> House number: </span> 
        <span className="col-start-3 col-span-3 row-start-6"> <input type="number" name="house" id="house" className="w-40" /> </span>
        <AiOutlineCheckCircle className="col-start-5 row-start-1 hover:bg-blue-600 cursor-pointer rounded-lg" color="black" size={25} onClick={addNewPlace} />
      </div>
    )
  }
<input type="text" name="country" id="country" className="w-10" />
  const not_editor = () => {
    return (
      <div className="grid grid-cols-5 grid-row-6 border-2 border-yellow-600 rounded-md bg-yellow-200 m-1 text-left p-5 w-96">
        <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> {name} </b>
        <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Country: </span>
        <span className="col-start-3 col-span-3 row-start-2"> {country}</span>
        <span className="col-start-1 col-span-2 row-start-3 font-semibold"> Postal code: </span>
        <span className="col-start-3 col-span-3 row-start-3"> {postal_code} </span>
        <span className="col-start-1 col-span-2 row-start-4 font-semibold"> City: </span>
        <span className="col-start-3 col-span-3 row-start-4"> {city} </span>
        <span className="col-start-1 col-span-2 row-start-5 font-semibold"> Street: </span> 
        <span className="col-start-3 col-span-3 row-start-5"> {street} </span>
        <span className="col-start-1 col-span-2 row-start-6 font-semibold"> House number: </span> 
        <span className="col-start-3 col-span-3 row-start-6"> {house_number} </span>
      </div>
    )
  }

  return (
    <>
      {adding && editor()}
      {!adding && not_editor()}
    </>
  )
}