import React, { useState } from 'react';
import Typography from 'Elements/Typography';
import { Card, FormControlLabel, Grid, Switch } from '@mui/material';
import Input from 'Elements/Input';
import Button from 'Elements/Button';
import { Formik } from 'formik';
import { useNavigate, useOutletContext } from 'react-router';
import { roleFormSchema } from '../../../Helpers/ValidationSchema';
import { getRolePattern } from '../../../Routes/routeConfig';

const initialValues = {
  roleName: ''
};

const module = {
  dashboard: { r: '0', w: '0', d: '0' },
  employee: { r: '0', w: '0', d: '0' },
  expense: { r: '0', w: '0', d: '0' },
  leave: { r: '0', w: '0', d: '0' },
  payslip: { r: '0', w: '0', d: '0' },
  attendance: { r: '0', w: '0', d: '0' },
  role: { r: '0', w: '0', d: '0' },
  supportTicket: { r: '0', w: '0', d: '0' },
  reports: { r: '0', w: '0', d: '0' },
  allReports: { r: '0', w: '0', d: '0' },
  timeActivity: { r: '0', w: '0', d: '0' },
  weeklyLimit: { r: '0', w: '0', d: '0' },
  holiday: { r: '0', w: '0', d: '0' }
};
const AddRole = () => {
  const [modules, setModules] = useState(module);
  const { GetRoleAdd } = useOutletContext();
  const navigate = useNavigate();
  /* const { pathname } = useLocation();
  const collapseName = pathname.split('/').slice(1)[1]; */

  const onChangePermission = (moduleName, permissionKey) => {
    const data = { ...modules };
    data[moduleName][permissionKey] = modules[moduleName][permissionKey] === '0' ? '1' : '0';
    setModules(data);
  };

  return (
    <Card
      sx={{
        py: 2,
        px: 2,
        boxShadow: ({ boxShadows: { sm } }) => sm
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Grid item xs={12} md={12} lg={12}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values, action) => {
              const formData = {
                roleName: values.roleName,
                permission: JSON.stringify(module)
              };
              GetRoleAdd(formData, (res) => {
                const { status } = res.data;
                if (status) {
                  navigate(getRolePattern());
                }
              });
              action.setSubmitting(false);
            }}
            validationSchema={roleFormSchema}
          >
            {(props) => {
              const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button type="submit" color="info" variant="contained" size="medium">
                        Save
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Input
                        type="text"
                        placeholder="Write role here..."
                        size="medium"
                        id="roleName"
                        name="roleName"
                        label="Role Name"
                        fullWidth
                        value={values.roleName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errorText={errors.roleName && touched.roleName && errors.roleName}
                        error={errors.roleName && touched.roleName}
                        success={!errors.roleName && touched.roleName}
                      />
                    </Grid>
                  </Grid>
                </form>
              );
            }}
          </Formik>
        </Grid>
        <Grid item xs={12}>
          {Object.keys(modules).map((key) => (
            <Grid container sx={{ padding: 1 }}>
              <Grid item xs={12} md={2}>
                <Typography
                  variant="subtitle2"
                  color="text"
                  fontWeight="bold"
                  textTransform="capitalize"
                  sx={{ paddingRight: 2 }}
                >
                  {key}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={10}
                sx={{
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <FormControlLabel
                  sx={{ m: 0, fontSize: '14px' }}
                  value={modules[key].r === '1'}
                  control={
                    <Switch
                      checked={modules[key].r === '1'}
                      color="primary"
                      name="r"
                      onChange={() => onChangePermission(key, 'r')}
                    />
                  }
                  label={
                    <Typography
                      variant="button"
                      fontWeight="regular"
                      sx={{ cursor: 'pointer', userSelect: 'none', paddingRight: 2 }}
                    >
                      Read
                    </Typography>
                  }
                  labelPlacement="end"
                />
                <FormControlLabel
                  sx={{ m: 0, fontSize: '14px' }}
                  value={modules[key].w === '1'}
                  control={
                    <Switch
                      checked={modules[key].w === '1'}
                      color="primary"
                      name="w"
                      onChange={() => onChangePermission(key, 'w')}
                    />
                  }
                  label={
                    <Typography
                      variant="button"
                      fontWeight="regular"
                      sx={{ cursor: 'pointer', userSelect: 'none', paddingRight: 2 }}
                    >
                      Write
                    </Typography>
                  }
                  labelPlacement="end"
                />
                <FormControlLabel
                  sx={{ m: 0, fontSize: '14px' }}
                  value={modules[key].d === '1'}
                  control={
                    <Switch
                      checked={modules[key].d === '1'}
                      color="primary"
                      name="d"
                      onChange={() => onChangePermission(key, 'd')}
                    />
                  }
                  label={
                    <Typography
                      variant="button"
                      fontWeight="regular"
                      sx={{ cursor: 'pointer', userSelect: 'none', paddingRight: 2 }}
                    >
                      Delete
                    </Typography>
                  }
                  labelPlacement="end"
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Card>
  );
};
export default AddRole;
