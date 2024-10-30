import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { updateTodo } from '../../api/endpoints/todoApi';
import TodoItemPresentational from './TodoItemPresentational';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { getTodo } from '../../api/endpoints/todoApi';
import styles from './TodoItemContainer.module.css';
import { sortTodos } from '../../utils';

/**
 * TodoItemContainer - Container component for managing todo items
 * 
 * This component handles the data fetching, updating, and presentation logic for todos.
 * It uses React Query for data management and renders the TodoItemPresentational component
 * for each todo item.
 */
const TodoItemContainer = () => {
    const queryClient = useQueryClient();

    const { data: todos, error, isLoading: isFetchingTodosLoading } = useQuery({
        queryKey: ['todos'], queryFn: getTodo, select: (data) => {
            return sortTodos(data);
        }
    });

    const { mutateAsync: updateTodoMutation } = useMutation({
        mutationFn: updateTodo,
        onMutate: async ({ todoId, isComplete }) => {
            // Optimistically update todos for better user experience
            await queryClient.cancelQueries({ queryKey: ['todos'] });
            const previousTodos = queryClient.getQueryData(['todos']);
            queryClient.setQueryData(['todos'], (oldTodos) => {
                return oldTodos.map(todo =>
                    todo.id === todoId ? { ...todo, isComplete } : todo
                );
            });
            return { previousTodos };
        },
        onError: (error, _, context) => {
            console.error(`Error updating todo:`, error);
            if (context?.previousTodos) {
                queryClient.setQueryData(['todos'], context.previousTodos);
            }
        },
    })

    if (isFetchingTodosLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching todos!</div>;
    }

    const handleToggleTodo = async ({ todoId, isComplete }) => {
        await updateTodoMutation({ todoId, isComplete: !isComplete });
    };


    return (
        <div>
            <header className={styles.header}>
                <h1>Todo List</h1>
            </header>
            <main className={styles.todoList}>
                {todos.length > 0 ? (
                    <>
                        {todos.map(({ id, isComplete, description, dueDate }) => {
                            const formattedDueDate = dueDate ? dayjs(dueDate).format('MM/DD/YYYY') : '';
                            const isOverdue = formattedDueDate && dayjs(formattedDueDate).isBefore(dayjs());
                            return (
                                <TodoItemPresentational
                                    key={id}
                                    todoId={id}
                                    isComplete={isComplete}
                                    description={description}
                                    formattedDueDate={formattedDueDate}
                                    isOverdue={isOverdue}
                                    handleToggleTodo={handleToggleTodo}
                                />
                            );
                        })}
                    </>
                ) : (
                    <p>No todos available</p>
                )}
            </main>
        </div>
    );
};

export default TodoItemContainer;