import {
    useQuery,
    useQueryClient,
    useMutation
} from "@tanstack/react-query"
import {
    userLoginApi,
    currentUserApi,
} from "../apis/user.api"


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
            localStorage.setItem("accessToken", data.accessToken);
            queryClient.invalidateQueries({ queryKey: ["currentUser"] })
        }
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