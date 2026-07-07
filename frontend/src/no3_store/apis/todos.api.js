import apolloClient from '../graphql/apolloClient.js';
import {
    GET_TODOS,
    CREATE_TODO,
    UPDATE_TODO,
    TOGGLE_TODO,
    DELETE_TODO,
} from '../graphql/todo';

export const todosAllGetApi = async () => {
    try {
        const { data } = await apolloClient.query({
            query: GET_TODOS,
            fetchPolicy: 'network-only',
        });
        return data.todos;
    } catch (error) {
        throw error;
    }
};

export const todosAllPostApi = async (dataObj) => {
    try {
        const { subject, checked } = dataObj;
        const { data } = await apolloClient.mutate({
            mutation: CREATE_TODO,
            variables: { input: { subject, checked } },
        });
        return data.createTodo;
    } catch (error) {
        throw error;
    }
};

export const todosAllPutApi = async (dataObj) => {
    try {
        const { id, subject, checked } = dataObj;
        const { data } = await apolloClient.mutate({
            mutation: UPDATE_TODO,
            variables: { id: Number(id), input: { subject, checked } },
        });
        return data.updateTodo;
    } catch (error) {
        throw error;
    }
};

export const todosTogglePutApi = async (dataObj) => {
    try {
        const { data } = await apolloClient.mutate({
            mutation: TOGGLE_TODO,
            variables: { id: Number(dataObj.id) },
        });
        return data.toggleTodo;
    } catch (error) {
        throw error;
    }
};

export const todosAllDeleteApi = async (id) => {
    try {
        await apolloClient.mutate({
            mutation: DELETE_TODO,
            variables: { id: Number(id) },
        });
        return id;
    } catch (error) {
        throw error;
    }
};