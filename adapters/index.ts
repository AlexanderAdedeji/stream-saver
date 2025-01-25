// import useStore from '@/store';
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

// export const baseURL =
//   import.meta.env.VITE_USE_PROXY === 'true'
//     ? '/api'
//     : import.meta.env.VITE_API_URL;

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log(baseURL)

const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use(


    (config: any) => {

        const token = "useStore.getState().authDetails.token"
        return {
            ...config,
            headers: {
                ...config.headers,
                Authorization: `Token ${token}`,
            },
        };
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        return Promise.reject(error);
    }
);

// api no auth
export const ApiNoAuth = axios.create({
    baseURL,
});

ApiNoAuth.interceptors.request.use(
    (config) => {
        return { ...config };
    },
    (error) => {
        return Promise.reject(error);
    }
);

ApiNoAuth.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
