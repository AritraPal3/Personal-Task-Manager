import React from "react";
import { useParams } from "react-router-dom";
import { Form, Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Edit({ itemList,addItem }) {
    const { id } = useParams();

    function getIndex()
    {
        let index = (item)=>item.id==id
        return itemList.findIndex(index)
    }
    function getData()
    {
        let data = itemList.find(item=>item.id==id)
        return  data.taskName;
    }

    let {taskName}={...itemList[getIndex()]}
    console.log(taskName)
    // let value=itemList[id].taskName;
    const [edit_val, setInputVal] = useState(getData());
    console.log(edit_val)


    useEffect(() => {
        if(id>=itemList.length)
        {
            console.log("OUT OF BOUNDS")
        }
        setInputVal(taskName)
    }, [])

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

    function Save() {
        if (edit_val && edit_val.length !== 0) {
            itemList[getIndex()].taskName = edit_val
            addItem(itemList);
            setInputVal("")
        }
    }

    return (
        <Form style={{ marginBottom: "10%" }}>
            <Form.Label>Edit Task</Form.Label>
            <Form.Label className="d-none">Edit Task</Form.Label>
            <Container className="d-flex flex-row justify-content-around" style={{ padding: "0" }}>
                <div className="form-control " style={{ width: "100%;" }}>
                    <Form.Control type="text" style={input_bar} value={edit_val} onChange={handleChange}></Form.Control>
                </div>
                <Link to="/">
                    <Button className="btn-primary" style={gaping} onClick={Save}>Save</Button>
                </Link>
                <Link to="/">
                    <Button className="btn-info" style={gaping}>GO BACK</Button>
                </Link>
                <Button className="btn-light d-none" style={gaping} >Cancel</Button>
            </Container>
        </Form>
    )
}