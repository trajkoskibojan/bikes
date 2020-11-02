import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://json-project3.herokuapp.com/',
});
export default instance;
