import React from 'react';
import Box from 'Elements/Box';
import { Card, FormControl, FormLabel, Grid } from '@mui/material';
import { Formik } from 'formik';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import Select from 'Elements/Select';
import { Gender, keyDownValidation } from 'Helpers/Global';
import moment from 'moment/moment';
import { useOutletContext } from 'react-router';

const BasicInfo = ({ data }) => {
  const { GetEmployeeUpdate } = useOutletContext();
  const onSubmit = (values, actions) => {
    GetEmployeeUpdate(values, () => {});
    actions.setTouched({});
    actions.setSubmitting(false);
  };

  return (
    <Card id="basic-info">
      <Box p={2} pb={0}>
        <Typography variant="h5">Basic Info</Typography>
      </Box>
      <Formik
        enableReinitialize
        initialValues={
          data || {
            firstName: '',
            lastName: '',
            email: '',
            confirmationEmail: '',
            permanentAddress: '',
            dateOfJoin: '',
            phoneNumber: '',
            dateOfLeave: '',
            gender: ''
          }
        }
        onSubmit={onSubmit}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1} p={2} justifyContent="flex-end">
                <Grid item xs={12} md={6} lg={4}>
                  <Input
                    type="text"
                    placeholder="Alen"
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    success={!errors.firstName && touched.firstName}
                    onKeyDown={(evt) => keyDownValidation.includes(evt.key) && evt.preventDefault()}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Input
                    type="text"
                    placeholder="Prior"
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    success={!errors.lastName && touched.lastName}
                    onKeyDown={(evt) => keyDownValidation.includes(evt.key) && evt.preventDefault()}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <FormControl sx={{ width: '100%' }}>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      id="gender"
                      name="gender"
                      options={Gender}
                      value={values.gender.value}
                      onChange={(value) => setFieldValue('gender', value.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Input
                    type="date"
                    placeholder="Date Of Birth"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    label="Date Of Birth"
                    value={
                      values.dob === undefined || values.dateOfLeave === null
                        ? ''
                        : moment(values.dob).format('DD/MM/YYYY')
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <Input
                    type="text"
                    id="dateOfJoin"
                    name="dateOfJoin"
                    label="Date Of Join"
                    value={values.dateOfJoin}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Input
                    type="date"
                    placeholder="10/10/2021"
                    id="dateOfLeave"
                    name="dateOfLeave"
                    label="Date Of Leave"
                    value={
                      values.dateOfLeave === undefined || values.dateOfLeave === null
                        ? ''
                        : moment(values.dateOfLeave).format('DD/MM/YYYY')
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Input
                    type="number"
                    placeholder="9255325324"
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    minLength="10"
                    maxLength="13"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    success={!errors.phoneNumber && touched.phoneNumber}
                    onKeyDown={(evt) => keyDownValidation.includes(evt.key) && evt.preventDefault()}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Input
                    type="text"
                    placeholder="ex. jone@abc.com"
                    id="email"
                    name="email"
                    label="Email"
                    value={values.email}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Input
                    type="text"
                    placeholder="eg. JBT0001"
                    id="employeeCode"
                    name="employeeCode"
                    label="Employee Code"
                    value={values.employeeCode}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={12}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="eg. 1303, Shivalik Shilp, Iskcon Cross Rd, Sanidhya, Ahmedabad, Gujarat 380015"
                      id="permanentAddress"
                      name="permanentAddress"
                      label="Permanent Address"
                      value={values.permanentAddress}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      success={!errors.permanentAddress && touched.permanentAddress}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4} textAlign="end">
                  <Button
                    variant="gradient"
                    color="dark"
                    size="small"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Update Basic Info
                  </Button>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </Card>
  );
};

export default BasicInfo;
