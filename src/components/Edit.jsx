import React from "react";
import { useParams } from "react-router-dom";
import { Form, Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Edit({ itemList }) {
    const { id } = useParams();
    console.log(itemList[id])
    // let value=itemList[id].taskName;
    const [edit_val, setVal] = useState(itemList[id].taskName);

    // useEffect(() => {
    //     let stored = async()=>{await JSON.parse(localStorage.getItem("array"))
    //     console.log("calling useEffect" + stored)}
    //     stored();
    // }, [id])

    let input_bar = {
        borderColor: "transparent"
    }

    let gaping = {
        marginLeft: "2%"
    }

    // function handleChange(e) {
    //     let value = e.target.value;
    //     setInputVal(value)
    // }

    // function Save() {
    //     if (input_val && input_val.length !== 0) {
    //         itemList[id].taskName = input_val
    //         addItem(itemList);
    //         setInputVal("")
    //         setEditId(-1)
    //         setEditStatus(0)
    //     }
    // }

    return (
        <Form style={{ marginBottom: "10%" }}>
            <Form.Label>Add Task</Form.Label>
            <Form.Label className="d-none">Edit Task</Form.Label>
            <Container className="d-flex flex-row justify-content-around" style={{ padding: "0" }}>
                <div className="form-control " style={{ width: "100%;" }}>
                    <Form.Control type="text" style={input_bar} value={edit_val}></Form.Control>
                </div>
                <Link to="/">
                    <Button className="btn-primary" style={gaping} >Save</Button>
                </Link>
                <Link to="/">
                    <Button className="btn-info" style={gaping}>GO BACK</Button>
                </Link>
                <Button className="btn-light d-none" style={gaping} >Cancel</Button>
            </Container>
        </Form>
    )
}