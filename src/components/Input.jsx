import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";


export default function Input({addItem,itemList}) {

    console.log("Rendering Input")
    // let stored=JSON.parse(localStorage.getItem("array"))
    // if(!stored) stored=[]

    let input_bar = {
        borderColor: "transparent"
    }

    let gaping = {
        marginLeft: "2%"
    }
    let [input_val, setVal] = useState();

    function handleChange(e) {
        let value = e.target.value;
        setVal(value)
    }


    function Save(e) {
        if (input_val && input_val.length !== 0) {
            itemList.push(input_val)
            addItem(itemList);
            // localStorage.setItem("array",JSON.stringify(stored))
            setVal("");
        }
    }

    function Cancel() {
        setVal("");
    }


    return (
        <Form style={{ marginBottom: "10%" }}>
            <Form.Label>Add Task</Form.Label>
            <Form.Label className="d-none">Edit Task</Form.Label>
            <Container className="d-flex flex-row justify-content-around" style={{ padding: "0" }}>
                <div className="form-control " style={{ width: "100%;" }}>
                    <Form.Control onChange={handleChange} type="text" style={input_bar} value={input_val}></Form.Control>
                </div>
                <Button className="btn-primary" style={gaping} onClick={Save}>Save</Button>
                <Button className="btn-light d-none" style={gaping} onClick={Cancel}>Cancel</Button>
            </Container>
        </Form>
    )
}


