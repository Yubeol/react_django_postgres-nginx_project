import React, {useState} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {useCurrentUser, useLogout} from '../../no3_store/useHooks/useAuth'
import LoginFormModal from '../user/LoginFormModal'
import RegisterFormModal from '../user/RegisterFormModal'

const HeaderBar = () => {
    const {data: user} = useCurrentUser();
    const logout = useLogout();
    const navigate = useNavigate();
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);

    const handleLogout = () => {
        logout()
        alert("로그아웃 되었습니다.");
        navigate("/");
    }

    return (
        <>
            <Header>
                <LogoArea>
                    <LogoIcon>M</LogoIcon>
                    <LogoText>MySystem</LogoText>
                </LogoArea>
                <ButtonGroup>
                    {user ? (
                        <>
                            <UserInfo>
                                <Avatar>{user.username?.[0]?.toUpperCase()}</Avatar>
                                <WelcomeText>{user.username}님</WelcomeText>
                            </UserInfo>
                            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                        </>
                    ) : (
                        <>
                            <AuthButton $outline onClick={() => setLoginOpen(true)}>로그인</AuthButton>
                            <AuthButton onClick={() => setRegisterOpen(true)}>회원가입</AuthButton>
                        </>
                    )}
                </ButtonGroup>
            </Header>
            <LoginFormModal open={loginOpen} setOpen={setLoginOpen}/>
            <RegisterFormModal open={registerOpen} setOpen={setRegisterOpen}/>
        </>
    )
}

export default HeaderBar

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    height: 60px;
    background: #0f172a;
    border-bottom: 1px solid #1e293b;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
`
const LogoArea = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`
const LogoIcon = styled.div`
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #6366f1, #818cf8);
    border-radius: 8px;
    color: white;
    font-weight: 700;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const LogoText = styled.div`
    font-size: 18px;
    font-weight: 700;
    color: #f8fafc;
`

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`
const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`
const Avatar = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #818cf8);
    color: white;
    font-size: 13px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
`
const WelcomeText = styled.span`
    color: #e2e8f0;
    font-size: 14px;
    font-weight: 500;
`
const AuthButton = styled.button`
    padding: 6px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: 0.2s;
    background: ${({$outline}) => $outline ? 'transparent' : '#6366f1'};
    color: ${({$outline}) => $outline ? '#a5b4fc' : 'white'};
    border: 1px solid #6366f1;
    &:hover {
        background: ${({$outline}) => $outline ? 'rgba(99,102,241,0.15)' : '#4f46e5'};
    }
`
const LogoutButton = styled.button`
    padding: 6px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    background: transparent;
    color: #f87171;
    border: 1px solid #f87171;
    transition: 0.2s;
    &:hover {
        background: rgba(248,113,113,0.15);
    }
`