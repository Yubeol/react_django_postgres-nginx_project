// import axios from "axios";
import { rootApi } from "./root.api";

// const BASE_URL = "http://127.0.0.1:8000";

export const productAllGetApi = async () => {
    try {
        // const response = await axios.get(`${BASE_URL}/products`)
        const response = await rootApi.get("/products")
        return response.data
    } catch(error) {
        throw error
    }
}

export const productGetApi = async (id) => {
    try {
        // const response = await axios.get(`${BASE_URL}/products/${id}`)
        const response = await rootApi.get(`/products/${id}`)
        return response.data
    } catch(error) {
        throw error
    }
}

export const productPostApi = async (dataObj) => {
    try {
        // const response = await axios.post(`${BASE_URL}/products`, dataObj)
        const response = await rootApi.post("/products", dataObj)
        return response.data
    } catch(error) {
        throw error
    }
}

export const productPutApi = async (dataObj) => {
    try {
        // const response = await axios.put(`${BASE_URL}/products/${dataObj.id}`, dataObj)
        const response = await rootApi.put(`/products/${dataObj.id}`, dataObj)
        return response.data
    } catch(error) {
        throw error
    }
}

export const productDeleteApi = async (id) => {
    try {
        // await axios.delete(`${BASE_URL}/products/${id}`)
        await rootApi.delete(`/products/${id}`)
    } catch(error) {
        throw error
    }
}