import React, { useEffect } from 'react';
import { FormControl, TextField, Button, InputLabel, Select, OutlinedInput, Alert } from '@mui/material';
import ButtonPrimary from '../PrimaryButton/PrimaryButton';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import './NewTask.scss';

let validationSchema = yup.object().shape({
    task: yup.string().required("Task name is required."),
    priority: yup.string().required("Task priority is required.")
});

function NewTask({ open, successMessage, handleModal, handleAddNewTask }) {

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

    useEffect(() => {
        reset({});
    }, [open]);

    const onHandleSubmit = (data) => {
        handleAddNewTask(data)
    }

    if (successMessage != "") setTimeout(function () { handleModal(false) }, 1000);

    return (
        <div>
            {/* start of add new task modal */}
            <Modal
                isOpen={open}
                onRequestClose={() => handleModal(false)}
                className="task-modal"
                ariaHideApp={false}
            >
                <div className="modal-header">
                    <label>Add New Task</label>
                </div>
                <form onSubmit={handleSubmit(onHandleSubmit)}>
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
                        <FormControl className='form-control' size="small"
                            error={errors.priority ? true : false}>
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

                        {successMessage &&
                            <FormControl className='form-control'>
                                <Alert severity="success">{successMessage}</Alert>
                            </FormControl>}

                    </div>
                    <div className="modal-footer">
                        <Button variant="outlined" className='close-btn'
                            onClick={() => handleModal(false)}>Close</Button>
                        <Button type='submit' variant="contained">Add</Button>
                    </div>
                </form>

            </Modal>
            {/* end of add new task modal */}
        </div>
    );
}

export default NewTask;