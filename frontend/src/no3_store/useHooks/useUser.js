import {
    useQuery,
    useMutation
} from "@tanstack/react-query"
import {
    userAllGetApi,
    userRegisterApi,
} from "../apis/user.api"


export const useAllGetUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: userAllGetApi
    })
}

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: userRegisterApi
    })
}