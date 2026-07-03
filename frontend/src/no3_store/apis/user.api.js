import { rootApi } from "./root.api";

export const userAllGetApi = async () => {
    try {
        const response = await rootApi.get("/users/")
        console.log(response.data)
        return response.data
    } catch(error) {
        return error
    }
}

export const userLoginApi = async (loginUser) => {
    try {
        const response = await rootApi.post(
            "/auth/login/",
            {
                username: loginUser.username,
                password: loginUser.password,
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.detail ??
            "로그인에 실패했습니다."
        );
    }
};

export const userRegisterApi = async (userObj) => {
    try {
        const response = await rootApi.post("/users/create/", userObj);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.detail ??
            "회원가입에 실패했습니다."
        );
    }
};

export const currentUserApi = async () => {
    const response = await rootApi.get("/auth/me/");
    return response.data;
};