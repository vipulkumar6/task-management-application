import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { IoAddOutline } from "react-icons/io5";

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [filter, setFilter] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('https://task-management-application-6she.onrender.com/getall');
            const sortedTasks = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setTasks(sortedTasks);
        } catch (error) {
            toast.error('Failed to fetch tasks');
        }
    };

    const handleAddNewTask = () => {
        setCurrentTask(null);
        setIsModalOpen(true);
    };

    const handleEditTask = (task) => {
        setCurrentTask(task);
        setIsModalOpen(true);
    };

    const handleViewTask = (task) => {
        toast(`Title: ${task.title}\nDescription: ${task.description}\nDue Date: ${new Date(task.due_date).toLocaleDateString()}`);
    };

    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(`https://task-management-application-6she.onrender.com/delete/${id}`);
            toast.success('Task deleted successfully');
            fetchTasks();
        } catch (error) {
            toast.error('Failed to delete task');
        }
    };
    const computeTaskCounts = () => {
        const counts = {
            all: tasks.length,
            today: tasks.filter(task => isToday(task.due_date)).length,
            tomorrow: tasks.filter(task => isTomorrow(task.due_date)).length,
            pending: tasks.filter(task => isPending(task.due_date, task.completed)).length,
            completed: tasks.filter(task => task.completed).length
        };
        return counts;
    };
    const isToday = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        return due.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
    };

    const isTomorrow = (dueDate) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const due = new Date(dueDate);
        return due.setHours(0, 0, 0, 0) === tomorrow.setHours(0, 0, 0, 0);
    };

    const isPending = (dueDate, completed) => {
        const today = new Date();
        const due = new Date(dueDate);
        return !completed && due < today;
    };

    const taskCounts = computeTaskCounts();

    return (
        <div className='home_container'>

            <div className='header'>
                <h2>Task Manage</h2>
                <button className='add_button common_dark_btn' onClick={handleAddNewTask}><IoAddOutline size={20} />Add New Task</button>
            </div>
            <div className="tabs">
                <button className='all' onClick={() => setFilter('')}>All ({taskCounts.all})</button>
                <button className='today' onClick={() => setFilter('today')}>Today ({taskCounts.today})</button>
                <button className='tom' onClick={() => setFilter('tomorrow')}>Tomorrow ({taskCounts.tomorrow})</button>
                <button className='pending' onClick={() => setFilter('pending')}>Pending ({taskCounts.pending})</button>
                <button className='completed' onClick={() => setFilter('completed')}>Completed ({taskCounts.completed})</button>
            </div>
            <TaskList
                tasks={tasks}
                filter={filter}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onView={handleViewTask}
            />
            {isModalOpen && (
                <TaskForm
                    task={currentTask}
                    onClose={() => setIsModalOpen(false)}
                    refreshTasks={fetchTasks}
                />
            )}
        </div>
    );
};

export default HomePage;
