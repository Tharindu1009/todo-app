import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import TodoItem from '../components/TodoItem/TodoItem';
import ButtonPrimary from '../components/PrimaryButton/PrimaryButton';
import { isLoggedIn } from "../middleware";
import { FormControl, TextField, Button, InputLabel, Select, OutlinedInput, Alert, FormHelperText } from '@mui/material';
import Modal from 'react-modal';
import { addTodo, updateTodo, clearErrorMessage } from "../redux/features/todos";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import '../styles/todo-list.scss';

let validationSchema = yup.object().shape({
    task: yup.string().required("Task name is required."),
    priority: yup.string().required("Task priority is required.")
});

function TodoList() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {},
        resolver: yupResolver(validationSchema),
        mode: "onChange",
    });

    const history = useNavigate();
    const dispatch = useDispatch();

    const todoList = useSelector((state) => state.todo.list);
    const errorMessage = useSelector((state) => state.todo.errorMessage);

    useEffect(() => {
        // check user loggedin
        if (!isLoggedIn()) {
            history('/');
        }
        reset({});
    }, []);

    const [open, setOpen] = useState(false)

    const controlModal = (status) => {
        dispatch(clearErrorMessage())
        setOpen(status);
        reset({});
    }

    const handleAddNewTask = async (data) => {
        const newTodo = {
            ...data,
            id: todoList.length + 1,
            isCompleted: false
        }
        dispatch(addTodo(newTodo))
        reset({});
        setOpen(false);
    }

    const changeTaskStatus = (id, status) => {
        const data = {
            id: id,
            status: false
        }
        if (!status) {
            data.status = true;
        }
        dispatch(updateTodo(data))
    }

    return (
        <div>
            {/* start of login page header */}
            <Header navBartitle="My Tasks" mainTitle="Marketing Campaign" isVisibleMenuIcon={true} />
            {/* end of login page header */}

            {/* start of todo list */}
            <div className="todo-main-container">
                <div className="todo-list-wrapper">
                    <div className="tooo-list-header">
                        <ButtonPrimary text="Add Task" onClick={() => controlModal(true)} />
                        <label className="todo-list-column-text">Priority</label>
                    </div>
                    <div className="todo-item-wrapper">
                        {
                            todoList.length > 0 ?
                                todoList.map((task, i) => (
                                    <TodoItem key={i} id={task.id} isCompleted={task.isCompleted} taskName={task.task} priority={task.priority} handleClick={changeTaskStatus} />
                                ))
                                : null
                        }
                    </div>
                </div>
            </div>
            {/* end of todo list */}

            {/* start of add new task modal */}
            <Modal
                isOpen={open}
                onRequestClose={() => setOpen(false)}
                className="task-modal"
                ariaHideApp={false}
            >
                <div className="modal-header">
                    <label>Add New Task</label>
                </div>
                <form onSubmit={handleSubmit(handleAddNewTask)}>
                    <div className="modal-body">
                        <FormControl className='form-control' >
                            <TextField
                                id="outlined-required"
                                name="task"
                                label="task name"
                                placeholder='task name'
                                size="small"
                                {...register('task')}
                                error={errors.task ? true : false}
                            />
                        </FormControl>
                        <FormControl className='form-control' size="small" error={errors.priority ? true : false}>
                            <InputLabel htmlFor="task-priority">priority*</InputLabel>
                            <Select
                                native
                                name="priority"
                                input={<OutlinedInput label="priority" id="task-priority" />}
                                {...register('priority')}
                                error={errors.priority ? true : false}
                            >
                                <option aria-label="None" value="" />
                                <option value="Low">Low</option>
                                <option value="Med">Medium</option>
                                <option value="High">High</option>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="modal-footer">
                        <Button variant="outlined" className='close-btn' onClick={() => setOpen(false)}>Close</Button>
                        <Button type='submit' variant="contained">Add</Button>
                    </div>
                </form>

            </Modal>
            {/* end of add new task modal */}

        </div>

    );
}

export default TodoList;