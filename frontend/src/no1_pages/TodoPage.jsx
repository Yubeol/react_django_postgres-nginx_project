import React from 'react'
import TodoTemplate from '../no2_components/todo/TodoTemplate'
import TodoInsert from '../no2_components/todo/TodoInsert'
import TodoList from '../no2_components/todo/TodoList'
import TodoProvider from '../no0_context/TodoContext'
import { useAllGetTodo } from '../no3_store/useHooks/useTodos'

const TodoPage = () => {
    const { data: todoList = [] } = useAllGetTodo()

    return (
        <TodoProvider>
            <TodoTemplate count={todoList.length}>
                <TodoInsert />
                <TodoList />
            </TodoTemplate>
        </TodoProvider>
    )
}

export default TodoPage