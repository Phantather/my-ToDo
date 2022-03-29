import React, {createContext, useState} from "react";

export const CustomContext = createContext();

export const Context = (props) => {

    const [weekDay, setWeekDay] = useState('Понедельник');
    const [taskVisible, setTaskVisible] = useState(false);
    const [weeks, setWeeks] = useState(
        ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Субота', 'Воскресенье']
    );

    const [modalShow, setModalShow] = useState(false); // Это статус открытия моего попап
    const [check, setCheck] = useState(''); // Приоритет в попап
    const [checkTags, setCheckTags] = useState([]);
    const [isTitleChange, setIsTitleChange] = useState(false);
    const [isDescription,setIsDescription] = useState(false);
    const [action, setAction] = useState('');
    const [modalShowObj, setModalShowObj] = useState({ // объект который я показываю в попап
        success: null,
        pending: null ,
        date: null,
        title: '',
        description : '',
        priority: '',
        tags: [],
        id: null
    });
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title : 'Сходить в кино',
            date: 'jul 19',
            weekday: 'Вторник',
            priority: 'Medium',
            success: false,
            pending: true ,
            tags: ['Home'],
            description: 'sdasdad   '
        }
    ]); // вся наша коллекция
    const [status, setStatus] = useState('Total'); // статус отображения коллекции
    const [title, setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [tags, setTags] = useState(['Home', 'Work', 'Personal']);

    const  delTask = (id) =>{
        setTasks(tasks.filter((elem)=>{
            return id !== elem.id
        }))
    };

    const successHandler = (id) => {
        setTasks(tasks.map(( el ) => {
            if (el.id === id) {
                return {...el, success: !el.success, pending: !el.pending}
            } else {
                return el
            }
        }))
    };





    const value = {

        title, setTitle,

        description,setDescription,

        modalShow, setModalShow,

        check, setCheck,

        checkTags, setCheckTags,

        isTitleChange, setIsTitleChange,

        isDescription, setIsDescription,

        action, setAction,

        modalShowObj, setModalShowObj,

        tasks, setTasks,

        status, setStatus,

        tags, setTags,
        weekDay, setWeekDay,
        taskVisible, setTaskVisible,
        weeks,

        delTask,
        successHandler,

    };

    return <CustomContext.Provider value={value}>
        {props.children}
    </CustomContext.Provider>
};
