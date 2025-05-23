import axios from 'axios';

export const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Interceptor để tự động thêm token
request.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('authToken');
    // const test = '';
    // console.log('token: ', token);
    // console.log('test: ', test);
    if (!token) token = '';
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export const get = async (path, options) => {
  const response = await request.get(path, options);

  return response.data;
};

export const post = async (path, data, options) => {
  const response = await request.post(path, data, options);

  return response;
};

export const patch = async (path, data, options) => {
  const response = await request.patch(path, data, options);

  return response;
};

export const deleted = async (path, options) => {
  const response = await request.delete(path, options);

  return response;
};
