import React from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

export default function Item({ id, status, name, cpDate, ctDate, modifyArray, taskList, setEditStatus, setEditId, setInputBar }) {
    
    let index=getIndex();
    function getData()
    {
        let data = taskList.find(item=>item.id==id)
        return  data;
    }
    
    function getIndex()
    {
        let index = (item)=>item.id==id
        return taskList.findIndex(index)
    }

    function handleDeleteBtn() {
        if (window.confirm("Do You Really Want to Delete this Task")) {
            const updatedTaskList = taskList.filter((index) => index.id !== id);
            modifyArray(updatedTaskList);
            setInputBar("")
        }
    }

    function handleEditBtn() {
        setEditStatus(1)
        const editId = id;
        setEditId(editId)
        setInputBar(taskList[index].taskName)
    }
    // console.log(taskList)

    function onClick(e) {
        let st = e.target.innerHTML
        let obj=getData();
        taskList[index].taskStatus = st
        if (st == "Completed") {
            const d = new Date();
            let date = (d.toString()).slice(0, 15);
            taskList[index].completionDate = date
        }
        else {
            taskList[index].completionDate = "--"
        }
        const updatedTaskList = taskList
        modifyArray(taskList)
    }

    return (
        <tr id={id} className="text-center">
            <td>{ctDate}</td>
            <td> {name}</td>
            <td>
                <Dropdown>
                    <Dropdown.Toggle variant="warning" id="dropdown-basic">
                        {status}
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        <Dropdown.Item onClick={onClick}>To-do</Dropdown.Item>
                        <Dropdown.Item onClick={onClick}>In-Progress</Dropdown.Item>
                        <Dropdown.Item onClick={onClick}>Completed</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
            <td> {cpDate}</td>
            <td className="d-flex justify-content-between">
                <button onClick={handleEditBtn}>
                    <Link to={`/modify/${id}`}>
                        <FontAwesomeIcon icon={faPenAlt} />
                    </Link>
                </button>
                <button className={id} onClick={handleDeleteBtn}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </td>
        </tr>
    )
}