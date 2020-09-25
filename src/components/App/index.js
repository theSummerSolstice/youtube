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
  const [scrollStatus, setScrollStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const infiniteScroll = () => {
    let scrollHeight = document.documentElement.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight === scrollHeight) {
      setScrollStatus(true);
      setIsLoading(true);
    } else {
      setScrollStatus(false);
    }
  }

  const throttled = throttle(infiniteScroll, 1000);

  useEffect(() => {
    window.addEventListener('scroll', throttled);
    return () => window.removeEventListener('scroll', throttled);
  });

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
                scrollStatus={scrollStatus}
                isLoading={isLoading}
              />
            : <Route path="/">
                <PopularVideoList
                  scrollStatus={scrollStatus}
                  isLoading={isLoading}
                />
              </Route>
          }
        </Container>
      </Main>
    </>
  );
}
