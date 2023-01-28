import { forwardRef } from 'react';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';

const BadgeDot = forwardRef(({ variant, color, size, badgeContent, font, ...rest }, ref) => {
  let finalSize;
  let fontSize;
  let padding;

  if (size === 'sm') {
    finalSize = '0.5rem';
    fontSize = 'caption';
    padding = '0.45em 0.775em';
  } else if (size === 'lg') {
    finalSize = '0.625rem';
    fontSize = 'body2';
    padding = '0.85em 1.375em';
  } else if (size === 'md') {
    finalSize = '0.5rem';
    fontSize = 'button';
    padding = '0.65em 1em';
  } else {
    finalSize = '0.375rem';
    fontSize = 'caption';
    padding = '0.45em 0.775em';
  }

  const validColors = [
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark'
  ];

  const validColorIndex = validColors.findIndex((el) => el === color);

  return (
    <Box ref={ref} display="flex" alignItems="center" p={padding} {...rest}>
      <Box
        component="i"
        display="inline-block"
        width={finalSize}
        height={finalSize}
        borderRadius="50%"
        bgColor={validColors[validColorIndex]}
        variant={variant}
        mr={1}
      />
      <Typography
        variant={fontSize}
        fontWeight={font.weight ? font.weight : 'regular'}
        color={font.color ? font.color : 'dark'}
        sx={{ lineHeight: 0, mt: -0.25 }}
      >
        {badgeContent}
      </Typography>
    </Box>
  );
});

BadgeDot.defaultProps = {
  variant: 'contained',
  color: 'info',
  size: 'xs',
  font: {}
};

export default BadgeDot;