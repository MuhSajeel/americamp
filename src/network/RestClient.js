/* eslint-disable import/named */
import { create } from 'apisauce';
import { BASE_URL, API_VERSION } from '../constants';

// Rest Client for Americamp APIs
export const RestClient = create({
  baseURL: `${BASE_URL}/${API_VERSION}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
    Authorization: '',
  },
  timeout: 30000,
});
