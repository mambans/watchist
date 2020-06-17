import React from 'react';
import ReactLoading from 'react-loading';
import { StyledLoadingContainer } from './StyledComponents';

export default ({ text, fontSize }) => {
  return (
    <StyledLoadingContainer color={'var(--color1)'} fontSize={fontSize}>
      <ReactLoading type={'bars'} color={'var(--color1)'} height={200} width={200} />
      <h1>{text || 'Loading..'}</h1>
    </StyledLoadingContainer>
  );
};
