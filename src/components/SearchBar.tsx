import { Input, Form } from "antd";
import Link from "next/link";
import React from "react";

const { Search } = Input;


const SearchBar = (props:any) => {
 
  return (
    <>
      <div className="searchCard mt-4 justify-content-center">
        <div className="searchBar w-90 md-8 m-auto">
          <Input
            onPressEnter={(e: any) => props.searchResult(e.target.value)}
            className="w-full rounded-pill"
            placeholder="Enter your YouTube URL here or search for existing build using keywords"
          />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
