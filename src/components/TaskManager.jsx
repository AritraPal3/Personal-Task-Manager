import React from "react";
import { Container, Card, Table, Button, Form, Dropdown,} from "react-bootstrap";
import Item from "./Item";
// import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import Pagenation from "./Pagenation";


export default function TaskManager({setCurrentPage, remove, tasks, modifyTasks, setEditStatus, setEditId, setInputBar,options, setOptions,postPerPage,totalPosts }) {
    console.log("Rendering TaskManager")
    const navigate = useNavigate();
    const [spinnerShow, setSpinner] = useState(false);

    function handleAdd() {
        setSpinner(true)
        setTimeout(() => {
            navigate("/modify")
            setSpinner(false)
        }, 2000)
    }
    

    function handleSearch(e)
    {
        let val=e.target.value
        setOptions(value=>({...value,search:val}));
    }

    function handleFilter(e)
    {
        let filter=e.target.innerHTML;
        if(filter=="None") setOptions(value=>({...value,statusFilter:"Filter By"}));
        else setOptions(value=>({...value,statusFilter:filter}));
    }

    function handleSort(e)
    {
        let sort=e.target.innerHTML;
        if(sort=="None") setOptions(value=>({...value,sortBy:"Sort By"}));
        else setOptions(value=>({...value,sortBy:sort}));
    }

    return (
        <>
            <Card>
                <Container>
                    <Form className="d-flex justify-content-between" style={{paddingTop:"1%", paddingBottom:"1%"}}>
                        <Form.Group className="d-flex">
                            <Form.Control type="text" placeholder="Search" value={options.search} onChange={handleSearch}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Dropdown>
                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                    {options.statusFilter}
                                </Dropdown.Toggle>
                                <Dropdown.Menu >
                                    <Dropdown.Item onClick={handleFilter}>To-do</Dropdown.Item>
                                    <Dropdown.Item onClick={handleFilter}>In-Progress</Dropdown.Item>
                                    <Dropdown.Item onClick={handleFilter}>Completed</Dropdown.Item>
                                    <Dropdown.Item onClick={handleFilter}>None</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>
                        <Form.Group>
                            <Dropdown>
                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                    {options.sortBy}
                                </Dropdown.Toggle>
                                <Dropdown.Menu >
                                    <Dropdown.Item onClick={handleSort}>Task Name</Dropdown.Item>
                                    <Dropdown.Item onClick={handleSort}>Deadline Date</Dropdown.Item>
                                    <Dropdown.Item onClick={handleSort}>None</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>
                    </Form>
                </Container>
                <Container>
                    <Table responsive hover id="task-table" className="text-center" >
                        <thead>
                            <tr>
                                <th>Task ID</th>
                                <th>Creation Date</th>
                                <th>Task Name</th>
                                <th>Task Deadline</th>
                                <th>Status</th>
                                <th>Completed On</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="content">
                            {tasks.map((task, i) => {
                                return (<Item remove={remove} key={i} id={task.id} dlDate={task.deadlineDate} ctDate={task.creationDate} status={task.taskStatus} cpDate={task.completionDate} name={task.taskName} modifyArray={modifyTasks} taskList={tasks} setEditStatus={setEditStatus} setEditId={setEditId} setInputBar={setInputBar} />)
                            })}
                        </tbody>
                    </Table>
                    <Pagenation setCurrentPage={setCurrentPage} postPerPage={postPerPage} totalPosts={totalPosts}></Pagenation>
                </Container>
            </Card>
            <div style={{ padding: "2%" }} className="d-flex justify-content-end">
                <Button onClick={handleAdd}>
                    {spinnerShow && <Spinner />}
                    ADD NEW TASK</Button>
            </div>
        </>
    )
}