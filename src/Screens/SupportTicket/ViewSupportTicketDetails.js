import React from 'react';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import { Grid } from '@mui/material';
import FormField from 'Elements/FormField';

const ViewSupportTicketDetails = ({ data, role }) => {
  let labels = [];
  const values = [];

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(data).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
    labels = labels.filter(function (e) {
      return e !== 'id';
    });
    if (role !== 'admin') {
      labels = labels.filter(function (e) {
        return e !== 'message';
      });
    }
  });

  // Push the object values into the values array
  Object.values(data).forEach((el) => values.push(el));

  // Render the card data items
  const renderItems = labels.map((label, key) => (
    <Box key={label} display="flex" py={0.5} pr={2}>
      {label !== 'image' && (
        <>
          <Typography variant="button" fontWeight="bold" textTransform="capitalize">
            {label}: &nbsp;
          </Typography>
          <Typography variant="button" fontWeight="regular" color="text" textTransform="capitalize">
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
        <Grid item xs={12}>
          <FormField
            type="textarea"
            placeholder={
              role === 'admin' ? 'Enter the reason of approve or reject message' : 'Message'
            }
            label={role === 'admin' ? 'Reason of approve or reject message' : 'Message'}
            value={role === 'admin' ? '' : data.message}
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

export default ViewSupportTicketDetails;
