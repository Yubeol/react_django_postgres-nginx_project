import apolloClient from '../../no0_context/apolloClient';
import { GET_USERS, LOGIN, CREATE_USER, GET_ME } from '../graphql/user';

export const userAllGetApi = async () => {
    try {
        const { data } = await apolloClient.query({
            query: GET_USERS,
            fetchPolicy: 'network-only',
        });
        console.log(data.users);
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
        const { data } = await apolloClient.mutate({
            mutation: CREATE_USER,
            variables: {
                input: {
                    ...userObj,
                    age: Number(userObj.age),
                },
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
        query: GET_ME,
        fetchPolicy: 'network-only',
    });
    return data.me;
};