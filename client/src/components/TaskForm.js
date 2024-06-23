import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/react";
import { parseDate, CalendarDate } from '@internationalized/date'; // Ensure this is the correct import
import { Checkbox } from "@nextui-org/react";
import { RevolvingDot } from 'react-loader-spinner'

const TaskForm = ({ task, onClose, refreshTasks }) => {

    const [loading, setLoading] = useState(false)
    const initialData = task || { title: '', description: '', due_date: '', priority: false, completed: false };

    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const [formData, setFormData] = useState({
        ...initialData,
        due_date: initialData.due_date ? parseDate(formatDate(initialData.due_date)) : null
    });
    const handleChange = (e) => {
        if (e.target) {
            const { name, value, type, checked } = e.target;
            setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
        } else {
            // e is the CalendarDate object
            setFormData({ ...formData, due_date: e });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const dataToSubmit = {
                ...formData,
                due_date: formData.due_date ? formData.due_date.toString() : ''
            };


            if (task) {
                await axios.put(`https://task-management-application-6she.onrender.com/update/${task._id}`, dataToSubmit);
                toast.success('Task updated successfully');
            } else {
                await axios.post('https://task-management-application-6she.onrender.com/create', dataToSubmit);
                toast.success('Task created successfully');
            }
            refreshTasks();
            onClose();
        } catch (error) {
            console.error('Error saving task:', error);
            toast.error(`Failed to save task: ${error.message}`);
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2 className='text-base task_add_head'>{task ? 'Edit Task' : 'Add New Task'}</h2>
                <hr className='task_add_head_divider' />
                <form onSubmit={handleSubmit}>
                    <div className="title-container">
                        <Input
                            className='input'
                            type="text"
                            label="Title"
                            value={formData.title}
                            onChange={handleChange}
                            name='title'
                            required
                        />
                        {formData.priority && <span className="important-tag">Important</span>}
                    </div>
                    <Textarea
                        className='input'
                        type="text"
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter your description"
                        required
                    />

                    <DatePicker
                        className='input'
                        label="Due Date"
                        variant="flat"
                        value={formData.due_date}
                        onChange={date => handleChange(date)}
                        required
                    />

                    <label>
                        <Checkbox
                            type="checkbox"
                            name="priority"
                            checked={formData.priority}
                            onChange={handleChange}
                        >
                            Priority
                        </Checkbox>
                    </label>
                    <label>
                        <Checkbox
                            type="checkbox"
                            name="completed"
                            checked={formData.completed}
                            onChange={handleChange}
                        >
                            Completed
                        </Checkbox>
                    </label>

                    <div className="buttons">
                        <button className='saveBtn' type="submit">Save</button>
                        <button className='cancelBtn' type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
                {
                    loading &&
                    (
                        <div className='loader_for_add'>
                            <RevolvingDot
                                visible={true}
                                height={40}
                                width={40}
                                radius={13}
                                color="#4fa94d"
                                ariaLabel="revolving-dot-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default TaskForm;
