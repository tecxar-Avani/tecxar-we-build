import { Input } from "antd";
import Link from "next/link";
import React from "react";
import { Card, CardImg, Col, Row } from "react-bootstrap";

const { Search } = Input;
const onSearch = (value: any) => console.log(value);

const SearchBar = () => {
    return (
      <>
        <div className="searchCard row mt-4 justify-content-center">
          <div className="col col-md-8">
            <Input className="w-full rounded-pill" placeholder="Enter your YouTube URL here or search for exisiting build using keywords" />
          </div>
        </div>
      </>
    );
  };
  
  export default SearchBar;
