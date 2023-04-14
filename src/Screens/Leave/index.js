import React, { useEffect, useState } from 'react';
import { Card, Icon, Grid, FormControl, FormLabel } from '@mui/material';
import Table from 'Elements/Tables/Table';
import Button from 'Elements/Button';
import {
  Add,
  DirectionsRun,
  Vaccines,
  CalendarMonth,
  Celebration,
  RemoveRedEye
} from '@mui/icons-material';
import LeaveCard from 'Components/CardLayouts/StaticCard';
import Input from 'Elements/Input';
import FilterLayout from 'Components/FilterLayout';
import DialogMenu from 'Elements/Dialog';
import { DialogAction, DialogContent } from 'Components/Dialog';
import { useOutletContext } from 'react-router';
import { leaveListData } from 'StaticData/leaveListData';
import moment from 'moment';
import AddLeaveForm from './AddLeaveForm';
import LeaveDetails from './LeaveDetails';
import Select from '../../Elements/Select';
import { actionStatus } from '../../Helpers/Global';

const LeaveList = () => {
  const { columns: prCols, adminColumns: adminPrCol } = leaveListData;
  const { role, GetLeaveAddUpdate, GetLeaveList, GetLeaveDelete, GetLeaveReason, GetLeaveById } =
    useOutletContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [search, setSearch] = useState('');
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
  const [status, setStatus] = useState('');
  const [approveRejectReason, setApproveRejectReason] = useState('');

  useEffect(() => {
    if (!isDialogOpen || !isDeleteDialogOpen || isViewLeaveDialogOpen) {
      GetLeaveList(
        {
          limit: isNaN(limit) ? 0 : limit,
          startDate,
          endDate,
          status: status.value,
          search,
          page,
          sortKey: sort.key === 'employee' ? 'firstName' : sort.key,
          sortOrder: sort.order
        },
        (res) => {
          if (res && res.data && res.data.data) {
            const { rows, count } = res.data.data;
            setAllLeave(rows);
            setLeaveCount(count);
          }
        }
      );
    }
    return () => {};
  }, [isDialogOpen, page, sort, filter, isDeleteDialogOpen, isViewLeaveDialogOpen, limit]);

  const handleClear = () => {
    setEndDate('');
    setStartDate('');
    setStatus('');
    setSearch('');
    setFilter(!filter);
  };

  return (
    <>
      <Grid container spacing={3} mb={3}>
        {role === 'admin' ? (
          <>
            <Grid item xs={12} md={6} lg={3}>
              <LeaveCard
                title="Total Leave Request"
                count={leaveCount && leaveCount.TotalLeaveRequest}
                icon={{ color: 'info', component: <CalendarMonth /> }}
                isPercentage={false}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <LeaveCard
                title="Total Leave Approved"
                count={leaveCount && leaveCount.TotalLeaveApproved}
                icon={{ color: 'warning', component: <Vaccines /> }}
                isPercentage={false}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <LeaveCard
                title="Total Leave Declined"
                count={leaveCount && leaveCount.TotalLeaveDeclined}
                icon={{ color: 'primary', component: <Celebration /> }}
                isPercentage={false}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} md={6} lg={3}>
              <LeaveCard
                title="Total Leave"
                count={leaveCount && leaveCount.totalLeave}
                icon={{ color: 'info', component: <CalendarMonth /> }}
                isPercentage={false}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <LeaveCard
                title="Medical Leave"
                count={leaveCount && leaveCount.medicalLeave}
                icon={{ color: 'warning', component: <Vaccines /> }}
                isPercentage={false}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <LeaveCard
                title="Other Leave"
                count={leaveCount && leaveCount.otherLeave}
                icon={{ color: 'primary', component: <Celebration /> }}
                isPercentage={false}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <LeaveCard
                title="Remaining Leave"
                count={leaveCount && leaveCount.remainingLeave <= 0 ? 0 : leaveCount.remainingLeave}
                icon={{ color: 'success', component: <DirectionsRun /> }}
                isPercentage={false}
              />
            </Grid>
          </>
        )}
      </Grid>
      {role !== 'admin' && (
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
              onClick={() => setIsDialogOpen(!isDialogOpen)}
            >
              <Icon sx={{ mr: 1 }}>
                <Add />
              </Icon>
              APPLY
            </Button>
          </Grid>
        </Grid>
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
          handleSearch={(e) => setSearch(e.target.value)}
          handleClear={handleClear}
          onClickSearch={() => {
            if (allLeave.length > 0) {
              const allFilterValues = {
                startDate,
                endDate,
                status,
                search
              };
              const isValues = !Object.values(allFilterValues).some((x) => x !== '');
              if (!isValues) {
                setFilter(!filter);
              }
            }
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
              inputProps={{
                min: moment().subtract(50, 'Y').format('YYYY-MM-DD'),
                max: moment().add(50, 'Y').format('YYYY-MM-DD')
              }}
              errorFalse
              value={startDate !== '' ? startDate : ''}
              onChange={(e) => setStartDate(e.target.value)}
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
              errorFalse
              value={endDate !== '' ? endDate : ''}
              onChange={(e) => setEndDate(e.target.value)}
              inputProps={{
                min: moment().subtract(50, 'Y').format('YYYY-MM-DD'),
                max: moment().add(50, 'Y').format('YYYY-MM-DD')
              }}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>Select Status</FormLabel>
              <Select
                size="small"
                value={status}
                options={actionStatus}
                onChange={(value) => setStatus(value)}
              />
            </FormControl>
          </Grid>
        </FilterLayout>

        <Table
          columns={role === 'admin' ? adminPrCol : prCols}
          rows={allLeave}
          badge={['status']}
          onClickAction={(value, { id }) => {
            if (value === 'delete') {
              setSelectedData(id);
              setIsDeleteDialogOpen(true);
            } else {
              GetLeaveById(id, (res) => {
                if (res && res.data && res.data.data) {
                  const { data } = res.data;
                  const setViewData = {
                    id: data.id,
                    leaveType: data.leaveType,
                    selectType: data.selectType,
                    fromDate: data.fromDate,
                    toDate: data.toDate,
                    noOfDays: data.noOfDays,
                    approvedBy: data.approvedBy,
                    reason: data.reason.replace(/(<([^>]+)>)/gi, ''),
                    ...(value === 'view' && { status: data.status }),
                    comment: data.comment
                  };
                  setSelectedData(setViewData);
                  if (value === 'edit') {
                    setIsEdit(true);
                    setIsDialogOpen(true);
                  } else if (value === 'view') {
                    setIsViewLeaveDialogOpen(true);
                  }
                }
              });
            }
          }}
          isAction={role !== 'admin'}
          options={[
            { name: 'edit', title: 'Edit', value: 'edit' },
            { name: 'delete', title: 'Delete', value: 'delete' },
            { name: 'view', title: 'View', value: 'view' }
          ]}
          isView={
            role === 'admin' && [
              {
                name: 2,
                tooltip: 'Click to view',
                color: 'info',
                icon: <RemoveRedEye />,
                value: 'view'
              }
            ]
          }
          rowsCount={leaveCount && leaveCount.total}
          initialPage={page}
          onChangePage={(value) => setPage(value)}
          rowsPerPage={isNaN(limit) ? leaveCount.total : limit}
          onRowsPerPageChange={(rowsPerPage) => {
            setLimit(rowsPerPage);
          }}
          sortKey={sort.key}
          sortOrder={sort.order}
          handleRequestSort={(event, key, order) => key !== 'action' && setSort({ order, key })}
        />
        {isDialogOpen && (
          <AddLeaveForm
            isDialogOpen={isDialogOpen}
            handleDialog={() => {
              setIsDialogOpen(!isDialogOpen);
              setIsEdit(false);
              setSelectedData(null);
            }}
            title={isEdit ? 'UPDATE LEAVE' : 'NEW LEAVE'}
            selectedData={selectedData}
            isEdit={isEdit}
            GetLeaveAddUpdate={GetLeaveAddUpdate}
          />
        )}
        {isDeleteDialogOpen && (
          <DialogMenu
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            dialogTitle="Delete Leave"
            dialogContent={<DialogContent content="Are you sure you want to delete this ?" />}
            dialogAction={
              <DialogAction
                approveColor="error"
                rejectColor="info"
                approveTitle="Delete"
                rejectTitle="Cancel"
                handleApprove={() =>
                  GetLeaveDelete(selectedData, () => {
                    setIsDeleteDialogOpen(false);
                    setIsEdit(false);
                  })
                }
                handleReject={() => setIsDeleteDialogOpen(false)}
              />
            }
          />
        )}
      </Card>

      {isViewLeaveDialogOpen && selectedData && (
        <DialogMenu
          isOpen={isViewLeaveDialogOpen}
          onClose={() => setIsViewLeaveDialogOpen(false)}
          dialogTitle={selectedData.leaveType}
          dialogContent={
            <DialogContent
              customContent={
                <LeaveDetails
                  data={selectedData}
                  role={role}
                  approveRejectReason={(value) => setApproveRejectReason(value)}
                />
              }
            />
          }
          dialogAction={
            role === 'admin' &&
            selectedData.status === 'pending' && (
              <DialogAction
                approveColor="success"
                rejectColor="error"
                approveTitle="Approve"
                rejectTitle="Reject"
                approveDisable={!approveRejectReason}
                rejectDisable={!approveRejectReason}
                handleApprove={() =>
                  GetLeaveReason(
                    {
                      data: {
                        status: 'approved',
                        comment: approveRejectReason
                      },
                      id: selectedData.id
                    },
                    () => setIsViewLeaveDialogOpen(false)
                  )
                }
                handleReject={() =>
                  GetLeaveReason(
                    {
                      data: {
                        status: 'reject',
                        comment: approveRejectReason
                      },
                      id: selectedData.id
                    },
                    () => setIsViewLeaveDialogOpen(false)
                  )
                }
              />
            )
          }
        />
      )}
    </>
  );
};

export default LeaveList;
