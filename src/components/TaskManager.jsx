import React from "react";
import { Container, Card, Table } from "react-bootstrap";
import Item from "./Item";

export default function TaskManager({ tasks,modifyTasks }) {
    console.log("Rendering TaskManager")
    return (
        <Card>
            <Container>
                <Table responsive hover id="task-table">
                    <thead>
                        <tr>
                            <th className="col-lg-12 col-md-12 col-sm-10 col-xs-8">Task</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="content">
                        {tasks.map((task,i)=>{
                            return (<Item key={i} id={i} taskName={task} modifyArray={modifyTasks} taskList={tasks} />)
                        })}
                    </tbody>
                </Table>
            </Container>
        </Card>
    )
}