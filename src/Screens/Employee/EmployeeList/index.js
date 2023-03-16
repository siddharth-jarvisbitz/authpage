/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Card, FormControl, FormLabel, Icon, Grid } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import Input from 'Elements/Input';
import FilterLayout from 'Components/FilterLayout';
import Select from 'Elements/Select';
import { Roles } from 'Helpers/Global';
import { useNavigate, useOutletContext } from 'react-router';
import { getDashboardPattern, getEmployeeDetailsPattern } from 'Routes/routeConfig';
import moment from 'moment/moment';
import AddEmployeeForm from './AddEmployeeForm';
import employeeListData from './data/employeeListData';
import withStateDispatch from '../../../Helpers/withStateDispatch';

const EmployeeList = ({ GetEmployeeAdd, GetEmployeeList, Loading }) => {
  const { role } = useOutletContext();
  const { columns: prCols } = employeeListData;
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');
  const [allEmployee, setAllEmployee] = useState([]);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [sortKey, setSortKey] = useState('email');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const handleChangeRole = (value) => {
    setSelectedRole(value);
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value.trim());
  };

  const onClickAction = (key, value) => {
    if (key === 'details') {
      return navigate(getEmployeeDetailsPattern(value.slug));
    }
  };

  const onClickSearch = () => {
    setIsSearch(true);
    setFilter(!filter);
  };

  useEffect(() => {
    if (!isDialogOpen) {
      GetEmployeeList(
        { limit, startDate, endDate, role: selectedRole.value, search, page, sortKey, sortOrder },
        (res) => {
          if (res && res.data && res.data.data) {
            setAllEmployee(res.data.data.rows);
            setEmployeeCount(res.data.data.count);
            setFilter(false);
          }
        }
      );
    }
    return () => {};
  }, [isDialogOpen, filter]);

  const handleClear = () => {
    setEndDate('');
    setStartDate('');
    setSelectedRole('');
    setSearch('');
    setFilter(false);
  };

  const onPage = async (selectedPage) => {
    setPage(selectedPage);
  };

  const onRowsPerPageChange = async (selectedLimit) => {
    setLimit(selectedLimit);
  };

  const onSort = async (e, selectedSortKey, selectedSortOrder) => {
    setSortKey(selectedSortKey);
    setSortOrder(selectedSortOrder);
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
        {role === 'admin' ? (
          <>
            <Grid item xs="auto">
              <Button
                color="white"
                variant="outlined"
                size="small"
                onClick={() => setIsDialogOpen(true)}
              >
                <Icon sx={{ mr: 1 }}>
                  <Add />
                </Icon>
                Add
              </Button>
            </Grid>
            {/* <Grid item xs="auto">
              <Button color="white" variant="outlined" size="small" onClick={onClickExport}>
                <Icon sx={{ mr: 1 }}>
                  <ImportExportRounded />
                </Icon>
                Export
              </Button>
            </Grid> */}
          </>
        ) : null}
      </Grid>
      <Card
        sx={{
          background: ({ palette: { grey } }) => grey[100],
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <FilterLayout
          search={search}
          handleSearch={handleChangeSearch}
          handleClear={handleClear}
          onClickSearch={onClickSearch}
          loader={Loading}
          isSearch={isSearch}
        >
          <Grid item xs={6} md={4} lg={3}>
            <Input
              type="date"
              label="From Date"
              size="small"
              fullWidth
              id="fromDate"
              name="fromDate"
              value={startDate !== '' ? startDate : ''}
              onChange={(e) => setStartDate(e.target.value)}
              errorFalse
            />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Input
              type="date"
              label="To Date"
              size="small"
              fullWidth
              id="toDate"
              name="toDate"
              inputProps={{
                min: startDate
              }}
              value={endDate !== '' ? endDate : ''}
              onChange={(e) => setEndDate(e.target.value)}
              errorFalse
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Role</FormLabel>
              <Select
                value={selectedRole}
                options={Roles}
                onChange={(value) => handleChangeRole(value)}
              />
            </FormControl>
          </Grid>
        </FilterLayout>
        <Table
          columns={prCols}
          rows={allEmployee}
          onClickAction={(value, id) => onClickAction(value, id)}
          rowsCount={employeeCount}
          isAction
          options={[
            { title: 'Details', value: 'details' },
            { title: 'Delete', value: 'delete' }
          ]}
          initialPage={page}
          onChangePage={(value) => onPage(value)}
          rowsPerPage={limit}
          onRowsPerPageChange={(rowsPerPage) => onRowsPerPageChange(rowsPerPage)}
          sortKey={sortKey}
          sortOrder={sortOrder}
          handleRequestSort={(event, orderName, orderKey) => onSort(event, orderName, orderKey)}
        />
        <AddEmployeeForm
          GetEmployeeAdd={GetEmployeeAdd}
          isDialogOpen={isDialogOpen}
          handleDialog={() => setIsDialogOpen(false)}
          Loading={Loading}
        />
      </Card>
    </>
  );
};

export default withStateDispatch(EmployeeList);
