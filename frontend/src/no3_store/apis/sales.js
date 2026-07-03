// import axios from "axios";
import { rootApi } from "./root.api";

// const BASE_URL = "http://127.0.0.1:8000";

export const salesAllGetApi = async () => {
    try {
        // const response = await axios.get(`${BASE_URL}/sales`)
        const response = await rootApi.get("/sales")
        return response.data
    } catch(error) {
        throw error
    }
}

export const salesGetApi = async (id) => {
    try {
        // const response = await axios.get(`${BASE_URL}/sales/${id}`)
        const response = await rootApi.get(`/sales/${id}`)
        return response.data
    } catch(error) {
        throw error
    }
}

export const salesPostApi = async (dataObj) => {
    try {
        // const response = await axios.post(`${BASE_URL}/sales`, dataObj)
        const response = await rootApi.post("/sales", dataObj)
        return response.data
    } catch(error) {
        throw error
    }
}

export const salesPutApi = async (dataObj) => {
    try {
        // const response = await axios.put(`${BASE_URL}/sales/${dataObj.id}`, dataObj)
        const response = await rootApi.put(`/sales/${dataObj.id}`, dataObj)
        return response.data
    } catch(error) {
        throw error
    }
}

export const salesDeleteApi = async (id) => {
    try {
        // await axios.delete(`${BASE_URL}/sales/${id}`)
        await rootApi.delete(`/sales/${id}`)
    } catch(error) {
        throw error
    }
}