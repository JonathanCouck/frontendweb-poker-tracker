import { useState, useCallback } from "react";
import PlaceList from "../components/PlaceList";

export default function Places() {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  const handleInputChange = useCallback((e) => setText(e.target.value), []);
  const handleSearch = useCallback(() => setSearch(text), [text]);

  return (
    <>
      <h1 className="m-2 text-lg font-semibold">Places</h1>
      <div className="m-2">
        <input 
          data-cy="places_search_input"
          type="search"
          value={text}
          onChange={handleInputChange}
          placeholder="Search"
        />
        <button type="button" data-cy="tournaments_search_btn" className="pr-2 pl-2 m-1 border-2 bg-gray-200 border-gray-400 font-semibold text-black hover:bg-gray-400" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div>
        <PlaceList search={search} />
      </div>
    </>
  );
}