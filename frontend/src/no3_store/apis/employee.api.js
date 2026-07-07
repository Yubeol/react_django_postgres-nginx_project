import apolloClient from '../../no0_context/apolloClient';
import {
    GET_EMPLOYEES,
    GET_EMPLOYEE_BY_ID,
    CREATE_EMPLOYEE,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
} from '../graphql/employee';

export const employeeAllGetApi = async () => {
    try {
        const { data } = await apolloClient.query({
            query: GET_EMPLOYEES,
            fetchPolicy: 'network-only',
        });
        return data.employees;
    } catch (error) {
        throw error;
    }
};

export const employeeGetApi = async (id) => {
    try {
        const { data } = await apolloClient.query({
            query: GET_EMPLOYEE_BY_ID,
            variables: { id: Number(id) },
            fetchPolicy: 'network-only',
        });
        return data.employee;
    } catch (error) {
        throw error;
    }
};

export const employeePostApi = async (dataObj) => {
    try {
        const { name, email, job, pay } = dataObj;
        const { data } = await apolloClient.mutate({
            mutation: CREATE_EMPLOYEE,
            variables: { input: { name, email, job, pay: Number(pay) } },
        });
        return data.createEmployee;
    } catch (error) {
        throw error;
    }
};

export const employeePutApi = async (dataObj) => {
    try {
        const { id, name, email, job, pay } = dataObj;
        const { data } = await apolloClient.mutate({
            mutation: UPDATE_EMPLOYEE,
            variables: { id: Number(id), input: { name, email, job, pay: Number(pay) } },
        });
        return data.updateEmployee;
    } catch (error) {
        throw error;
    }
};

export const employeeDeleteApi = async (id) => {
    try {
        await apolloClient.mutate({
            mutation: DELETE_EMPLOYEE,
            variables: { id: Number(id) },
        });
    } catch (error) {
        throw error;
    }
};