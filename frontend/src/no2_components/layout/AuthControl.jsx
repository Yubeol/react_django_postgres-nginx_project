import React from 'react'
import { useCurrentUser } from '../../no3_store/useHooks/useAuth'

const AuthControl = ({
                         message = "로그인 후 이용 가능합니다."
                     }) => {
    const { data: user } = useCurrentUser()
    const isLogin = !!user;
    if (isLogin) return null;
    return (
        <div>
            <div>{message}</div>
        </div>
    )
}

export default AuthControl