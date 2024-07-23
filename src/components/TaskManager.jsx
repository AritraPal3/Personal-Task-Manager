import React from "react";
import { Container, Card, Table, Button } from "react-bootstrap";
import Item from "./Item";
import { Link } from "react-router-dom";

export default function TaskManager({ tasks, modifyTasks, setEditStatus, setEditId, setInputBar }) {
    console.log("Rendering TaskManager")
    return (
        <>
            <Card>
                <Container>
                    <Table responsive hover id="task-table" className="text-center" >
                        <thead>
                            <tr>
                                <th>Creation Date</th>
                                <th>Task</th>
                                <th>Status</th>
                                <th>Completion Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="content">
                            {tasks.map((task, i) => {
                                return (<Item key={i} id={task.id} ctDate={task.creationDate} status={task.taskStatus} cpDate={task.completionDate} name={task.taskName} modifyArray={modifyTasks} taskList={tasks} setEditStatus={setEditStatus} setEditId={setEditId} setInputBar={setInputBar} />)
                            })}
                        </tbody>
                    </Table>
                </Container>
            </Card>
            <div style={{ padding: "2%" }} className="d-flex justify-content-end">
                <Link to="/modify">
                    <Button> ADD NEW TASK</Button>
                </Link>
            </div>
        </>
    )
}