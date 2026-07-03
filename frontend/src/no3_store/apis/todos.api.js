// import axios from "axios";
import { rootApi } from "./root.api";

// const BASE_URL = "http://127.0.0.1:8000";

export const todosAllGetApi = async () => {
    try {
        // const response = await axios.get(`${BASE_URL}/todos`)
        const response = await rootApi.get("/todos")
        return response.data
    } catch(error) {
        throw error
    }
}

export const todosAllPostApi = async (dataObj) => {
    try {
        // const response = await axios.post(`${BASE_URL}/todos`, dataObj)
        const response = await rootApi.post("/todos", dataObj)
        return response.data
    } catch(error) {
        throw error
    }
}

export const todosAllPutApi = async (dataObj) => {
    try {
        // const response = await axios.put(`${BASE_URL}/todos/${dataObj.id}`, dataObj)
        const response = await rootApi.put(`/todos/${dataObj.id}`, dataObj)
        return response.data
    } catch(error) {
        throw error
    }
}

export const todosTogglePutApi = async (dataObj) => {
    try {
        // const response = await axios.patch(`${BASE_URL}/todos/${id}/toggle`)
        // 백엔드에 별도 toggle 엔드포인트가 없어서, 기존 PUT으로 처리 (id, subject, checked 전부 포함해서 전달)
        const response = await rootApi.put(`/todos/${dataObj.id}`, dataObj)
        return response.data
    } catch(error) {
        throw error
    }
}

export const todosAllDeleteApi = async (id) => {
    try {
        // const response = await axios.delete(`${BASE_URL}/todos/${id}`)
        const response = await rootApi.delete(`/todos/${id}`)
        return id
    } catch(error) {
        throw error
    }
}