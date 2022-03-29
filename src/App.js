import React, {useContext, useEffect, useState} from 'react'
import './style.css'
import StatusBlock from "./components/StatusBlock/StatusBlock";
import FormBlock from "./components/FormBlock/FormBlock";
import ListBlock from "./components/ListBlock/ListBlock";
import {MdDelete} from 'react-icons/md';
import MyVerticallyCenteredModal from "./components/Popup/Popup";
import Weeks from "./components/Weeks/Weeks";
import {CustomContext} from "./components/Context/Context";


function App() {

    const {tasks, setTasks, status, modalShow, setModalShow, check,
        setCheck, checkTags, setCheckTags, isTitleChange, setIsTitleChange,
        isDescription, setIsDescription, action, setAction, modalShowObj, weekDay, setWeekDay,taskVisible, setTaskVisible} = useContext(CustomContext);





    useEffect(()=> {
        setTasks(JSON.parse(localStorage.getItem('tasks')))
    },[]);
    useEffect(()=>{
        localStorage.setItem('tasks',JSON.stringify(tasks))
    },[tasks]);


  return (
    <div className="App">
        {!taskVisible
        ? <Weeks/>
        : ''}
        <div className="container">
            {taskVisible
            ? <div className='App__content'>
                    <h1 className='App__title'>TODO-LIST</h1>
                    <StatusBlock/>
                    <button className='back' onClick={()=>setTaskVisible(false)}>Назад</button>
                    <FormBlock weekDay={weekDay}/>
                    {
                         status === 'Total'  ?
                            tasks.filter(el=>el.pending).length === 0 && status === 'Pending'?
                            <p>Список ожидающих задач пуст</p>
                            : tasks.filter(el=>el.success).length === 0 && status === 'Success' ?
                                <p>Список выполненных задач пуст</p>
                                :
                                <>
                                    <ListBlock weekDay={weekDay} setWeekDay={setWeekDay}/>
                                    <p className='App__clear' onClick={() =>  setTasks([])}>
                                        Clear ALL
                                        <MdDelete/>
                                    </p>
                                </> : <div></div>
                    }
                </div>
            : ''}

        </div>

        <MyVerticallyCenteredModal
            tasks={tasks}
            setTasks={setTasks}
            modalShowObj={modalShowObj}
            check={check}
            setCheck={setCheck}
            checkTags={checkTags}
            setCheckTags={setCheckTags}
            show={modalShow}
            isTitleChange={isTitleChange}
            setIsTitleChange={setIsTitleChange}
            isDescription={isDescription}
            setIsDescription={setIsDescription}
            action={action}
            setAction={setAction}
            onHide={() =>{
                setModalShow(false);
                setIsTitleChange(false);
                setIsDescription(false);
                setAction('')
            }}
        />
    </div>
  );
}

export default App;
