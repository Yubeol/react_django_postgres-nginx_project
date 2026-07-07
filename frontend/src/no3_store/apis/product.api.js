import apolloClient from '../../no0_context/apolloClient';
import {
    GET_PRODUCTS,
    GET_PRODUCT_BY_ID,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
} from '../graphql/product';

export const productAllGetApi = async () => {
    try {
        const { data } = await apolloClient.query({
            query: GET_PRODUCTS,
            fetchPolicy: 'network-only',
        });
        return data.products;
    } catch (error) {
        throw error;
    }
};

export const productGetApi = async (id) => {
    try {
        const { data } = await apolloClient.query({
            query: GET_PRODUCT_BY_ID,
            variables: { id: Number(id) },
            fetchPolicy: 'network-only',
        });
        return data.product;
    } catch (error) {
        throw error;
    }
};

export const productPostApi = async (dataObj) => {
    try {
        const { productName, color, price, salePrice, categoryCode } = dataObj;
        const { data } = await apolloClient.mutate({
            mutation: CREATE_PRODUCT,
            variables: { input: { productName, color, price, salePrice, categoryCode } },
        });
        return data.createProduct;
    } catch (error) {
        throw error;
    }
};

export const productPutApi = async (dataObj) => {
    try {
        const { id, productName, color, price, salePrice, categoryCode } = dataObj;
        const { data } = await apolloClient.mutate({
            mutation: UPDATE_PRODUCT,
            variables: { id: Number(id), input: { productName, color, price, salePrice, categoryCode } },
        });
        return data.updateProduct;
    } catch (error) {
        throw error;
    }
};

export const productDeleteApi = async (id) => {
    try {
        await apolloClient.mutate({
            mutation: DELETE_PRODUCT,
            variables: { id: Number(id) },
        });
    } catch (error) {
        throw error;
    }
};