import apolloClient from '../../no0_context/apolloClient';
import { GET_SALES, GET_SALE_BY_ID } from '../graphql/sales';

export const salesAllGetApi = async () => {
    try {
        const { data } = await apolloClient.query({
            query: GET_SALES,
            fetchPolicy: 'network-only',
        });
        return data.sales;
    } catch (error) {
        throw error;
    }
};

export const salesGetApi = async (id) => {
    try {
        const { data } = await apolloClient.query({
            query: GET_SALE_BY_ID,
            variables: { id: Number(id) },
            fetchPolicy: 'network-only',
        });
        return data.sale;
    } catch (error) {
        throw error;
    }
};