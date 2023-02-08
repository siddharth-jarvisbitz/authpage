import React, { useRef, useState } from 'react';
import { FormControl, FormLabel, Grid, Input } from '@mui/material';
import Box from 'Elements/Box';
import Typography from 'Elements/Typography';
import Avatar from 'Elements/Avatar';
import team2 from 'Assets/Images/team-4-800x800.jpg';
import Button from 'Elements/Button';
import Icon from '@mui/material/Icon';
import { Edit } from '@mui/icons-material';
import Select from 'Elements/Select';
import { WorkingHours } from 'Helpers/Global';

const Organisation = (props) => {
  const { values, touched, errors, handleChange, handleBlur } = props.props;
  // const theme = useTheme();
  // const { role } = useSelector((state) => state.route);
  // const inputFile = useRef(null);

  const [workingHours, setWorkingHours] = useState('');
  const [smallLogoUrl, setSmallLogoUrl] = useState('');
  const [largeLogoUrl, setLargeLogoUrl] = useState('');

  const smallLogoInputFile = useRef(null);
  const largeLogoInputFile = useRef(null);

  const handleChangWorkingHours = (event) => {
    setWorkingHours(event.target.value.value);
  };
  console.log(workingHours);

  const onClickLogoUpload = (e, logo) => {
    const file = e.target.files[0];
    if (logo === 'small') {
      const url = URL.createObjectURL(file);
      setSmallLogoUrl(url);
    } else {
      const url = URL.createObjectURL(file);
      setLargeLogoUrl(url);
    }
  };

  return (
    <Box>
      <Box width="80%" textAlign="center" mx="auto" mb={4}>
        <Box mb={1}>
          <Typography variant="h5" fontWeight="regular">
            Let&apos;s start with the organisation information
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight="regular" color="text">
          Let us know more about your organisation.
        </Typography>
      </Box>
      {/* <Formik */}
      {/*  enableReinitialize */}
      {/*  initialValues={{ */}
      {/*    permanentAdd: '', */}
      {/*    workingHours: '' */}
      {/*  }} */}
      {/*  onSubmit={(values, actions) => { */}
      {/*    alert(JSON.stringify((values, null, 2))); */}
      {/*    console.log('values', values); */}
      {/*    actions.setSubmitting(false); */}
      {/*  }} */}
      {/*  validationSchema={organisationSchema} */}
      {/* > */}
      {/*  {(props) => { */}
      {/*    const { values, touched, errors, handleBlur, handleSubmit } = props; */}
      {/*    console.log('touched,errors,touched,values = ', errors, touched, values); */}
      {/*    return ( */}
      {/*      <form onSubmit={handleSubmit} autoComplete="off"> */}
      <Box mt={2}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={6} sm={3} lg={4} container justifyContent="center">
            <Box position="relative" height="max-content" mx="auto">
              <Typography variant="h6" fontWeight="small" color="label" textAlign="center">
                Small Logo
              </Typography>
              <Box>
                <input
                  ref={smallLogoInputFile}
                  type="file"
                  hidden
                  onChange={(e) => onClickLogoUpload(e, 'small')}
                />
                <Avatar
                  src={smallLogoUrl === '' ? team2 : smallLogoUrl}
                  alt="small picture"
                  size="xxl"
                  variant="rounded"
                />
                <Box alt="spotify logo" position="absolute" right={0} bottom={0} mr={-1} mb={-1}>
                  <Button
                    variant="gradient"
                    color="light"
                    component="label"
                    onClick={() => smallLogoInputFile.current && smallLogoInputFile.current.click()}
                    iconOnly
                  >
                    <Icon>
                      <Edit />
                    </Icon>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3} lg={4} container>
            <Box position="relative" height="max-content" mx="auto">
              <Typography variant="h6" fontWeight="small" color="label" textAlign="center">
                Large Logo
              </Typography>
              <Box>
                <input
                  ref={largeLogoInputFile}
                  type="file"
                  hidden
                  onChange={(e) => onClickLogoUpload(e, 'large')}
                />
                <Avatar
                  src={largeLogoUrl === '' ? team2 : largeLogoUrl}
                  alt="large picture"
                  size="xxl"
                  variant="rounded"
                />
                <Box alt="spotify logo" position="absolute" right={0} bottom={0} mr={-1} mb={-1}>
                  <Button
                    variant="gradient"
                    color="light"
                    component="label"
                    onClick={() => largeLogoInputFile.current && largeLogoInputFile.current.click()}
                    iconOnly
                  >
                    <Icon>
                      <Edit />
                    </Icon>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={10} lg={8}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Working Hours</FormLabel>
              <Select
                id="workingHours"
                name="workingHours"
                options={WorkingHours}
                values={values.workingHours}
                onChange={(selectedOption) => {
                  const event = { target: { name: 'workingHours', value: selectedOption } };
                  handleChangWorkingHours(event);
                }}
                onBlur={handleBlur}
                errorText={errors.workingHours && touched.workingHours && errors.workingHours}
                error={errors.workingHours && touched.workingHours}
                success={!errors.workingHours && touched.workingHours}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={10} lg={8}>
            <Box>
              <Input
                type="text"
                placeholder="eg. 1303, Shivalik Shilp, Iskcon Cross Rd, Sanidhya, Ahmedabad, Gujarat 380015"
                size="medium"
                fullWidth
                id="permanentAdd"
                name="permanentAdd"
                label="Permanent Address"
                value={values.permanentAdd}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.permanentAdd && touched.permanentAdd && errors.permanentAdd}
                error={errors.permanentAdd && touched.permanentAdd}
                success={!errors.permanentAdd && touched.permanentAdd}
              />
              {/* <Input */}
              {/*  type="text" */}
              {/*  placeholder="eg. 1303, Shivalik Shilp, Iskcon Cross Rd, Sanidhya, Ahmedabad, Gujarat 380015" */}
              {/*  size="medium" */}
              {/*  fullWidth */}
              {/*  id="permanentAdd" */}
              {/*  name="permanentAdd" */}
              {/*  label="Permanent Address" */}
              {/*  value={values.pAdd} */}
              {/*  onChange={handleChange} */}
              {/*  onBlur={handleBlur} */}
              {/*  errorText={errors.permanentAdd && touched.permanentAdd && errors.permanentAdd} */}
              {/*  error={errors.permanentAdd && touched.permanentAdd} */}
              {/*  success={!errors.permanentAdd && touched.permanentAdd} */}
              {/* /> */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Organisation;
