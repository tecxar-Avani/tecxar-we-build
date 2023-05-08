import { Input } from "antd";
import React from "react";

const SearchBar = (props: any) => {
  return (
    <div className="searchCard mt-4 ml-2">
      <div className="md-8" style={{ marginLeft: "15px" }}>
        <Input
          onPressEnter={(e: any) => props.searchResult(e.target.value)}
          className="w-full rounded-pill"
          placeholder="Enter your YouTube URL here or search for existing build using keywords"
        />
      </div>
    </div>
  );
};

export default SearchBar;
