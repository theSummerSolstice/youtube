import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 750px;
  padding: 50px 0 15px;
  z-index: 1;
  background-color: black;

  iframe {
    border: 0;
  }

  .video__title {
    width: 95%;
    margin: 10px 0 30px;
    color: white;
    font-size: 24px;
    text-align: left;
  }

  .video__subinfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;

    .video__channel-title,
    .video__published-date {
      color: white;
      font-size: 18px;
    }
    .video__published-date {
      font-weight: 200;
      opacity: 0.7;
    }
  }
`;

export default function VideoContents ({ id, title, channelTitle, publishedDate }) {
  return (
    <VideoWrapper>
      <div className="video__content">
        <iframe
          title={id}
          width="720"
          height="400"
          src={`https://www.youtube.com/embed/${id}`}
          allowFullScreen
        ></iframe>
      </div>
      <div className="video__title">{title}</div>
      <div className="video__subinfo">
        <div className="video__channel-title">{channelTitle}</div>
        <div className="video__published-date">{publishedDate.slice(0, 10)}</div>
      </div>
    </VideoWrapper>
  );
}

VideoContents.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  channelTitle: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
};
