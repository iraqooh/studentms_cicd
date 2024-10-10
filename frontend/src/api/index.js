import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://ec2-13-60-241-109.eu-north-1.compute.amazonaws.com:3000/api/cyber_school',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
