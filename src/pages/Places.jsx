import { useState, useCallback } from "react";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import PlaceList from "../components/PlaceList";

export default function Places() {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  const handleInputChange = useCallback((e) => setText(e.target.value), []);
  const handleSearch = useCallback(() => setSearch(text), [text]);

  return (
    <>
      <h1>Places</h1>
      <div>
        <input 
          data-cy="places_search_input"
          type="search"
          value={text}
          onChange={handleInputChange}
          placeholder="Search"
        />
        <button type="button" data-cy="transactions_search_btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div>
        <PlaceList search={search} />
      </div>
    </>
  );
}