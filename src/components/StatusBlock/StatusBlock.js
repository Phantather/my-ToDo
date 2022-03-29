import React, {useContext} from 'react';
import {Button} from "react-bootstrap";
import styles from './statusBlock.module.css'
import {CustomContext} from "../Context/Context";

const StatusBlock = () => {

    const {tasks, setStatus} = useContext(CustomContext);

    return (
        <div className={styles.row}>
            <Button variant="primary" onClick={() => setStatus('Total')}>Total : {tasks.length} </Button>
            <Button variant="success" onClick={() => setStatus('Success')}>Success : {tasks.filter((item) => item.success).length} </Button>
            <Button variant="warning" onClick={() => setStatus('Pending')}>Pending : {tasks.filter((item) => item.pending).length} </Button>
        </div>
    );
};

export default StatusBlock;