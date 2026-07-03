import axios from "axios";

// export const rootApi = axios.create({
//     baseURL: "http://localhost:8000",
// });

// export const rootApi = axios.create({
//     baseURL: "http://localhost:8080",
// });

// export const rootApi = axios.create({
//     baseURL: "http://localhost:8000/api",
// });

export const rootApi = axios.create({
    baseURL: "/api",   // 절대경로(localhost:8000) 대신 상대경로로 변경
});


rootApi.interceptors.request.use((config) => {

    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});