// import axios from "axios";
import { rootApi } from "./root.api";

// const BASE_URL = "http://127.0.0.1:8000";

export const employeeAllGetApi = async () => {
    try {
        // const response = await axios.get(`${BASE_URL}/employees`)
        const response = await rootApi.get("/employees")
        return response.data
    } catch(error) {
        throw error
    }
}

export const employeeGetApi = async (id) => {
    try {
        // const response = await axios.get(`${BASE_URL}/employees/${id}`)
        const response = await rootApi.get(`/employees/${id}`)
        return response.data
    } catch(error) {
        throw error
    }
}

export const employeePostApi = async (dataObj) => {
    try {
        // const response = await axios.post(`${BASE_URL}/employees`, dataObj)
        const response = await rootApi.post("/employees", dataObj)
        return response.data
    } catch(error) {
        throw error
    }
}

export const employeePutApi = async (dataObj) => {
    try {
        // const response = await axios.put(`${BASE_URL}/employees/${dataObj.id}`, dataObj)
        const response = await rootApi.put(`/employees/${dataObj.id}`, dataObj)
        return response.data
    } catch(error) {
        throw error
    }
}

export const employeeDeleteApi = async (id) => {
    try {
        // await axios.delete(`${BASE_URL}/employees/${id}`)
        await rootApi.delete(`/employees/${id}`)
    } catch(error) {
        throw error
    }
}