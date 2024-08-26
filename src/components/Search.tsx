import React, { useState } from "react";
import SearchIcon from "../assets/svg/search.svg?react";

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative">
      <input
        className="border border-gray p-2 pl-10 w-full mb-2 rounded focus:outline-primary focus:outline-1"
        type="text"
        placeholder="Search To-Do"
        value={query}
        onChange={handleChange}
      />
      <div className="absolute left-2 top-[42%] transform -translate-y-1/2">
        <SearchIcon />
      </div>
    </div>
  );
};

export default Search;
