import { Input } from "antd";
import Link from "next/link";
import React from "react";
import { Card, CardImg, Col, Row } from "react-bootstrap";

const { Search } = Input;
const onSearch = (value: any) => console.log(value);

const SearchBar = () => {
    return (
      <>
        <div className="searchCard mt-4 justify-content-center">
          <div className="w-75 md-8 m-auto">
            <Input className="w-full rounded-pill" placeholder="Enter your YouTube URL here or search for exisiting build using keywords" />
          </div>
        </div>
      </>
    );
  };
  
  export default SearchBar;
