import React, { useEffect, useMemo, useState } from 'react';
import Box from 'Elements/Box';
import { Grid } from '@mui/material';
import Calendar from 'Components/Calendar';
import {
  HolidayVillage,
  PendingTwoTone,
  PeopleRounded,
  Watch,
  WatchLater,
  WatchRounded
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getEmployeeListPattern, getExpensePattern, getLeavePattern } from 'Routes/routeConfig';
import DashboardCard from 'Components/CardLayouts/StaticCard';
import { getEmployeeById } from 'APIs/API';
import { CURRENTUSER } from 'Redux/actions';
import { getDashboardList } from 'APIs/Dashboard';

const DashboardDefault = () => {
  let calenderData = [];
  const { role } = useSelector((state) => state.route);
  const { currentUser } = useSelector((state) => state.route);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [calendarEventsData, setCalendarEventsData] = useState([]);
  const [currentWeekHours, setCurrentWeekHours] = useState(0);
  const [currentMonthHours, setCurrentMonthHours] = useState(0);
  const noticeEventList = [
    {
      title: 'JBT Demo',
      eventName: 'JBT Demo',
      eventType: 'event',
      eventClass: 'success',
      start: '2023-03-10',
      end: '2023-03-10'
    },
    {
      title: 'Notice',
      eventName: 'Notice',
      eventType: 'notice',
      eventClass: 'warning',
      start: '2023-03-20',
      end: '2023-03-22'
    }
  ];

  const getUserDetails = async () => {
    const employeeDetailsRes = await getEmployeeById(currentUser.id);
    const { status, data } = employeeDetailsRes;
    if (status) {
      dispatch({
        type: CURRENTUSER,
        value: { ...currentUser, profilePic: data.profile.profilePic }
      });
    }
  };

  const getAllDashboardList = async () => {
    const getAllDashboardListRes = await getDashboardList();
    const { status, data } = getAllDashboardListRes;
    if (status) {
      const { percentage, totalWeekHours, totalMonthHours, holidayList } = data;
      setCurrentMonthHours(totalMonthHours);
      setCurrentWeekHours(totalWeekHours);
      dispatch({
        type: CURRENTUSER,
        value: { ...currentUser, profilePercentage: percentage }
      });
      calenderData = holidayList.map((holiday) => ({
        title: holiday.title,
        eventName: 'holiday.title',
        eventType: 'holiday',
        eventClass: 'info',
        start: holiday.holidayDate,
        end: holiday.holidayDate
      }));
      setCalendarEventsData([...calenderData, ...noticeEventList]);
    }
  };

  useEffect(() => {
    getUserDetails();
    getAllDashboardList();
  }, []);

  const handleTotalEmployee = () => {
    navigate(getEmployeeListPattern());
  };

  const handlePendingExpense = () => {
    navigate(getExpensePattern());
  };

  const handlePendingLeave = () => {
    navigate(getLeavePattern());
  };

  return (
    <Box mb={3}>
      <Grid container spacing={3}>
        <Grid
          container
          order={{ xs: 1, lg: 0 }}
          alignItems="flex-start"
          spacing={3}
          item
          xs={12}
          lg={12}
          xl={12}
        >
          {role === 'admin' ? null : (
            <>
              <Grid item xs={12} md={6} lg={3}>
                <DashboardCard
                  title="Today"
                  count="07:15:34"
                  icon={{ color: 'success', component: <Watch /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <DashboardCard
                  title="Current week"
                  count={currentWeekHours}
                  icon={{ color: 'secondary', component: <WatchRounded /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <DashboardCard
                  title="Current month"
                  count={currentMonthHours}
                  icon={{ color: 'info', component: <WatchLater /> }}
                  isPercentage={false}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} lg={role === 'admin' ? 8 : 12}>
            {useMemo(
              () => (
                <Calendar
                  header={{ title: 'Current Month Updates' }}
                  headerToolbar={{
                    left: 'prev,next today',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    center: 'title'
                  }}
                  initialView="dayGridMonth"
                  events={calendarEventsData}
                  selectable
                />
              ),
              [calendarEventsData]
            )}
          </Grid>
          {role === 'admin' ? (
            <Grid container item spacing={3} xs={12} lg={4}>
              <Grid item xs={12} lg={6} onClick={handleTotalEmployee} sx={{ cursor: 'pointer' }}>
                <DashboardCard
                  title="Total Employee"
                  count="10"
                  icon={{ color: 'info', component: <PeopleRounded /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid item xs={12} lg={6} onClick={handleTotalEmployee} sx={{ cursor: 'pointer' }}>
                <DashboardCard
                  title="Today Present"
                  count="9"
                  icon={{ color: 'success', component: <PeopleRounded /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid item xs={12} lg={6} onClick={handleTotalEmployee} sx={{ cursor: 'pointer' }}>
                <DashboardCard
                  title="Today Absent"
                  count="1"
                  icon={{ color: 'error', component: <PeopleRounded /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid item xs={12} lg={6} onClick={handlePendingExpense} sx={{ cursor: 'pointer' }}>
                <DashboardCard
                  title="Pending Expense"
                  count="1"
                  icon={{ color: 'warning', component: <PendingTwoTone /> }}
                  isPercentage={false}
                />
              </Grid>
              <Grid item xs={12} lg={6} onClick={handlePendingLeave} sx={{ cursor: 'pointer' }}>
                <DashboardCard
                  title="Pending Leave Approval"
                  count="0"
                  icon={{ color: 'secondary', component: <HolidayVillage /> }}
                  isPercentage={false}
                />
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardDefault;
