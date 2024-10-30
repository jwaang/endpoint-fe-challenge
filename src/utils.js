export const sortTodos = (todos) => {
    return todos.sort((a, b) => {
        const now = new Date();

        // Helper function to determine the category of each task
        const getCategory = (task) => {
            if (!task.isComplete) {
                if (task.dueDate && new Date(task.dueDate) < now) {
                    // Overdue and incomplete
                    return 1;
                }
                // Incomplete but not overdue
                return 2;
            }
            // Completed tasks
            return 3;
        };

        // Compare categories
        const categoryA = getCategory(a);
        const categoryB = getCategory(b);
        if (categoryA !== categoryB) {
            return categoryA - categoryB;
        }

        // Within the same category, place tasks with due dates first
        const hasDueDateA = a.dueDate ? 0 : 1;
        const hasDueDateB = b.dueDate ? 0 : 1;
        if (hasDueDateA !== hasDueDateB) {
            return hasDueDateA - hasDueDateB;
        }

        // For tasks with due dates, sort by the due date
        if (a.dueDate && b.dueDate) {
            const dueDateA = new Date(a.dueDate);
            const dueDateB = new Date(b.dueDate);
            return dueDateA - dueDateB;
        }

        // For tasks without due dates, maintain original order or sort by description
        return 0;
    })
};
