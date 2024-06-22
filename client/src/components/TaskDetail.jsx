import React from 'react';

const TaskDetail = ({ task }) => {
    return (
        <div>
            <h2>Task Detail</h2>
            <p><strong>Title:</strong> {task.title}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Due Date:</strong> {new Date(task.due_date).toLocaleDateString()}</p>
            <p><strong>Priority:</strong> {task.priority ? 'Yes' : 'No'}</p>
            <p><strong>Completed:</strong> {task.completed ? 'Yes' : 'No'}</p>
        </div>
    );
};

export default TaskDetail;
