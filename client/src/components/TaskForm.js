import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/react";
import { parseDate, CalendarDate } from '@internationalized/date'; // Ensure this is the correct import
import { Checkbox } from "@nextui-org/react";

const TaskForm = ({ task, onClose, refreshTasks }) => {
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
        try {
            const dataToSubmit = {
                ...formData,
                due_date: formData.due_date ? formData.due_date.toString() : ''
            };

            if (task) {
                await axios.put(`http://localhost:5000/update/${task._id}`, dataToSubmit);
                toast.success('Task updated successfully');
            } else {
                await axios.post('http://localhost:5000/create', dataToSubmit);
                toast.success('Task created successfully');
            }
            refreshTasks();
            onClose();
        } catch (error) {
            console.error('Error saving task:', error);
            toast.error(`Failed to save task: ${error.message}`);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>
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
            </div>
        </div>
    );
};

export default TaskForm;
