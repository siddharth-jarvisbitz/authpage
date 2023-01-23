import React from 'react';
import { styled, LinearProgress } from '@mui/material';

const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1301,
  width: '100%'
});

const Loader = () => (
  <LoaderWrapper>
    <LinearProgress color="dark" />
  </LoaderWrapper>
);

export default Loader;
