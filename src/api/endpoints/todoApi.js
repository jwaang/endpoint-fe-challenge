import { request } from '../utils/request';

/**
 * Fetches all todos from the server
 */
export const getTodo = async () => {
    try {
        const response = await request(`/get`, {
            method: 'GET',
        });
        return response.json();
    } catch (error) {
        console.error(`Error fetching todos:`, error);
        throw error;
    }
};

/**
 * Updates a todo's completion status
 * @param {string} params.todoId - The ID of the todo to update
 * @param {boolean} params.isComplete - The new completion status
 */
export const updateTodo = async ({ todoId, isComplete }) => {
    try {
        const response = await request(`/patch/${todoId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isComplete }),
        });
        return response.json();
    } catch (error) {
        console.error(`Error updating todo ${todoId}:`, error);
        throw error;
    }
};
