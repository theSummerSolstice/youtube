import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import VideoListEntry from "../VideoListEntry";
import { searchYoutube, getPopularYoutube } from "../../api/youtube";

const Wrapper = styled.div`
  display: grid;
  padding: 2em 0 0;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: 300px 300px 300px;
  grid-auto-rows: 300px;
  column-gap: 20px;
  row-gap: 20px;
`;



export default function VideoList( { searchKeyword, scrollStatus, isKeywordSubmitted, updateKeywordSubmitted }) {
  const MAX_RESULTS = 10;
  const REGION_CODE = "KR";
  const SAFE_SEARCH = "strict";
  const TYPE = "video";

  const [videoList, setVideoList] = useState([]);
  const [nextVideoList, setNextVideoList] = useState("");
  const [nextPopularVideoList, setNextPopularVideoList] = useState("");

  // 데이터 가져오는 함수 2개를 외부로 빼버리기
  const getSearchList = useCallback(async () => {
    const searchResult = await searchYoutube({
      maxResults: MAX_RESULTS,
      safeSearch: SAFE_SEARCH,
      type: TYPE,
      pageToken: nextVideoList,
      q: searchKeyword,
    });

    return searchResult;
  }, [nextVideoList, searchKeyword]);

  const getPopularList = useCallback(async () => {
    const popularResult = await getPopularYoutube({
      chart: "mostPopular", // 상수 처리
      maxResults: MAX_RESULTS,
      regionCode: REGION_CODE,
      type: TYPE,
      pageToken: nextPopularVideoList,
    });

    console.log(popularResult);
    return popularResult;
  }, [nextPopularVideoList]);

  useEffect(() => {
    try {
      if (isKeywordSubmitted) {
        getSearchList().then(result => {
          setNextVideoList(result.nextPageToken);
          setVideoList(result.items);
        });
      } else {
        getPopularList().then(result => {
          setNextPopularVideoList(result.nextPageToken);
          setVideoList(result.items);
        });
      }
    } catch {
      // error 처리
    } finally {
      // updateKeywordSubmitted(false); // 렌더가 2번된다. 어떻게 막지?
    }
  }, [isKeywordSubmitted]);

  useEffect(() => {
    if (!scrollStatus) return;
    if (searchKeyword) {
      getSearchList().then(result => {
        setVideoList([
          ...videoList,
          ...result.items
        ]);
        setNextVideoList(result.nextPageToken);
      });
    } else {
      getPopularList().then(result => {
        setVideoList([
          ...videoList,
          ...result.items
        ]);
        setNextPopularVideoList(result.nextPageToken);
      });
    }
  }, [scrollStatus]);

  return (
    <Wrapper>
      {
        videoList.map((list) => {
          const { id, snippet } = list;
          return (
            <VideoListEntry
              key={typeof(id) === "string" ? id : id.videoId}
              id={id.videoId || id}
              imageSrc={snippet.thumbnails.high.url}
              title={snippet.title}
              description={snippet.description}
              channelTitle={snippet.channelTitle}
              publishedDate={snippet.publishedAt}
            />
          );
        })
      }
    </Wrapper>
  );
}
