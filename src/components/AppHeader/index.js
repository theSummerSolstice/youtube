import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.svg";
import SearchInput from "../SearchInput";
import Container from "../shared/Container";
import Heading from "../shared/Heading";
import PropTypes from "prop-types";

const Header = styled.header`
  position: fixed;
  background-color: #ffffff;
  width: 100%;
  top: 0;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);

  section {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2em 0;
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

export default function AppHeader({ searchKeyword, updateSearchKeyword, updateDebouncedKeyword }) {
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
  searchKeyword: PropTypes.string,
  updateSearchKeyword: PropTypes.func,
  updateDebouncedKeyword: PropTypes.func,
};
