import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VideoListEntry from "../VideoListEntry";
import { searchYoutube } from "../../api/youtube";
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

export default function SearchVideoList({ searchKeyword, scrollStatus, isLoading }) {
  const MAX_RESULTS = 10;
  const REGION_CODE = "KR";
  const TYPE = "video";

  const [videoList, setVideoList] = useState([]);
  const [nextVideoList, setNextVideoList] = useState("");

  const searchOptions = {
    maxResults: MAX_RESULTS,
    regionCode: REGION_CODE,
    type: TYPE,
    pageToken: nextVideoList,
    q: searchKeyword,
  };

  const getSearchList = async (options) => {
    const searchResult = await searchYoutube(options);
    return searchResult;
  };

  useEffect(() => {
    getSearchList(searchOptions).then(result => {
      setNextVideoList(result.nextPageToken);
      setVideoList(result.items);
    });
  }, [searchKeyword]);

  useEffect(() => {
    if (!scrollStatus) return;
    getSearchList(searchOptions).then(result => {
      setVideoList([
        ...videoList,
        ...result.items
      ]);
      setNextVideoList(result.nextPageToken);
    });
  }, [scrollStatus]);

  return (
    <>
      <Wrapper>
        {
          videoList.map((list) => {
            const { id, snippet } = list;
            return (
              <VideoListEntry
                key={id.videoId}
                id={id.videoId}
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

SearchVideoList.propTypes = {
  searchKeyword: PropTypes.string,
  scrollStatus: PropTypes.bool,
  isLoading: PropTypes.bool,
};
