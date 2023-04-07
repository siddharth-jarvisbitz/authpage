import { AccountBox, InfoTwoTone, PasswordTwoTone } from '@mui/icons-material';
import Card from '@mui/material/Card';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';

const Header = ({ sidenav }) => {
  const sidenavItems = [
    { icon: <InfoTwoTone />, label: 'basic info', ref: 'basic-info' },
    { icon: <AccountBox />, label: 'bank details', ref: 'account-info' },
    { icon: <PasswordTwoTone />, label: 'change password', ref: 'change-password' }
  ];

  const renderSidenavItems = sidenavItems.map(({ icon, label, ref }, key) => {
    const active = ref === sidenav[key].key;
    const itemKey = `item-${key}`;

    return (
      <Box key={itemKey} component="li">
        <Typography
          id={ref}
          onClick={() => active && sidenav[key].ref.current.scrollIntoView()}
          variant="button"
          fontWeight="regular"
          color="text"
          textTransform="capitalize"
          sx={({
            borders: { borderRadius },
            functions: { pxToRem, rgba },
            palette: { light },
            transitions
          }) => ({
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            borderRadius: borderRadius.md,
            overflow: 'visible',
            padding: `${pxToRem(10)} ${pxToRem(16)}`,
            transition: transitions.create('background-color', {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.shorter
            }),
            '&:hover': {
              backgroundColor: rgba(light.main, 1)
            }
          })}
          active={active}
        >
          <Box fontSize="16px" color="secondary" mr={1.5} lineHeight={0}>
            {icon}
          </Box>
          {label}
        </Typography>
      </Box>
    );
  });

  return (
    <Card
      sx={{
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
        position: 'sticky',
        top: 110
      }}
    >
      <Box
        component="ul"
        display="flex"
        flexDirection="column"
        p={2}
        m={0}
        sx={{ listStyle: 'none' }}
      >
        {renderSidenavItems}
      </Box>
    </Card>
  );
};

export default Header;
