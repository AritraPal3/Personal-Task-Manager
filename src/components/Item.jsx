import React from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import axios from 'axios'

export default function Item({ remove, id, status, name, dlDate, cpDate, ctDate, modifyArray, taskList, setEditStatus, setEditId, setInputBar }) {

    //testing row colouring based on deadline date
    let deadline=""
    if(dlDate <=`${new Date().toLocaleDateString("sv-SE")}` && (cpDate === "--")) 
    {
        deadline="table-danger";
    }

    let index = getIndex();

    function getData() {
        let data = taskList.find(item => item.id == id)
        return data;
    }

    function getIndex() {
        let index = (item) => item.id == id
        return taskList.findIndex(index)
    }

    function handleDeleteBtn() {
        if (window.confirm("Do You Really Want to Delete this Task")) {
            const updatedTaskList = taskList.filter((index) => index.id !== id);
            modifyArray(updatedTaskList);

            const headers = { "Content-Type": "application/json", };
            const url = "https://backend-api-for-todolist.onrender.com/todo/delete"
            axios.post(url, { id: id }, { headers })
            remove("Task Has Been deleted successfully");
            setInputBar("")
        }
    }

    function handleEditBtn() {
        setEditStatus(1)
        const editId = id;
        setEditId(editId)
        setInputBar({text:taskList[index].taskName,date:`${new Date(`${taskList[index].deadlineDate}`).toLocaleDateString("sv-SE")}`})
        // setInputBar(taskList[index].taskName)
    }
    // console.log(taskList)

    function onClick(e) {

        const headers = { "Content-Type": "application/json" };
        const url = "https://backend-api-for-todolist.onrender.com/todo/editStatus"

        let st = e.target.innerHTML
        // let obj = getData();
        taskList[index].taskStatus = st
        if (st == "Completed") {
            const d = new Date();
            let date = (d.toString()).slice(0, 15);
            taskList[index].completionDate = date
        }
        else {
            taskList[index].completionDate = "--"
        }
        let date = taskList[index].completionDate
        //making api call
        axios.post(url, { id: id, taskStatus: st, completionDate: date }, { headers })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })

        // const updatedTaskList = taskList
        modifyArray(taskList)
    }

    const taskId=()=>{
        return (`TASK - #${index}`)
    }

    return (
        <tr id={id} className={`text-center ${deadline}`}>
            <td>{taskId()}</td>
            <td>{ctDate}</td>
            <td> {name}</td>
            <td>{dlDate.slice(0,10)}</td>
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