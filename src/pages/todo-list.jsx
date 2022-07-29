import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import TodoItem from '../components/TodoItem/TodoItem';
import ButtonPrimary from '../components/PrimaryButton/PrimaryButton';
import NewTask from '../components/NewTask/NewTask';
import { isLoggedIn } from "../middleware";
import { addTodo, updateTodo, clearMessages } from "../redux/features/todos";
import '../styles/todo-list.scss';

function TodoList() {

    const history = useNavigate();
    const dispatch = useDispatch();

    const todoList = useSelector((state) => state.todo.list);
    const successMessage = useSelector((state) => state.todo.successMessage);

    useEffect(() => {
        // check user loggedin
        if (!isLoggedIn()) {
            history('/');
        }
    }, []);

    const [open, setOpen] = useState(false)

    const controlModal = (status) => {
        dispatch(clearMessages())
        setOpen(status);
    }

    const handleAddNewTask = async (data) => {
        const newTodo = {
            ...data,
            id: todoList.length + 1,
            isCompleted: false
        }
        dispatch(addTodo(newTodo))
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
                                    <TodoItem key={i} id={task.id} isCompleted={task.isCompleted}
                                        taskName={task.task} priority={task.priority}
                                        handleClick={changeTaskStatus} />
                                ))
                                : null
                        }
                    </div>
                </div>
            </div>
            {/* end of todo list */}

            <NewTask open={open} successMessage={successMessage} handleModal={controlModal}
                handleAddNewTask={handleAddNewTask} />
        </div>

    );
}

export default TodoList;