import { Input, Form } from "antd";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../hooks";
import React, { useState, useEffect } from "react";
import { Card, CardImg, Col, Row } from "react-bootstrap";
import { buildSelector, getBuildByUrl } from "../store/reducers/build.reducer";
const { Search } = Input;
const onSearch = (value: any) => console.log(value);

const SearchBar = (props:any) => {
  const [url, setUrl] = useState("");
  const dispatch = useAppDispatch();
  const build = useAppSelector(buildSelector);
  useEffect(() => {
    if(url !== ""){
    dispatch(getBuildByUrl(url));
    }
  }, [url]);
  return (
    <>
      <div className="searchCard mt-4 justify-content-center">
        <div className="w-75 md-8 m-auto">
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
