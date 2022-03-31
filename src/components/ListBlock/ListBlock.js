import React, {useContext} from 'react';
import styles from './listBlock.module.css'
import {AiFillTag} from 'react-icons/ai'
import {MdDelete} from 'react-icons/md'
import ListItem from "./ListItem";
import {CustomContext} from "../Context/Context";

const ListBlock = (props) => {


    const {setCheckTags, status, tasks, setModalShow, setModalShowObj, setCheck, successHandler, delTask} = useContext(CustomContext);

    const {actionDelete, list, item, itemLeft, itemRight,dateIcon, priority, priorityCircle, action, date } = styles;

    return (
       <ul className={list}>

           {tasks.filter(el => el.weekday === props.weekDay).filter((task) => {
               if (status === 'Pending') {
                   return task.pending
               } else if (status === 'Success') {
                   return task.success
               } else {
                   return task
               }
           }).map((task) => (

               <ListItem key={task.id} priority={priority} task={task} setModalShow={setModalShow} action={action} date={date}
               setCheck={setCheck} setCheckTags={setCheckTags} setModalShowObj={setModalShowObj} dateIcon={dateIcon}
               successHandler={successHandler} actionDelete={actionDelete} item={item} itemRight={itemRight} priorityCircle={priorityCircle}
               delTask={delTask} itemLeft={itemLeft}
               />

           ) )}

       </ul>
    );
};

export default ListBlock;