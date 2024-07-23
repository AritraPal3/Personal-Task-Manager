import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export default function Input({ input_val, setInputVal, addItem, itemList, editStatus, editId, setEditId, setEditStatus }) {

    let index=getIndex();
    function getData()
    {
        let data = itemList.find(item=>item.id==editId)
        return  data;
    }
    
    function getIndex()
    {
        let index = (item)=>item.id==editId
        return itemList.findIndex(index)
    }

    let new_entry = {
        id:"",
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
        let value = e.target.value;
        setInputVal(value)
    }

    const d = new Date();
    let date = (d.toString()).slice(0, 15);

    function Save() {
        if (editStatus == 0) {
            if (input_val && input_val.length !== 0) {

                new_entry.id=uuidv4();
                //set the entry details before pushing
                new_entry.taskName = input_val;
                new_entry.taskStatus = "To-do"
                //console.log(typeof(date))
                new_entry.creationDate = date;
                new_entry.completionDate = "--";

                //console.log(new_entry)
                itemList.push(new_entry)
                addItem(itemList);
                setInputVal("");
            }
        }
        else {
            if (input_val && input_val.length !== 0) {
                let editIndex=getIndex()
                itemList[editIndex].taskName = input_val
                addItem(itemList);
                setInputVal("")
                setEditId(-1)
                setEditStatus(0)
            }
        }
    }

    function Cancel() {
        setInputVal("");
        setEditId(-1)
        setEditStatus(0)
    }

    let toggleVal = ["d-none", ""]
    return (
        <Form style={{ marginBottom: "10%" }}>
            <Form.Label>Add Task</Form.Label>
            <Form.Label className="d-none">Edit Task</Form.Label>
            <Container className="d-flex flex-row justify-content-around" style={{ padding: "0" }}>
                <div className="form-control " style={{ width: "100%;" }}>
                    <Form.Control onChange={handleChange} type="text" style={input_bar} value={input_val}></Form.Control>
                </div>
                <Link to="/">
                    <Button className="btn-primary" style={gaping} onClick={Save}>Save</Button>
                </Link>
                <Link to="/">
                    <Button className="btn-info" style={gaping}>BACK</Button>
                </Link>
                <Button className="btn-light d-none" style={gaping} onClick={Cancel}>Cancel</Button>
            </Container>
        </Form>
    )
}


