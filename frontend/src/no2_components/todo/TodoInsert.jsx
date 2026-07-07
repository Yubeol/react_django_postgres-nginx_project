import React, { useState } from 'react'
import styled from 'styled-components'
import { useAllPostTodo } from '../../no3_store/hooks/useTodos'

const TodoInsert = () => {
    const [subject, setSubject] = useState('')
    const [error, setError] = useState('')
    const postMutation = useAllPostTodo()

    const handleChange = (e) => {
        setSubject(e.target.value)
        if (error) setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!subject.trim()) {
            setError('할 일을 먼저 입력해 주세요.')
            return
        }
        try {
            await postMutation.mutateAsync({ subject, checked: false })
            setSubject('')
        } catch {
            alert("등록 실패")
        }
    }

    return (
        <Wrapper>
            <Form onSubmit={handleSubmit}>
                <StyledInput
                    type="text"
                    value={subject}
                    onChange={handleChange}
                    placeholder='할 일을 입력하세요'
                    $hasError={!!error}
                />
                <AddButton>+ 추가</AddButton>
            </Form>
            {error && <ErrorText>{error}</ErrorText>}
        </Wrapper>
    )
}

export default TodoInsert

const Wrapper = styled.div`
    background: #fafbfc;
    border-bottom: 1px solid #f1f5f9;
`
const Form = styled.form`
    display: flex;
    gap: 8px;
    padding: 16px 20px;
`
const StyledInput = styled.input`
    flex: 1;
    padding: 9px 14px;
    border: 1.5px solid ${({ $hasError }) => ($hasError ? '#ef4444' : '#e2e8f0')};
    border-radius: 10px;
    font-size: 14px;
    outline: none;
    background: white;
    color: #0f172a;
    transition: 0.2s;
    &:focus {
        border-color: ${({ $hasError }) => ($hasError ? '#ef4444' : '#6366f1')};
        box-shadow: 0 0 0 3px ${({ $hasError }) => ($hasError ? 'rgba(239,68,68,0.10)' : 'rgba(99,102,241,0.10)')};
    }
    &::placeholder { color: #cbd5e1; }
`
const AddButton = styled.button`
    padding: 9px 22px;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
    white-space: nowrap;
    &:hover { background: #4f46e5; }
    &:active { background: #4338ca; }
`
const ErrorText = styled.p`
    color: #ef4444;
    font-size: 13px;
    margin: 6px 20px 0;
`