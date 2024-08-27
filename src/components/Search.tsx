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
        className="mb-2 w-full rounded border border-gray p-2 pl-10 focus:outline-1 focus:outline-primary"
        type="text"
        placeholder="Search To-Do"
        value={query}
        onChange={handleChange}
      />
      <div className="absolute left-2 top-[42%] -translate-y-1/2 transform">
        <SearchIcon />
      </div>
    </div>
  );
};

export default Search;
