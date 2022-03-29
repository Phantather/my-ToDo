import React, {useContext, useState} from 'react';
import {AiFillTag} from "react-icons/ai";
import {MdDelete} from "react-icons/md";
import {CustomContext} from "../Context/Context";

const ListItem = ({actionDelete, action, task, item, itemLeft,itemRight,priority,priorityCircle,date,dateIcon}) => {

    const {delTask, successHandler, setModalShowObj,setCheck,setCheckTags,setModalShow } = useContext(CustomContext);

    const [isTagOpen, setIsTagOpen] = useState(false);

    return (
        <li key={task.id} style={{position:'relative', opacity: task.success ? '50%' : '100%', cursor:'pointer'}} className={`${item} todo__item`} key={task.id} onClick={() => {
            setModalShowObj(task);
            setCheck(task.priority);
            setCheckTags(task.tags);
            setModalShow(true)
        }}>
            <div className={itemLeft}>
                <p style={{textDecoration: task.success ? 'red line-through' : 'none'}}>{task.title}</p>
            </div>
            <div className={itemRight}>
                <div className={priority}>
                    <div className={priorityCircle} style={{background: task.priority === 'High'? 'red' : task.priority === 'Medium' ? 'yellow' : task.priority === 'Low' ? 'blue' : 'black'}}/>
                    <span>{task.priority} priority</span>
                </div>
                <div className={date}>
                    <div className={dateIcon} onClick={(e) => {
                        e.stopPropagation();
                        setIsTagOpen(!isTagOpen)
                    } }>
                        <AiFillTag/>
                    </div>
                    <span>{task.date}</span>
                </div>
                <div className={action} onClick={(e) => e.stopPropagation() }>
                    <input type="checkbox" checked={task.success} onChange={(e) => successHandler(task.id)} />
                    <span onClick={ (e)=> delTask(task.id)} className={actionDelete}>
                               <MdDelete/>
                           </span>
                </div>
            </div>

            <div className='tags__popup' onClick={(e) => {
                e.stopPropagation();
                setIsTagOpen(false)
            }} style={{display: isTagOpen ? 'block' : 'none'}}>
                <div className='tags__popup-top'>
                    <AiFillTag/>
                    <h4>Tags</h4>
                </div>


                {
                    task.tags.length ? <ul>
                        {task.tags.map((item)=> (
                            <li>{item}</li>
                        ))}
                    </ul>
                        : <p style={{marginTop: '12px'}}>No tags attached</p>
                }
            </div>
        </li>
    );
};

export default ListItem;