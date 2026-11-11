import "./Search.css";
import { Search as SearchIcon } from "lucide-react";

const Search = ({ setSearch }) => {
  return (
    <label className="search" aria-label="Search Note">
      <SearchIcon />
      <input
        onChange={(event) => setSearch(event.target.value)}
        type="text"
        className="search__input"
        placeholder="Search Note"
      />
    </label>
  );
};

export default Search;
