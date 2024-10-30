import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './TodoItemPresentational.module.css';

/**
 * TodoItemPresentational - A presentational component for rendering individual todo items
 * 
 * This component is responsible for the visual representation of a todo item.
 * It displays a checkbox for completion status, the todo description, and an optional due date.
 * 
 * Visual States:
 * - Completed: Light green background
 * - Overdue: Light red background (only if not completed)
 * - Neutral: Light gray background (not completed and not overdue)
 */
const TodoItemPresentational = ({ todoId, isComplete, description, formattedDueDate, handleToggleTodo, isOverdue }) => {
    return (
        <div className={classNames(styles.todoItem, {
            [styles.completed]: isComplete,
            [styles.overdue]: isOverdue && !isComplete,
            [styles.neutral]: !isComplete && !isOverdue
        })}>
            <input
                type="checkbox"
                checked={isComplete}
                onChange={() => handleToggleTodo({ todoId, isComplete })}
            />
            <span className={classNames(styles.description, { [styles.completed]: isComplete })}>
                {description}
            </span>
            {formattedDueDate && <span className={styles.dueDate}>{formattedDueDate}</span>}
        </div>
    );
};

TodoItemPresentational.propTypes = {
    todoId: PropTypes.string.isRequired,
    isComplete: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    formattedDueDate: PropTypes.string,
    handleToggleTodo: PropTypes.func.isRequired,
    isOverdue: PropTypes.bool,
};

TodoItemPresentational.defaultProps = {
    isOverdue: false,
};

export default TodoItemPresentational;
