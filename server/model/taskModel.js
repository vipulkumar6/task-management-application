import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    due_date: {
        type: Date,
        required: true
    },
    priority: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Task', TaskSchema);
