import apolloClient from '../graphql/apolloClient.js';
import { GET_USERS, CREATE_USER } from '../graphql/user';
import { LOGIN, ME } from '../graphql/auth';

export const userAllGetApi = async () => {
    try {
        const { data } = await apolloClient.query({
            query: GET_USERS,
            fetchPolicy: 'network-only',
        });
        return data.users;
    } catch (error) {
        return error;
    }
};

export const userLoginApi = async (loginUser) => {
    try {
        const { data } = await apolloClient.mutate({
            mutation: LOGIN,
            variables: {
                input: {
                    name: loginUser.username,
                    password: loginUser.password,
                },
            },
        });
        return data.login;
    } catch (error) {
        throw new Error(
            error.message ?? "로그인에 실패했습니다."
        );
    }
};

export const userRegisterApi = async (userObj) => {
    try {
        const { username, password, age, email, city } = userObj;
        const { data } = await apolloClient.mutate({
            mutation: CREATE_USER,
            variables: {
                input: { username, password, age: Number(age), email, city },
            },
        });
        return data.createUser;
    } catch (error) {
        throw new Error(
            error.message ?? "회원가입에 실패했습니다."
        );
    }
};

export const currentUserApi = async () => {
    const { data } = await apolloClient.query({
        query: ME,
        fetchPolicy: 'network-only',
    });
    return data.me;
};