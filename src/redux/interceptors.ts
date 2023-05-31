import {WEBCONST} from './../constants/webConstants';
import {setTokensToStorage, logout} from './../utils/localStorage/index';
import axios from 'axios';
import {getTokensKeychain} from '../utils/localStorage';

export const instance = axios.create({
  baseURL: `${WEBCONST().APIURLNEW}/api/v1/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

let failedQueue: any[] = [];
let isRefreshing = false;

instance.interceptors.request.use(async config => {
  const tokens = await getTokensKeychain();

  if (!tokens) {
    return config;
  }
  // @ts-ignore
  config.headers['Authorization'] = `Bearer ${tokens.access_token}`;
  return config;
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(resolve => {
          failedQueue.push({resolve, originalRequest});
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      // Get the refresh token from secure storage
      const newtokens = await getTokensKeychain();

      // Refresh the access token
      if (!newtokens) {
        return Promise.reject('tokens not found in keychain');
      }
      const newAccessToken = await refreshAccessToken(newtokens.refresh_token);
      // Update the request with the new access token
      originalRequest.headers[
        'Authorization'
      ] = `Bearer ${newAccessToken?.access_token}`;

      // Resend the failed request
      const response = await axios(originalRequest);

      isRefreshing = false;
      failedQueue.forEach(promise => promise.resolve(response));
      failedQueue.length = 0;

      return response;
    }

    return Promise.reject(error);
  },
);

const refreshAccessToken = async (
  refreshToken: string,
): Promise<{access_token: string; refresh_token: string} | null> => {
  try {
    const response = await axios.post(
      'https://api.blinkfix.me/api/v1/user/token',
      {
        token: refreshToken,
      },
    );

    const newTokensSet = response.data.data;
    if (!newTokensSet) {
      return null;
    }

    // Store the new access token
    await setTokensToStorage(newTokensSet);

    return newTokensSet;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
