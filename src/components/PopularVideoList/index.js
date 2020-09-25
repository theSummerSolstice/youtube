import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VideoListEntry from "../VideoListEntry";
import { getPopularYoutube } from "../../api/youtube";
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

export default function PopularVideoList({ scrollStatus, isLoading }) {
  const MAX_RESULTS = 10;
  const REGION_CODE = "KR";
  const TYPE = "video";

  const [videoList, setVideoList] = useState([]);
  const [nextPopularVideoList, setNextPopularVideoList] = useState("");

  const popularOptions = {
    chart: "mostPopular",
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
    getPopularList(popularOptions).then(result => {
      setNextPopularVideoList(result.nextPageToken);
      setVideoList(result.items);
    });
  }, []);

  useEffect(() => {
    if (!scrollStatus) return;
      getPopularList(popularOptions).then(result => {
        setVideoList([
          ...videoList,
          ...result.items
        ]);
        setNextPopularVideoList(result.nextPageToken);
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
