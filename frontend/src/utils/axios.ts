import baseAxios from 'axios';

const axiosInstance = baseAxios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    withCredentials: true,
    timeout: 30000
});

export default axiosInstance;