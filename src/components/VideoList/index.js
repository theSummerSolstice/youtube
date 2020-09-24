import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import VideoListEntry from "../VideoListEntry";
import { searchYoutube, getPopularYoutube } from "../../api/youtube";
import Loading from "../Loading";

const Wrapper = styled.div`
  display: grid;
  padding: 2em 0 0;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-auto-rows: 1fr;
  column-gap: 20px;
  row-gap: 20px;
`;

export default function VideoList({ searchKeyword, scrollStatus }) {
  const MAX_RESULTS = 10;
  const REGION_CODE = "KR";
  const SAFE_SEARCH = "strict";
  const TYPE = "video";

  const [videoList, setVideoList] = useState([]);
  const [nextVideoList, setNextVideoList] = useState("");
  const [nextPopularVideoList, setNextPopularVideoList] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 데이터 가져오는 함수 2개를 외부로 빼버리기
  const getSearchList = async () => {
    const searchResult = await searchYoutube({
      maxResults: MAX_RESULTS,
      safeSearch: SAFE_SEARCH,
      type: TYPE,
      pageToken: nextVideoList,
      q: searchKeyword,
    });

    return searchResult;
  };

  const getPopularList = async () => {
    const popularResult = await getPopularYoutube({
      chart: "mostPopular",
      maxResults: MAX_RESULTS,
      regionCode: REGION_CODE,
      type: TYPE,
      pageToken: nextPopularVideoList,
    });

    return popularResult;
  };

  useEffect(() => {
    try {
      if (searchKeyword) {
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
      setIsLoading(true);
    }
  }, [searchKeyword]);

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
    <>
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
      {
        isLoading && <Loading text="Loading" speed="300" />
      }
    </>
  );
}
