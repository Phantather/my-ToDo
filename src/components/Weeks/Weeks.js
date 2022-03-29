import React, {useContext, useState} from 'react';
import { Button } from 'react-bootstrap';
import styles from './Weeks.module.css'
import {CustomContext} from "../Context/Context";

const Weeks = () => {



    const {setWeekDay, setTaskVisible,weeks} = useContext(CustomContext);

    return (

        <div className={styles.weeks}>

            <ul className={styles.list}>
                <h2>
                    ToDo
                </h2>
                    {
                        weeks.map((item, idx) => (
                            <li key={idx}  id={item} onClick={() => {
                                setWeekDay(item);
                                setTaskVisible(true)
                            }}>
                                <Button
                                    style={{width: '100%'}}
                                        variant={item.includes('Субота')
                                        || item.includes('Воскресенье') ? "danger" : "primary"} size="lg"
                                >
                                    {item}
                                </Button>
                            </li>

                        ))
                    }
            </ul>
        </div>

    );
};

export default Weeks;