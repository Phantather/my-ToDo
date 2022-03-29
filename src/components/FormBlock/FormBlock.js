import React, {useContext, useState} from 'react';
import {InputGroup, FormControl, Button} from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import {CustomContext} from "../Context/Context";

const FormBlock = ({weekDay}) => {

    const {tasks, setTasks} = useContext(CustomContext);

    const [title, setTitle] = useState('');

    const toDate = (date) => {
        return new Intl.DateTimeFormat('en-En', {
            day:'2-digit',
            month:'short',
        }).format(new Date(date))
    };


    const addTask2 = (e) => {
        if (e.key === 'Enter' && title.trim().length) {
            setTasks([...tasks, {
                id: uuidv4(),
                title : title,
                date: toDate(new Date()),
                weekday: weekDay,
                priority: 'None',
                success: false,
                pending: true ,
                tags: [],
                description: ''
            }]);
            setTitle('')
        }
    };

    const addTask = () => {

        if (title.trim().length){
            setTasks([...tasks, {
                id: uuidv4(),
                title : title,
                date: toDate(new Date()),
                weekday: weekDay,
                priority: 'None',
                success: false,
                pending: true ,
                tags: [],
                description: ''
            }]);
            setTitle('')
        }

    };

    return (
        <>
            <InputGroup className="mb-3">
                <FormControl
                    onKeyPress={addTask2}
                    value={title}
                    placeholder="Enter new Todo"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={() => addTask()}>
                    Button
                </Button>
            </InputGroup>
         </>
    );
};

export default FormBlock;