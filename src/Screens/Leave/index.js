/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Card, Icon, Grid } from '@mui/material';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import { Add, DirectionsRun, Vaccines, CalendarMonth, Celebration } from '@mui/icons-material';
import LeaveCard from 'Components/CardLayouts/StaticCard';
import Input from 'Elements/Input';
import FilterLayout from 'Components/FilterLayout';
import { useSelector } from 'react-redux';
import DialogMenu from 'Elements/Dialog';
import { DeleteDialogAction, DeleteDialogContent } from 'Components/DeleteDialog';
import leaveListData from './data/leaveListData';
import AddLeaveForm from './AddLeaveForm';
import ViewLeaveDetails from './ViewLeaveDetails';
import withStateDispatch from '../../Helpers/withStateDispatch';

const adminLeaveOptions = [{ title: 'View', value: 'view' }];
const empLeaveOptions = [
  { title: 'Edit', value: 'edit' },
  { title: 'View', value: 'view' },
  { title: 'Delete', value: 'delete' }
];

const LeaveList = ({ GetLeaveAdd, GetLeaveList }) => {
  const { columns: prCols, adminColumns: adminPrCol, rows: prRows } = leaveListData;
  const { role } = useSelector((state) => state.login);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  const [search, setSearch] = useState('');
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [isViewLeaveDialogOpen, setIsViewLeaveDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sort, setSort] = useState({ key: 'fromDate', order: 'asc' });
  const [filter, setFilter] = useState(false);
  const [allLeave, setAllLeave] = useState([]);
  const [leaveCount, setLeaveCount] = useState({});

  useEffect(() => {
    if (!isDialogOpen) {
      GetLeaveList(
        {
          limit,
          startDate,
          endDate,
          search,
          page,
          sortKey: sort.key,
          sortOrder: sort.order
        },
        (res) => {
          if (res && res.data && res.data.data) {
            const { rows, count } = res.data.data;
            setAllLeave(rows);
            setLeaveCount(count);
            setFilter(false);
          }
        }
      );
    }
    return () => {};
  }, [isDialogOpen, page, sort, filter]);

  const handleDialog = () => {
    setSelectedData(null);
    setIsDialogOpen(!isDialogOpen);
  };

  const handleOpenDialog = () => {
    setIsLeaveDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsLeaveDialogOpen(false);
  };

  const handleCloseViewDialog = () => {
    setIsViewLeaveDialogOpen(false);
  };

  const onClickView = (row) => {
    setSelectedData(row);
    handleOpenDialog();
  };

  const onClickAction = (key, data) => {
    if (key === 'edit') {
      setIsEdit(true);
      setSelectedData(allLeave.find((o) => o.id === data.id));
      setIsDialogOpen(!isDialogOpen);
    } else if (key === 'view') {
      if (role === 'admin') {
        onClickView(data);
      } else {
        const viewData = allLeave.find((o) => o.id === data.id);
        const setViewData = {
          leaveType: viewData.leaveType,
          selectType: viewData.selectType,
          fromDate: viewData.fromDate,
          toDate: viewData.toDate,
          noOfDays: viewData.noOfDays,
          apporvedBy: viewData.approvedBy,
          status: viewData.status,
          reason: viewData.reason.replace(/(<([^>]+)>)/gi, '')
        };
        setSelectedData(setViewData);
        setIsViewLeaveDialogOpen(true);
      }
    } else {
      setSelectedId(data.id);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const onDelete = async () => {
    handleDialogClose();
  };

  const handleClear = () => {
    setEndDate('');
    setStartDate('');
    setSearch('');
    setFilter(false);
  };

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6} lg={3}>
          <LeaveCard
            title="Total Leave"
            count={leaveCount.totalLeave}
            icon={{ color: 'info', component: <CalendarMonth /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <LeaveCard
            title="Medical Leave"
            count={leaveCount.medicalLeave}
            icon={{ color: 'warning', component: <Vaccines /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <LeaveCard
            title="Other Leave"
            count={leaveCount.otherLeave}
            icon={{ color: 'primary', component: <Celebration /> }}
            isPercentage={false}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <LeaveCard
            title="Remaining Leave"
            count={leaveCount.remainingLeave}
            icon={{ color: 'success', component: <DirectionsRun /> }}
            isPercentage={false}
          />
        </Grid>
      </Grid>
      {role !== 'admin' && (
        <>
          <Grid container spacing={2} alignItems="center" justifyContent="flex-end" mb={2}>
            <Grid item xs="auto">
              <Button
                sx={({ breakpoints, palette: { dark } }) => ({
                  [breakpoints.down('xl' && 'lg')]: {
                    color: dark.main,
                    borderColor: dark.main
                  }
                })}
                variant="outlined"
                size="small"
                onClick={() => handleDialog()}
              >
                <Icon sx={{ mr: 1 }}>
                  <Add />
                </Icon>
                APPLY
              </Button>
            </Grid>
          </Grid>
        </>
      )}

      <Card
        sx={{
          background: ({ palette: { grey } }) => grey[100],
          borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
          boxShadow: ({ boxShadows: { md } }) => md
        }}
      >
        <FilterLayout
          search={search}
          handleSearch={(e) => setSearch(e.target.value.trim())}
          handleClear={handleClear}
          onClickSearch={() => {
            setFilter(!filter);
          }}
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
              value={endDate !== '' ? endDate : ''}
              onChange={(e) => setEndDate(e.target.value)}
              errorFalse
            />
          </Grid>
        </FilterLayout>

        <Table
          columns={role === 'admin' ? adminPrCol : prCols}
          rows={allLeave}
          onClickAction={(value, data) => onClickAction(value, data)}
          isAction
          options={role === 'admin' ? adminLeaveOptions : empLeaveOptions}
          rowsCount={leaveCount.total}
          initialPage={page}
          onChangePage={(value) => setPage(value)}
          rowsPerPage={limit}
          onRowsPerPageChange={(rowsPerPage) => {
            setLimit(rowsPerPage);
          }}
          sortKey={sort.key}
          sortOrder={sort.order}
          handleRequestSort={(event, orderKey, orderName) =>
            setSort({ order: orderName, key: orderKey })
          }
        />
        {isDialogOpen && (
          <AddLeaveForm
            isDialogOpen={isDialogOpen}
            handleDialog={() => handleDialog()}
            title={isEdit ? 'UPDATE LEAVE' : 'ADD LEAVE'}
            setIsEdit={(value) => setIsEdit(value)}
            selectedData={selectedData}
            setSelectedData={(value) => setSelectedData(value)}
            isEdit={isEdit}
            GetLeaveAdd={GetLeaveAdd}
          />
        )}
        {isDeleteDialogOpen && (
          <DialogMenu
            isOpen={isDeleteDialogOpen}
            onClose={() => handleDialogClose()}
            dialogTitle="Delete"
            dialogContent={<DeleteDialogContent content="Are you sure you want to delete this ?" />}
            dialogAction={
              <DeleteDialogAction
                handleDialogClose={handleDialogClose}
                selectedId={selectedId}
                message="Are you sure want to delete this?"
                deleteItem={() => onDelete()}
                buttonTitle="Delete"
              />
            }
          />
        )}
      </Card>

      {(isLeaveDialogOpen || isViewLeaveDialogOpen) && selectedData && (
        <DialogMenu
          isOpen={isLeaveDialogOpen || isViewLeaveDialogOpen}
          onClose={isLeaveDialogOpen ? handleCloseDialog : handleCloseViewDialog}
          dialogTitle={`Leave Details: ${selectedData.leaveType}`}
          dialogContent={<ViewLeaveDetails info={selectedData} />}
          dialogAction={
            role === 'admin' && (
              <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
                <Grid item>
                  <Button
                    type="submit"
                    color="info"
                    variant="contained"
                    size="small"
                    onClick={() => handleCloseDialog()}
                  >
                    Approve
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => handleCloseDialog()}
                  >
                    Reject
                  </Button>
                </Grid>
              </Grid>
            )
          }
        />
      )}
    </>
  );
};

export default withStateDispatch(LeaveList);
