import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from 'halogen/BeatLoader.js';
import VideoListEntry from "../VideoListEntry";
import { getPopularYoutube } from "../../api/youtube";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-auto-rows: 2fr;
  column-gap: 20px;
  row-gap: 20px;
  width: 100%;
  padding: 2em 0 0;
`;

const LoadingWrapper = styled.div`
  margin: 50px auto;
  text-align: center;
`;

const CHART = "mostPopular";
const MAX_RESULTS = 10;
const REGION_CODE = "KR";
const TYPE = "video";

export default function PopularVideoList ({ scrollStatus, isLoading }) {
  const [videoList, setVideoList] = useState([]);
  const [nextPopularVideoList, setNextPopularVideoList] = useState("");
  const [error, setError] = useState("");

  const popularOptions = {
    chart: CHART,
    maxResults: MAX_RESULTS,
    regionCode: REGION_CODE,
    type: TYPE,
    pageToken: nextPopularVideoList,
  };

  const getPopularList = async (options) => {
    const popularResult = await getPopularYoutube(options);
    return popularResult;
  };

  useEffect(() => {
    getPopularList(popularOptions)
      .then(result => {
        setNextPopularVideoList(result.nextPageToken);
        setVideoList(result.items)
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    if (!scrollStatus) return;
    getPopularList(popularOptions)
      .then(result => {
        setVideoList([
          ...videoList,
          ...result.items,
        ]);
        setNextPopularVideoList(result.nextPageToken);
      })
      .catch(error => {
        setError(error);
      });
  }, [scrollStatus]);

  return (
    <>
      <Wrapper>
        { error && error.message }
        {
          videoList.map((list) => {
            const { id, snippet } = list;
            return (
              <VideoListEntry
                key={id}
                id={id}
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

PopularVideoList.propTypes = {
  scrollStatus: PropTypes.bool,
  isLoading: PropTypes.bool,
};
