import { generatePath } from 'react-router';

export const defaultPattern = '/';
export const getDefaultPattern = () => generatePath(defaultPattern);

export const loginPattern = '/login';
export const getLoginPattern = () => generatePath(loginPattern);

export const dashboardPattern = '/dashboard';
export const getDashboardPattern = () => generatePath(dashboardPattern);

export const forgotPasswordPattern = '/forgot-password';
export const getForgotPasswordPattern = () => generatePath(forgotPasswordPattern);

export const resetPasswordPattern = '/reset-password/:token';
export const getResetPasswordPattern = () => generatePath(resetPasswordPattern);

export const profilePattern = '/profile';
export const getProfilePattern = () => generatePath(profilePattern);

export const personalProfilePattern = `${profilePattern}/personal`;
export const getPersonalProfilePattern = () => generatePath(personalProfilePattern);

export const organisationProfilePattern = `${profilePattern}/organisation`;
export const getOrganisationProfilePattern = () => generatePath(organisationProfilePattern);

export const accountsProfilePattern = `${profilePattern}/accounts`;
export const getAccountsProfilePattern = () => generatePath(accountsProfilePattern);

export const profileSetupPattern = '/profileSetup';
export const getProfileSetupPattern = () => generatePath(profileSetupPattern);

export const privacyPolicyPattern = '/privacy';
export const getPrivacyPolicyPattern = () => generatePath(privacyPolicyPattern);

export const errorPattern = '*';
export const getErrorPattern = () => generatePath(errorPattern);

export const employeeListPattern = '/employee';
export const getEmployeeListPattern = () => generatePath(employeeListPattern);

export const employeeDetailsPattern = '/employee/:id';
export const getEmployeeDetailsPattern = (id) => generatePath(employeeDetailsPattern, { id });

export const expensePattern = '/expense';
export const getExpensePattern = () => generatePath(expensePattern);

export const leavePattern = '/leave';
export const getLeavePattern = () => generatePath(leavePattern);

export const payslipPattern = '/payslip';
export const getPayslipPattern = () => generatePath(payslipPattern);
export const settingPattern = '/setting';
export const getSettingPattern = () => generatePath(settingPattern);

export const attendancePattern = '/attendance';
export const getAttendancePattern = () => generatePath(attendancePattern);

export const reportPattern = '/report';
export const getReportPattern = generatePath(reportPattern);

export const allReportPattern = `${reportPattern}/allReport`;
export const getAllReportPattern = () => generatePath(allReportPattern);

export const reportTimeActivityPattern = `${reportPattern}/timeActivity`;
export const getReportTimeActivityPattern = () => generatePath(reportTimeActivityPattern);

export const reportWeeklyLimitPattern = `${reportPattern}/weeklyLimit`;
export const getReportWeeklyLimitPattern = () => generatePath(reportWeeklyLimitPattern);

export const holidayPattern = '/holiday';
export const getHolidayPattern = () => generatePath(holidayPattern);

export const supportTicketPattern = `/supportTicket`;
export const getSupportTicketPattern = () => generatePath(supportTicketPattern);

export const organisationSignupPattern = `/signup`;
export const getOrganisationSignupPattern = () => generatePath(organisationSignupPattern);

export const rolePattern = `/role`;
export const getRolePattern = () => generatePath(rolePattern);

export const roleDetailsPattern = `/role/:id`;
export const getRoleDetailsPattern = (id) => generatePath(roleDetailsPattern, { id });

export const noticePattern = `/notice`;
export const getNoticePattern = () => generatePath(noticePattern);
