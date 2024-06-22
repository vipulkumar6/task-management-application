import React, { useEffect, useState } from 'react';
import Task from './Task';
import { toast } from 'react-hot-toast';

const TaskList = ({ tasks, onEdit, onDelete, onView, filter }) => {
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        filterTasks();
    }, [filter, tasks]);

    const filterTasks = () => {
        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        const tomorrowString = new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0];

        let filtered = [];

        switch (filter) {
            case 'today':
                filtered = tasks.filter(task => new Date(task.due_date).toISOString().split('T')[0] === todayString && !task.completed);
                break;
            case 'tomorrow':
                filtered = tasks.filter(task => new Date(task.due_date).toISOString().split('T')[0] === tomorrowString && !task.completed);
                break;
            case 'pending':
                filtered = tasks.filter(task => new Date(task.due_date) < new Date() && !task.completed);
                break;
            case 'completed':
                filtered = tasks.filter(task => task.completed);
                break;
            default:
                filtered = tasks;
                break;
        }

        setFilteredTasks(filtered);
    };

    return (
        <div className='task_list'>
            {filteredTasks.map(task => (

                <Task
                    key={task._id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onView={onView}
                />
            ))}
        </div>
    );
};

export default TaskList;
