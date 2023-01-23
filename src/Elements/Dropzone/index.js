import { Box, styled } from '@mui/material';
import CustomBox from 'Elements/Box';
import { useRef, useEffect } from 'react';
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';

const DropzoneRoot = styled(Box)(({ theme }) => {
  const { palette, typography, borders, functions } = theme;

  const { text, white, dark, inputColors, transparent } = palette;
  const { size } = typography;
  const { borderRadius, borderWidth } = borders;
  const { rgba } = functions;

  return {
    display: 'flex',
    alignItems: 'center',
    border: `${borderWidth[1]} solid ${inputColors.borderColor.main} !important`,
    borderRadius: borderRadius.md,
    backgroundColor: transparent.main,

    '& .dz-default': {
      margin: '0 auto !important'
    },

    '& .dz-default .dz-button': {
      color: `${text.main} !important`,
      fontSize: `${size.sm} !important`
    },

    '& .dz-preview.dz-image-preview': {
      background: transparent.main
    },

    '& .dz-preview .dz-details': {
      color: `${dark.main} !important`,
      opacity: '1 !important',

      '& .dz-size span, & .dz-filename span': {
        backgroundColor: `${rgba(white.main, 0.7)} !important`
      }
    },

    '& .dz-error-message': {
      display: 'none !important'
    },

    '& .dz-remove': {
      color: `${dark.main} !important`,
      textDecoration: 'none',

      '&:hover, &:focus': {
        textDecoration: 'none !important'
      }
    }
  };
});

const CustomDropzone = ({ options }) => {
  const dropzoneRef = useRef();

  useEffect(() => {
    Dropzone.autoDiscover = false;

    function createDropzone() {
      return new Dropzone(dropzoneRef.current, { ...options });
    }

    function removeDropzone() {
      if (Dropzone.instances.length > 0) Dropzone.instances.forEach((dz) => dz.destroy());
    }

    createDropzone();

    return () => removeDropzone();
  }, [options]);

  return (
    <DropzoneRoot
      component="form"
      action="/file-upload"
      ref={dropzoneRef}
      className="form-control dropzone"
    >
      <CustomBox className="fallback">
        <CustomBox component="input" name="file" type="file" multiple />
      </CustomBox>
    </DropzoneRoot>
  );
};

export default CustomDropzone;