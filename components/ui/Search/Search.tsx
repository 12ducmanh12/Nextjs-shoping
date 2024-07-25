import React from "react";
import { Search as SearchIcon } from "lucide-react";
function Search({ onSearch }: any) {
  return (
    <div className="relative">
      <input
        type="search"
        placeholder="Nhập thứ bạn muốn tìm"
        onChange={onSearch}
        className="rounded-md p-2"
      />
      <SearchIcon className="absolute top-2 right-2" />
    </div>
  );
}

export default Search;
