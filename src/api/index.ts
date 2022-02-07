import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://posdata.io',
});

const authConfig = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  auth: {
    username: 'frontendapp',
    password: '123456',
  },
};

export {Api, authConfig};
