import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../Modal";
import PropTypes from "prop-types";

const EntryWrapper = styled.div`
  padding: 5px;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

  img {
    width: 100%;
  }

  .contents {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  .contents__title,
  .contents__description {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .contents__title {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .contents__description {
    color: rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
  }
  .contents__subInfo {
    display: flex;
    justify-content: space-between;
    align-items: space-between;
  }

  .contetns__channel-id {
    font-size: 14px;
    border: 1px solid black;
  }
  .contents__published-date {
    font-size: 12px;
    color: val(--font-color-grey);
    text-align: right;
  }

`;

export default function VideoListEntry({ imageSrc, id, title, description, channelTitle, publishedDate }) {
  const [isVideoClicked, setIsVideoClicked] = useState(false);

  return (
    <>
      <EntryWrapper onClick={() => setIsVideoClicked(true)}>
        <div>
          <img src={imageSrc} alt="" />
        </div>
        <div className="contents">
          <div className="contents__title">{title}</div>
          <div className="contents__description">{description}</div>
          <div className="contents__subInfo">
            <div className="contents__channel-title">{channelTitle}</div>
            <div className="contents__published-date">{publishedDate.slice(0, 10)}</div>
          </div>
        </div>
      </EntryWrapper>
      {
        isVideoClicked &&
        <Modal
          id={id}
          title={title}
          description={description}
          channelTitle={channelTitle}
          publishedDate={publishedDate}
          setIsVideoClicked={(isVideoClicked) => setIsVideoClicked(isVideoClicked)}
        />
      }
    </>
  );
}

VideoListEntry.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  channelTitle: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
};
