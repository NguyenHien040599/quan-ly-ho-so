import axios from "axios"
import {
    useCookies
} from "vue3-cookies"


const {
    cookies
} = useCookies()

const baseUrl =
    import.meta.env.VITE_APP_PATH_API

const axiosInstance = axios.create({
    baseURL: baseUrl,
})

axiosInstance.interceptors.request.use(config => {
    config.headers['Authorization'] = 'Bearer ' + cookies.get('Token')
    return config;
}, error => {
    return Promise.reject(error)
});

axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});



export const fetchGetApi = (method, type, params) => {
    let config = {
        method,
        url: `${baseUrl}/${type}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: null,
        params
    }
    return axiosInstance(config)
}

export const fetchPostApi = (method, type, payload, params) => {
    let config = {
        method,
        url: `${baseUrl}/${type}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: payload,
        params
    }
    return axiosInstance(config)
}

export const fetchDeleteApi = (method, type, payload, params = null) => {
    let config = {
        method,
        url: `${baseUrl}/${type}/${payload}`,
        headers: {
            'Accept': 'application/json',
        },
        data: null,
        params
    }
    return axiosInstance(config)
}

export const fetchEditApi = (method, type, payload, params) => {
    let config = {
        method,
        url: `${baseUrl}/${type}/${payload.id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: payload,
        params
    }
    return axiosInstance(config)
}