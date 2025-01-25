import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface SearchProps {
  searchItem: string;
  setSearchItem: (arg: string) => void;
  searchAction: () => void;
  placeholder?: () => string;
  buttonLabel?: () => string;
  isSearching: boolean;
}

const Search = ({
  searchAction,
  searchItem,
  isSearching,
  setSearchItem,
}: SearchProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };
  return (
    <div>
      <Input
        className="bg-white text-black"
        onChange={handleInputChange}
        // value={searchItem}
      />
      <Button onClick={searchAction}>
        {isSearching ? "searching..." : "Search"}
      </Button>
    </div>
  );
};

export default Search;
