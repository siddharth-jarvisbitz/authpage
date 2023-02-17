import React, { useState } from 'react';
import { Card, Icon, Grid, FormLabel, FormControl } from '@mui/material';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import { Add, DirectionsRun, ImportExportRounded, MoreTime, WatchOff } from '@mui/icons-material';
import Select from 'Elements/Select';
import { Months, Years, Status } from 'Helpers/Global';
import FilterLayout from 'Components/FilterLayout';
import { useSelector } from 'react-redux';
import attendanceData from './data/attendanceData';
import LeaveCard from '../../Components/CardLayouts/StaticCard';

const AttendanceList = () => {
  const { columns: prCols, adminColumns: adminPrCol, rows: prRows } = attendanceData;
  const { role } = useSelector((state) => state.route);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [status, setStatus] = useState('');
  const [user, setUser] = useState('');
  const [search, setSearch] = useState('');

  const handleChangeStatus = (value) => {
    setStatus(value);
  };

  const handleChangeMonth = (value) => {
    setMonth(value);
  };

  const handleChangeYear = (value) => {
    setYear(value);
  };

  const handleChangeUser = (value) => {
    setUser(value);
  };
  const handleChangeSearch = (event) => {
    setSearch(event);
  };

  const handleClear = () => {
    setMonth('');
    setYear('');
    setSearch('');
  };

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={4}>
          <LeaveCard
            title="Total Late Coming"
            count="12"
            icon={{ color: 'error', component: <WatchOff /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <LeaveCard
            title="Total Early Leaving"
            count="3"
            icon={{ color: 'info', component: <DirectionsRun /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <LeaveCard
            title="Total Overtime"
            count="4"
            icon={{ color: 'warning', component: <MoreTime /> }}
            isPercentage={false}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
        {role === 'admin' && (
          <Grid item xs="auto">
            <Button
              color="white"
              variant="outlined"
              size="small"
              sx={({ breakpoints, palette: { dark } }) => ({
                [breakpoints.down('xl' && 'lg')]: {
                  color: dark.main,
                  borderColor: dark.main
                }
              })}
            >
              <Icon sx={{ mr: 1 }}>
                <Add />
              </Icon>
              Add
            </Button>
          </Grid>
        )}
        <Grid item xs="auto">
          <Button
            color="white"
            variant="outlined"
            size="small"
            sx={({ breakpoints, palette: { dark } }) => ({
              [breakpoints.down('xl' && 'lg')]: {
                color: dark.main,
                borderColor: dark.main
              }
            })}
          >
            <Icon sx={{ mr: 1 }}>
              <ImportExportRounded />
            </Icon>
            Export
          </Button>
        </Grid>
      </Grid>
      <Card
        mb={3}
        sx={{
          background: ({ palette: { grey } }) => grey[100],
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <FilterLayout
          search={search}
          handleSearch={() => handleChangeSearch()}
          handleClear={() => handleClear()}
        >
          {role === 'admin' && (
            <Grid item sm={12} md={4} lg={3}>
              <FormControl sx={{ width: '100%' }}>
                <FormLabel>Select User</FormLabel>
                <Select
                  value={user}
                  onChange={handleChangeUser}
                  displayEmpty
                  renderValue={user !== '' ? undefined : () => 'Select...'}
                />
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Month</FormLabel>
              <Select
                value={month}
                options={Months}
                onChange={(value) => handleChangeMonth(value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Year</FormLabel>
              <Select value={year} options={Years} onChange={(value) => handleChangeYear(value)} />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Status</FormLabel>
              <Select
                value={status}
                options={Status}
                onChange={(value) => handleChangeStatus(value)}
              />
            </FormControl>
          </Grid>
        </FilterLayout>
        <Table columns={role === 'admin' ? adminPrCol : prCols} rows={prRows} />
      </Card>
    </>
  );
};
export default AttendanceList;
