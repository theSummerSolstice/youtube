import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VideoListEntry from "../VideoListEntry";
import { searchYoutube, getPopularYoutube } from "../../api/youtube";
import Loader from 'halogen/BeatLoader.js';
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: grid;
  padding: 2em 0 0;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-auto-rows: 2fr;
  column-gap: 20px;
  row-gap: 20px;
`;

const LoadingWrapper = styled.div`
  margin: 50px auto;
  text-align: center;
`;

export default function VideoList({ searchKeyword, scrollStatus, isLoading }) {
  const MAX_RESULTS = 10;
  const REGION_CODE = "KR";
  const TYPE = "video";

  const [videoList, setVideoList] = useState([]);
  const [nextVideoList, setNextVideoList] = useState("");
  const [nextPopularVideoList, setNextPopularVideoList] = useState("");

  const searchOptions = {
    maxResults: MAX_RESULTS,
    regionCode: REGION_CODE,
    type: TYPE,
    pageToken: nextVideoList,
    q: searchKeyword,
  };

  const popularOptions = {
    chart: "mostPopular",
    maxResults: MAX_RESULTS,
    regionCode: REGION_CODE,
    type: TYPE,
    pageToken: nextPopularVideoList,
  };

  const getSearchList = async (options) => {
    const searchResult = await searchYoutube(options);
    return searchResult;
  };

  const getPopularList = async (options) => {
    const popularResult = await getPopularYoutube(options);
    return popularResult;
  };

  useEffect(() => {
    try {
      if (searchKeyword) {
        getSearchList(searchOptions).then(result => {
          setNextVideoList(result.nextPageToken);
          setVideoList(result.items);
        });
      } else {
        getPopularList(popularOptions).then(result => {
          setNextPopularVideoList(result.nextPageToken);
          setVideoList(result.items);
        });
      }
    } catch {
      // 오류 처리 필요
    }
  }, [searchKeyword]);

  useEffect(() => {
    if (!scrollStatus) return;
    if (searchKeyword) {
      getSearchList(searchOptions).then(result => {
        setVideoList([
          ...videoList,
          ...result.items
        ]);
        setNextVideoList(result.nextPageToken);
      });
    } else {
      getPopularList(popularOptions).then(result => {
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
      <LoadingWrapper>
        {
          isLoading && <Loader color="#000000" size="16px" margin="4px" />
        }
      </LoadingWrapper>
    </>
  );
}

VideoList.propTypes = {
  searchKeyword: PropTypes.string,
  scrollStatus: PropTypes.bool,
  isLoading: PropTypes.bool,
};
