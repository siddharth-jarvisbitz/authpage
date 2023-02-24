import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Avatar from 'Elements/Avatar';
import { Grid } from '@mui/material';
import React from 'react';
import FormField from 'Elements/FormField';
import { useSelector } from 'react-redux';

const ViewExpenseDetails = ({ info }) => {
  const { role } = useSelector((state) => state.route);
  const labels = [];
  const values = [];

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <Box key={label} display="flex" py={0.5} pr={2}>
      {label !== 'image' && (
        <>
          <Typography variant="button" fontWeight="bold" textTransform="capitalize">
            {label}: &nbsp;
          </Typography>
          <Typography variant="button" fontWeight="regular" color="text">
            &nbsp;{values[key]}
          </Typography>
        </>
      )}
    </Box>
  ));

  return (
    <>
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item>{renderItems}</Grid>
        <Grid item>
          <Avatar src={info.image} alt="profile-image" variant="rounded" size="xxl" shadow="lg" />
        </Grid>
        <Grid item xs={12}>
          <FormField
            type="textarea"
            placeholder="Please Enter the reason of approve or reject"
            label="Reason"
            value={renderItems.comment}
            multiline
            rows={5}
            errorFalse
            disabled={role !== 'admin'}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ViewExpenseDetails;