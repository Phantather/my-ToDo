import React, {useEffect, useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap';
import {AiFillTag} from 'react-icons/ai'
import {FiEdit} from 'react-icons/fi'

const MyVerticallyCenteredModal = (props) => {
    const [title, setTitle] = useState('');
    const [description,setDescription] = useState('');
    const {checkTags, setCheckTags, action, setAction, check, setCheck, modalShowObj, tasks, setTasks, setIsTitleChange, isTitleChange,isDescription,setIsDescription} = props; // деструктуризация - для вывода ключей в отдельные переменные
    const [tags, setTags] = useState(['Home', 'Work', 'Personal']);
    const [addTag,setAddTag] = useState('');

    let priority = ['High', 'Medium', "Low", 'None']; // массив из вариантов для приоритета
    const saveChangesHandler = (id) => {  // id - уникальный ключ который я передал из открытого в попап объекта
        setTasks(tasks.map((item) => {
            if (id === item.id) {
                return {...item, tags: checkTags , priority: check, title: title.length ? title : item.title, description: description.length?description:item.description}
            }
            return item
        }));
        props.onHide(); // уже готовая функция из библиотеки - для закрытия попап

    };

    const  createTag = (e) => {
        if (e.key === 'Enter' && addTag.trim().length) {
            if (tags.includes(addTag)) {
                alert('Такой тег уже есть')
            } else {
                setTags([...tags, addTag]);
            }

            e.target.value = '';
            setAddTag('')
        }

    };
    const delTag = (name) => {
      setTags( tags.filter((el) => el !== name))
    };

    const checkTagsHandler = (tag) => {
        if (checkTags.includes(tag)){
            setCheckTags(checkTags.filter((el) => {
                return el !== tag
            }))
        } else {
            setCheckTags([...checkTags, tag])
        }
    };

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Task Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className='popup__title-block'>
                    {isTitleChange
                        ? <input type="text" defaultValue={modalShowObj.title} onChange={(e) => setTitle(e.target.value)} className='popup__title-input'/>
                        : <>
                            <h4 className='popup__title'>{modalShowObj.title}</h4>
                                <span className='popup__title-btn' onClick={() => setIsTitleChange(true)}>
                                 <FiEdit/>
                                </span>
                         </>
                    }

                </div>
                <div className="popup__description-block" >
                    {
                        isDescription? <textarea style={{width:'100%',resize:'none'}} onChange={(e)=>setDescription(e.target.value)} defaultValue={modalShowObj.description}/>
                        : <div style={{display:"flex",flexDirection:'column',justifyContent:'space-between',paddingBottom:'20px'}}>

                                <p>
                                    {modalShowObj.description}
                                </p>
                            <span style={{color:'blue',textDecoration:'underline',cursor:'pointer',alignSelf:'flex-end'}} onClick={()=>setIsDescription(true)}>
                                {
                                    modalShowObj.description.length ? 'Edit ': 'Add '
                                }
                                 description
                            </span>

                        </div>
                    }
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                    <Button style={{width: '40%'}} className={action === 'priority' ? 'active' : ''} variant="outline-primary" onClick={() => setAction('priority')}>!!!! Priority</Button>
                    <Button style={{width: '40%'}}  className={action === 'tags' ? 'active' : ''} variant="outline-primary" onClick={() => setAction('tags')}>
                        <AiFillTag/>
                        Tags</Button>
                </div>
                <div style={{padding: '0 10px'}}>
                    {
                        action === 'priority' ?
                        priority.map((item) => (
                            <Form.Check type='radio' id={`check-api-${item}`}
                                        style={{display: 'flex', alignItems: 'center', columnGap: '10px'}}>
                                <Form.Check.Input style={{borderColor: 'blue'}} checked={item === check}
                                                  onChange={() => setCheck(item)} name="priority" type='radio' isValid/>
                                <Form.Check.Label style={{display: 'flex', alignItems: 'center', color: 'blue'}}><span
                                    style={{
                                        color: item === 'High' ? 'red' : item === 'Medium' ? 'yellow' : item === 'Low' ? 'blue' : 'black',
                                        width: '30px', textAlign: 'center', fontSize: '20px', fontWeight: 'Bold'
                                    }}>
                                    {`${item === 'High' || item === 'None' ? '!!!' : item === 'Medium' ? '!!' : '!'}`}
                                </span> {`${item} priority`}</Form.Check.Label>
                            </Form.Check>
                        ))
                        : action === 'tags' ?
                            <>
                                <Form.Control type="text" placeholder="Create Tag" value={addTag} onChange={(e) => setAddTag(e.target.value)} onKeyPress={createTag}/>
                                {tags.map((item) => (
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginTop: '10px'
                                    }}>
                                        <div>
                                            <AiFillTag/>
                                            <span style={{marginLeft: '10px', fontSize: '22px'}}>{item}</span>
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <input checked={checkTags.includes(item)} onChange={() => checkTagsHandler(item)}  type="checkbox" style={{width: '25px', height: '25px'}}/>
                                            <span style={{marginLeft: '10px', cursor: 'pointer'} } onClick={() => delTag(item)}>X</span>
                                        </div>
                                    </div>
                                ))}
                            </>
                        : ''
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={() => props.onHide()}>Close</Button>
                <Button variant="outline-primary" onClick={() => saveChangesHandler(modalShowObj.id)}>Save
                    changes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MyVerticallyCenteredModal