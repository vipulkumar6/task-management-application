import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { IoAddOutline } from "react-icons/io5";
import Swal from 'sweetalert2'

import { RevolvingDot } from 'react-loader-spinner'

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [filter, setFilter] = useState('');
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true)

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
        finally {
            setLoading(false);
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
        const { title, description, due_date } = task;

        Swal.fire({
            title: title,
            icon: "success",
            html: `
            <p><strong>Description:</strong> ${description}</p>
            <small><strong>Due Date:</strong> ${new Date(due_date).toLocaleDateString()}</small>
        `,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'OK',
        });
    };


    const handleDeleteTask = async (id) => {
        try {

            const result = await Swal.fire({
                title: "Are you sure you want to delete this task?",
                showDenyButton: true,
                confirmButtonText: "Delete",
                denyButtonText: `Don't delete`,
                icon: "warning"
            });

            if (result.isConfirmed) {
                await axios.delete(`https://task-management-application-6she.onrender.com/delete/${id}`);
                Swal.fire("Deleted!", "Your task has been deleted.", "success");
                fetchTasks();
            }
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

            {
                loading ?
                    (
                        <div className='loader items-center h-4/5'>

                            <RevolvingDot
                                visible={true}
                                height="80"
                                width="80"
                                color="#4fa94d"
                                ariaLabel="revolving-dot-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                            <p>Please Wait, data fetching...</p>
                        </div>

                    )
                    :
                    (
                        <TaskList
                            tasks={tasks}
                            filter={filter}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                            onView={handleViewTask}
                        />
                    )
            }

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
