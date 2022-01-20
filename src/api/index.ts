import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://posdata.io',
});

export default Api;
