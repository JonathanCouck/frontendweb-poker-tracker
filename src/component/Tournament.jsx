export default function Tournament(props) {
  const { entrants, finished, buyin, cashed, date } = props;

  return (
    <div className="grid grid-cols-6 grid-row-6 border-2 border-blue-500 rounded-md bg-blue-200 m-1 text-left p-3 w-80">
      <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg"> Tournament </b>
      <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Finished: </span> 
      <span className="col-start-3 col-span-4 row-start-2"> {finished} / {entrants} </span>
      <span className="col-start-1 col-span-2 row-start-3 font-semibold"> Buyin: </span>
      <span className="col-start-3 col-span-2 row-start-3"> $ {buyin}</span>
      <span className="col-start-1 col-span-2 row-start-4 font-semibold"> Cashed: </span>
      <span className="col-start-3 col-span-2 row-start-4"> $ {cashed} </span>
      <span className="col-start-1 col-span-2 row-start-5 font-semibold"> Date: </span> 
      <span className="col-start-3 col-span-4 row-start-5"> {date.substring(0,10)} </span>
    </div>
  )
};
