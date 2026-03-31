import React, { useState } from "react";

const SearchForm = () => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <section>
      <h2>선수검색</h2>
      <form onSubmit={handleSearch} autoComplete="off">
        <label htmlFor="playerName">선수명</label>
        <input
          type="text"
          value={keyword}
          onChange={handleChange}
          id="playerName"
        />
        <button type="submit">검색</button>
      </form>
    </section>
  );
};

export default SearchForm;
