import React from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { IoCalendarClearOutline } from "react-icons/io5";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Task = ({ task, onEdit, onDelete, onView }) => {
    // Function to format the date as "DD MMM, YYYY"
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div className="task">
            <div className="task-header">
                <h3>{task.title} </h3>
                {task.priority && <span className="important-tag">Important</span>}
            </div>
            <div className="desc">
                <p>{task.description}</p>
            </div>
            <hr className="divider" />
            <div className="allbuttons">
                <div className="buttons">
                    <Tooltip title="View">
                        <IconButton>
                            <VisibilityIcon onClick={() => onView(task)} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton>
                            <EditIcon onClick={() => onEdit(task)} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton>
                            <DeleteIcon onClick={() => onDelete(task._id)} />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="date">
                    <p className="flex items-center"><span>Due On</span> {formatDate(task.due_date)}</p>
                </div>
            </div>
        </div>
    );
};

export default Task;
