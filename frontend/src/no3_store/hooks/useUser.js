import {
    useQuery,
    useQueryClient,
    useMutation
} from "@tanstack/react-query"
import {
    userAllGetApi,
    userLoginApi,
    userRegisterApi,
    currentUserApi,
} from "../apis/user.api"


export const useAllGetUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: userAllGetApi
    })
}

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: currentUserApi,
        enabled: !!localStorage.getItem("accessToken"),
        retry: false,
    })
}

export const useLoginUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: userLoginApi,
        onSuccess: (data) => {
            // localStorage.setItem("accessToken", token.access_token);
            localStorage.setItem("accessToken", data.token);
            queryClient.invalidateQueries({ queryKey: ["currentUser"] })
        }
    })
}

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: userRegisterApi
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient();
    return () => {
        localStorage.removeItem("accessToken");
        queryClient.setQueryData(["currentUser"], null);
    };
}

export const logout = () => {
    localStorage.removeItem("accessToken")
}