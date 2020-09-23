import React from "react";
import styled from "styled-components";

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
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .video-contents {
    background-color: black;
    width: 640px;
    height: 600px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .video-contents button {
    background-color: black;
    border: none;
    color: white;
    font-size: 45px;
    align-self: flex-end;
  }
  .video-contents button:focus {
    outline: none;
  }

  .video-contents iframe {
    border: 0;
    margin-bottom: 20px;
  }

  .video__title,
  .video__channel-title,
  .video__published-date {
    color: white;
  }
`;

export default function Modal ({ id, title, description, channelTitle, publishedDate, setIsVideoClicked }) {
  return (
    <ModalWrapper>
      <div className="modal-overlay" onClick={() => setIsVideoClicked(false)}></div>
      <div className="video-contents">
        <button onClick={() => setIsVideoClicked(false)}>X</button>
        <iframe
          title={id}
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/${id}`}
          allowFullScreen
        ></iframe>
        {/* <div className="video__description">{description}</div> */}
        <div className="video__title">{title}</div>
        <div className="video__channel-title">{channelTitle}</div>
        <div className="video__published-date">{publishedDate}</div>
      </div>
    </ModalWrapper>
  );
}