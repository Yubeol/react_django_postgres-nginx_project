import React from 'react'
import styled from 'styled-components'
import { MdEventNote } from 'react-icons/md'

const TodoTemplate = ({ children, count }) => {
    return (
        <Wrapper>
            <Header>
                <HeaderLeft>
                    <PageIcon><MdEventNote size={20} /></PageIcon>
                    <HeaderText>
                        <Title>일정 관리</Title>
                        <Subtitle>오늘의 일정을 관리하세요{count !== undefined ? ` · 총 ${count}건` : ''}</Subtitle>
                    </HeaderText>
                </HeaderLeft>
            </Header>
            <Box>{children}</Box>
        </Wrapper>
    )
}

export default TodoTemplate

const Wrapper = styled.div`
    padding: 32px 36px;
    min-height: 100vh;
    background: #f8fafc;
`
const Header = styled.div`
    margin-bottom: 20px;
`
const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
`
const PageIcon = styled.div`
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: linear-gradient(135deg, #6366f1, #818cf8);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`
const HeaderText = styled.div``
const Title = styled.h2`
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 2px;
`
const Subtitle = styled.p`
    font-size: 13px;
    color: #94a3b8;
    margin: 0;
`
const Box = styled.div`
    background: white;
    border-radius: 16px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    overflow: hidden;
    border: 1px solid #e2e8f0;
`