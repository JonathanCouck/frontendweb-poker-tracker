import { useState, useCallback } from "react";
import PlaceList from "../components/PlaceList";

export default function Places() {

  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  const handleInputChange = useCallback((e) => setText(e.target.value), []);
  const handleSearch = useCallback(() => setSearch(text), [text]);

  return (
    <div className="m-5">
      <h1 className="font-semibold text-2xl">Places</h1>
      <div className="m-5">
        <input 
          data-cy="places_search_input"
          type="search"
          value={text}
          onChange={handleInputChange}
          placeholder='Search'
          className="text-black p-1 rounded-md"
        />
        <button type="button" data-cy="tournaments_search_btn" className="pr-2 pl-2 m-1 border-2 bg-gray-200 border-gray-400 rounded-md font-semibold text-black hover:bg-gray-400" onClick={handleSearch}>
          Search
        </button>
      </div>

      <PlaceList search={search} />

    </div>
  );
}