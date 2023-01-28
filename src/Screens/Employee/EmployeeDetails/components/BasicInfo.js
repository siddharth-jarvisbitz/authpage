import React, { useState } from 'react';
import Box from 'Elements/Box';
import { Card, FormControl, FormLabel, Grid } from '@mui/material';
import { Formik } from 'formik';
import Typography from 'Elements/Typography';
import Button from 'Elements/Button';
import { BasicInfoSchema } from 'Helpers/ValidationSchema';
import Input from 'Elements/Input';
import Select from 'Elements/Select';
import { Gender } from 'Helpers/Global';

const BasicInfo = () => {
  const [gender, setGender] = useState('');
  const handleChangeIsGender = (event) => {
    setGender(event.target.value.value);
  };

  console.log('Selected gender is: --> ', gender);

  return (
    <Card id="basicInfo">
      <Box p={3} pb={0}>
        <Typography variant="h5">Basic Info</Typography>
      </Box>
      <Formik
        enableReinitialize
        initialValues={{
          firstName: '',
          lastName: '',
          gender: '',
          email: '',
          confirmationEmail: '',
          pAdd: '',
          phoneNumber: ''
        }}
        onSubmit={(values) => {
          console.log('values', values);
        }}
        validationSchema={BasicInfoSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting } =
            props;
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1} p={2} justifyContent="flex-end">
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="Alen"
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.firstName && touched.firstName && errors.firstName}
                      error={errors.firstName && touched.firstName}
                      success={!errors.firstName && touched.firstName}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="Prior"
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.lastName && touched.lastName && errors.lastName}
                      error={errors.lastName && touched.lastName}
                      success={!errors.lastName && touched.lastName}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <FormControl sx={{ width: '100%' }}>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      id="gender"
                      name="gender"
                      options={Gender}
                      errorText={errors.gender && touched.gender && errors.gender}
                      error={errors.gender && touched.gender}
                      success={!errors.gender && touched.gender}
                      onChange={(selectedOption) => {
                        const event = { target: { name: 'gender', value: selectedOption } };
                        handleChangeIsGender(event);
                      }}
                      onBlur={() => {
                        handleBlur({ target: { name: 'gender' } });
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="date"
                      placeholder="Date Of Birth"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      label="Date Of Birth"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="date"
                      placeholder="10/04/2021"
                      id="doj"
                      name="doj"
                      label="Date Of Join"
                      value={values.doj}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="date"
                      placeholder="10/10/2021"
                      id="dol"
                      name="dol"
                      label="Date Of Leave"
                      value={values.dol}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="number"
                      placeholder="+91 925 532 5324"
                      id="phoneNumber"
                      name="phoneNumber"
                      label="Phone Number"
                      minlength="9"
                      maxlength="14"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                      error={errors.phoneNumber && touched.phoneNumber}
                      success={!errors.phoneNumber && touched.phoneNumber}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="ex. jone@abc.com"
                      id="email"
                      name="email"
                      label="Email"
                      value={values.designation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.email && touched.email && errors.email}
                      error={errors.email && touched.email}
                      success={!errors.email && touched.email}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="ex. jone@abc.com"
                      id="email"
                      name="confirmationEmail"
                      label="Confirmation Email"
                      value={values.designation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={
                        errors.confirmationEmail &&
                        touched.confirmationEmail &&
                        errors.confirmationEmail
                      }
                      error={errors.confirmationEmail && touched.confirmationEmail}
                      success={!errors.confirmationEmail && touched.confirmationEmail}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={12}>
                  <Box>
                    <Input
                      type="text"
                      placeholder="eg. 1303, Shivalik Shilp, Iskcon Cross Rd, Sanidhya, Ahmedabad, Gujarat 380015"
                      id="pAdd"
                      name="pAdd"
                      label="Permanent Address"
                      value={values.pAdd}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.pAdd && touched.pAdd && errors.pAdd}
                      error={errors.pAdd && touched.pAdd}
                      success={!errors.pAdd && touched.pAdd}
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