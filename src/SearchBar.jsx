import React, { useState } from "react";

const SearchBar = ({ weatherCall }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(query);
    weatherCall(query);
    setQuery("");
  };
  return (
    <>
      <form className="d-flex gap-3 search-form" onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="text"
          placeholder="Search by city"
          aria-label="search by city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default SearchBar;
