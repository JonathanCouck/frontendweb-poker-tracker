import Place from "../places/Place";

export default function Places({places}) {

  return(
    <div className="m-2" >
    <span className="text-white"> Saved places across the platform: </span>
      <div className="flex text-black flex-wrap">
        {places.map(place =>
          <Place {...place}/>
        )}
      </div>
    </div>
  )
}