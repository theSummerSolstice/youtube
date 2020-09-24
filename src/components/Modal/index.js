import React, { useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from "prop-types";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .video-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 750px;
    background-color: black;
    z-index: 1;
  }

  .video-container button {
    align-self: flex-end;
    margin-right: 10px;
    background-color: black;
    border: none;
    color: white;
    font-size: 45px;
  }

  .video-container button:focus {
    outline: none;
  }

  .video-container iframe {
    margin-bottom: 10px;
    border: 0;
  }

  .video__title {
    color: white;
    font-size: 24px;
    width: 95%;
    margin-bottom: 20px;
    text-align: left;
  }
  .video__subinfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    width: 95%;
  }
  .video__channel-title,
  .video__published-date {
    color: white;
    font-size: 18px;
  }
  .video__published-date {
    font-weight: 200;
    opacity: 0.7;
  }
`;

export default function Modal ({ id, title, channelTitle, publishedDate, setIsVideoClicked }) {
  useEffect(() => {
    document.documentElement.style.cssText = `overflow: hidden`;
    return () => document.documentElement.style.cssText = `overflow: visible`
  }, []);

  return (
    <ModalWrapper>
      <div className="modal-overlay" onClick={() => setIsVideoClicked(false)}></div>
      <div className="video-container">
        <button onClick={() => setIsVideoClicked(false)}><FontAwesomeIcon icon={faTimes} size="xs" /></button>
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
      </div>
    </ModalWrapper>
  );
}

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  channelTitle: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  setIsVideoClicked: PropTypes.func.isRequired,
};
