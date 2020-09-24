import React, { useState, useEffect } from "react";
import VideoList from "../VideoList";
import AppHeader from "../AppHeader";
import styled from "styled-components";
import Container from "../shared/Container";
import throttle from "lodash/throttle";

const Main = styled.main`
  margin-top: 110px;
`;

export default function App() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [scrollStatus, setScrollStatus] = useState(false);

  const infiniteScroll = () => {
    let scrollHeight = document.documentElement.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight === scrollHeight) {
      setScrollStatus(true);
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
          <VideoList
            searchKeyword={debouncedKeyword}
            scrollStatus={scrollStatus}
            updateScrollStatus={(scrollStatus) => setScrollStatus(scrollStatus)}
          />
        </Container>
      </Main>
    </>
  );
}
