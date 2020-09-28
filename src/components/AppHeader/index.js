import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import logo from "../../assets/logo.svg";
import Container from "../shared/Container";
import Heading from "../shared/Heading";
import SearchInput from "../SearchInput";


const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);

  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2em 0;
    text-align: center;
  }

  .brand {
    display: flex;
    align-items: center;

    h1 {
      margin-left: 10px;
      text-transform: uppercase;
      font-style: italic;
    }
  }

  img {
    height: 30px;
  }

  .input-container {
    width: 300px;
  }
`;

export default function AppHeader ({ searchKeyword, updateSearchKeyword, updateDebouncedKeyword }) {
  return (
    <Header>
      <Container>
        <section>
          <div className="brand">
            <img src={logo} alt="logo" />
            <Heading>Youtube Viewer</Heading>
          </div>
          <div className="input-container">
            <SearchInput
              placeholder="Youtube 검색"
              onChange={updateSearchKeyword}
              value={searchKeyword}
              updateDebouncedKeyword={updateDebouncedKeyword}
            />
          </div>
        </section>
      </Container>
    </Header>
  );
}

AppHeader.propTypes = {
  searchKeyword: PropTypes.string.isRequired,
  updateSearchKeyword: PropTypes.func.isRequired,
  updateDebouncedKeyword: PropTypes.func.isRequired,
};
