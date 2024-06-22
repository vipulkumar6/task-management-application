import Task from '../model/taskModel.js'

export const create = async (req, res) => {
    try {
        const taskData = new Task(req.body);
        if (!taskData) {
            return res.status(404).json({ msg: "Data not found" })
        }

        const savedData = await taskData.save();
        res.status(200).json(savedData)
    }
    catch (e) {
        console.log(e)
    }
}

export const getAll = async (req, res) => {
    try {
        const taskData = await Task.find();
        if (!taskData) {
            return res.status(404).json({ msg: "Data not found" })
        }

        res.status(200).json(taskData);
    }
    catch (e) {
        console.log(e)
    }
}

export const getByid = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ msg: "Data not found" })
        }

        res.status(200).json(task);
    }
    catch (e) {
        console.log(e)
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ msg: "Data not found" })
        }


        const updateData = await Task.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updateData);
    }
    catch (e) {
        console.log(e)
    }
}

export const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ msg: "Data not found" })
        }
        await Task.findByIdAndDelete(id)
        res.status(200).json({ msg: "User Deleted" });
    }
    catch (e) {
        console.log(e)
    }
}