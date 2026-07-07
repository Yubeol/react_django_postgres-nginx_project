import React from 'react'
import TodoListChild from './TodoListChild'
import styled from 'styled-components'
import { useAllGetTodo } from '../../no3_store/useHooks/useTodos'

const TodoList = () => {
    const { data: todoList = [], isLoading, error } = useAllGetTodo()
    if (isLoading) return <StatusText>불러오는 중...</StatusText>
    if (error) return <StatusText $error>{error.message}</StatusText>

    return (
        <TableWrap>
            <Table>
                <thead>
                <tr>
                    <Th style={{ width: '72px' }}>ID</Th>
                    <Th>일정명</Th>
                    <Th style={{ width: '100px' }}>상태</Th>
                    <Th style={{ width: '140px' }}>생성일</Th>
                    <Th style={{ width: '60px' }}></Th>
                </tr>
                </thead>
                <tbody>
                {todoList?.map(item => (
                    <TodoListChild key={item.id} item={item} />
                ))}
                </tbody>
            </Table>
        </TableWrap>
    )
}

export default TodoList

const TableWrap = styled.div`
    overflow: hidden;
`
const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`
const Th = styled.th`
    padding: 12px 20px;
    text-align: left;
    font-size: 11px;
    color: #94a3b8;
    font-weight: 700;
    background: #f8fafc;
    border-bottom: 1px solid #f1f5f9;
    text-transform: uppercase;
    letter-spacing: 0.06em;
`
const StatusText = styled.p`
    text-align: center;
    padding: 60px 0;
    color: ${({ $error }) => $error ? '#ef4444' : '#94a3b8'};
    font-size: 14px;
`