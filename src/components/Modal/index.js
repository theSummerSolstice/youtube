import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .modal-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }

  button > * {
    position: absolute;
    top: 30px;
    right: 30px;
    align-self: flex-end;
    margin-right: 10px;
    border: none;
    color: white;
    font-size: 40px;
    z-index: 100;

    &:focus {
      outline: none;
    }
  }
`;

export default function Modal ({ children }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => document.body.style.overflow = "visible";
  }, []);

  let history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  return (
    <ModalWrapper>
      <div className="modal-overlay" onClick={handleClick}></div>
      <button onClick={handleClick}>
        <FontAwesomeIcon icon={faTimes} size="xs" />
      </button>
      {children}
    </ModalWrapper>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
