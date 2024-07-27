import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Spinner from "./Spinner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Input({ error, alert, input_val, setInputVal, addItem, itemList, editStatus, editId, setEditId, setEditStatus }) {

    const navigate = useNavigate();

    let defaultVal = {
        text: "",
        date: `${new Date().toLocaleDateString("sv-SE")}`,
    }

    const [spinnerShow, setSpinner] = useState(false);

    // let index = getIndex();
    // function getData() {
    //     let data = itemList.find(item => item.id == editId)
    //     return data;
    // }

    function getIndex() {
        let index = (item) => item.id == editId
        return itemList.findIndex(index)
    }

    let new_entry = {
        id: "",
        creationDate: "",
        taskName: "",
        taskStatus: "",
        completionDate: ""
    }

    console.log("Rendering Input")

    let input_bar = {
        borderColor: "transparent"
    }

    let gaping = {
        marginLeft: "2%"
    }

    function handleChange(e) {
        console.log(input_val)
        setInputVal(values => ({ ...values, text: e.target.value }))
    }

    function handleDateChange(e) {
        console.log(input_val)
        setInputVal(values => ({ ...values, date: e.target.value }))
    }

    const d = new Date();
    let date = (d.toString()).slice(0, 15);

    function Save() {
        if (editStatus == 0) {
            if (input_val.date && input_val.text && input_val.text.length !== 0) {
                setSpinner(true)
                new_entry.id = uuidv4();
                //set the entry details before pushing
                new_entry.taskName = input_val.text;
                new_entry.deadlineDate = input_val.date;
                new_entry.taskStatus = "To-do"
                //console.log(typeof(date))
                new_entry.creationDate = date;
                new_entry.completionDate = "--";

                //console.log(new_entry)
                itemList.push(new_entry)
                addItem(itemList);

                const headers = { "Content-Type": "application/json", };
                const url = "https://backend-api-for-todolist.onrender.com/todo/save";
                axios.post(url, { id: new_entry.id, taskName: new_entry.taskName, deadlineDate: new_entry.deadlineDate, creationDate: new_entry.creationDate, taskStatus: new_entry.taskStatus, completionDate: new_entry.completionDate }, { headers })
                    .then((res) => {
                        console.log(res.status)
                    })
                    .catch((err) => {
                        console.log(err)
                    })

                //Spinner Animation Trigger
                setTimeout(() => {
                    setSpinner(false)
                    navigate("/")
                    setInputVal(defaultVal)
                    alert("New Task Has Been Added")
                }, 1000)

            }
            else error("Please Provide a valid Input");
        }
        else {
            if (input_val.text && input_val.text.length !== 0) {
                setSpinner(true)
                let editIndex = getIndex()
                itemList[editIndex].taskName = input_val.text
                addItem(itemList);
                const headers = { "Content-Type": "application/json", };
                const url = "https://backend-api-for-todolist.onrender.com/todo/edit";
                axios.post(url, { id: editId, val: input_val.text, date:input_val.date }, { headers })
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((err) => {
                        console.log(err)
                    })

                //Trigger Spinner Animation
                setTimeout(() => {
                    setSpinner(false)
                    navigate("/")
                    setInputVal(defaultVal)
                    alert(`Task has been edited successfully`)
                }, 1500)

                setEditId(-1)
                setEditStatus(0)
            }
            else {
                error();
            }
        }
    }

    function Cancel() {
        setInputVal("");
        setEditId(-1)
        setEditStatus(0)
    }


    return (
        <Form style={{ marginBottom: "10%" }}>
            <Container className="d-flex flex-column ">
                <Form.Group>
                    <Form.Label>Add Task</Form.Label>
                    <Form.Label className="d-none">Edit Task</Form.Label>
                    <div className="form-control " >
                        <Form.Control onChange={handleChange} type="text" style={input_bar} value={input_val.text}></Form.Control>
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Set Task Deadline</Form.Label>

                    <div className="form-control " >
                        <Form.Control onChange={handleDateChange} type="date" style={input_bar} value={input_val.date}></Form.Control>
                    </div>

                </Form.Group>
                <Container className="d-flex flex-row justify-content-center" style={{ marginTop: "2%" }}>
                    <Button className="btn-primary" style={gaping} onClick={Save}>
                        {spinnerShow && <Spinner />}
                        Save
                    </Button>
                    <Link to="/">
                        <Button className="btn-warning" style={gaping}>Back</Button>
                    </Link>
                    <Button className="btn-light d-none" style={gaping} onClick={Cancel}>Cancel</Button>
                </Container>
            </Container>

        </Form>
    )
}


