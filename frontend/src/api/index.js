import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api/cyber_school',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
