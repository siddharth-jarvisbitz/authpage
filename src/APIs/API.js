import { getLoginPattern } from '../Routes/routeConfig';
import { convertFormData, queryString } from '../Helpers/Global';
import { API_BASE_URL } from '../Helpers/config';
import { store } from '../Redux/store';

const isTokenExpire = async (responseJson) => {
  const response = await responseJson;
  if (response.message === 'Unauthorized request') {
    window.location = getLoginPattern();
    return;
  }
  return response;
};

const handleNetworkError = async (responseError) => {
  if (responseError.name !== 'AbortError') {
    console.log('Network request error. Please try again.');
  }
};

export const login = async (data) =>
  fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/x-www-form-urlencoded'
    },
    body: await convertFormData(data)
  })
    .then(async (response) => isTokenExpire(response.json()))
    .catch((error) => handleNetworkError(error));

export const companyResetPassword = async (data, token) =>
  fetch(`${API_BASE_URL}/reset-password`, {
    method: 'PUT',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`
    },
    body: await convertFormData(data)
  })
    .then(async (response) => isTokenExpire(response.json()))
    .catch((error) => handleNetworkError(error));

export const companyForgotPassword = async (data) =>
  fetch(`${API_BASE_URL}/forgot-password`, {
    method: 'POST',
    headers: {
      Accept: 'application/x-www-form-urlencoded'
    },
    body: await convertFormData(data)
  })
    .then(async (response) => isTokenExpire(response.json()))
    .catch((error) => handleNetworkError(error));

export const companySignUp = async (data) =>
  fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/x-www-form-urlencoded'
    },
    body: await convertFormData(data)
  })
    .then(async (response) => isTokenExpire(response.json()))
    .catch((error) => handleNetworkError(error));

export const getCompanyEmployee = async (data) =>
  fetch(`${API_BASE_URL}/?${queryString(data)}`, {
    method: 'GET',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      Authorization: store.getState().route.currentUser.token
    }
  })
    .then(async (response) => isTokenExpire(response.json()))
    .catch((error) => handleNetworkError(error));
