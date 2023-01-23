import React from 'react';
import Box from 'Elements/Box';
import Select from 'Elements/Select';
import Dropzone from 'Elements/Dropzone';
import Editor from 'Elements/Editor';

const DashboardDefault = () => (
  <Box py={3}>
    Dashboard Default <Select />
    <Dropzone />
    <Editor />
  </Box>
);

export default DashboardDefault;
