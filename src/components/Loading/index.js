import React, { useEffect, useState } from 'react';
import styled from "styled-components";

const LoadingText = styled.div`
  text-align: center;
  font-size: 40px;
  margin-top: 20px;
`;

export default function Loading ({ text, speed }) {
  const [loadingText, setLoadingText] = useState(text);

  useEffect(() => {
    const timerId = setInterval(() => {
      loadingText === text + "..."
        ? setLoadingText(text)
        : setLoadingText(prevText => prevText + ".");
    }, speed);

    return () => clearInterval(timerId);
  }, [loadingText]);

  return (
    <LoadingText>{loadingText}</LoadingText>
  );
}
