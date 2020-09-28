import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import throttle from "lodash/throttle";
import Container from "../shared/Container";
import AppHeader from "../AppHeader";
import SearchVideoList from "../SearchVideoList";
import PopularVideoList from "../PopularVideoList";

const Main = styled.main`
  margin-top: 110px;
`;

export default function App () {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [isScrollEnd, setIsScrollEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const infiniteScroll = () => {
    let scrollHeight = document.documentElement.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight * 0.7) {
      setIsScrollEnd(true);
      setIsLoading(true);
    } else {
      setIsScrollEnd(false);
    }
  }

  const handleScroll = throttle(infiniteScroll, 1000);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrollEnd]);

  return (
    <>
      <AppHeader
        searchKeyword={searchKeyword}
        updateSearchKeyword={setSearchKeyword}
        updateDebouncedKeyword={setDebouncedKeyword}
      />
      <Main>
        <Container>
          {
            debouncedKeyword
            ? <SearchVideoList
                searchKeyword={debouncedKeyword}
                isScrollEnd={isScrollEnd}
                isLoading={isLoading}
              />
            : <Route path="/">
                <PopularVideoList
                  isScrollEnd={isScrollEnd}
                  isLoading={isLoading}
                />
              </Route>
          }
        </Container>
      </Main>
    </>
  );
}
