import "./Search.css";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <label className="search" aria-label="Search Note">
      <SearchIcon />
      <input type="text" className="search__input" placeholder="Search Note" />
    </label>
  );
};

export default Search;
