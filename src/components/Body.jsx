import { Container } from 'react-bootstrap'
import Header from './Header';
import Input from './Input';
import Edit from './Edit';
import TaskManager from './TaskManager';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

export default function Body() {
    let custome_styling = { paddingLeft: "15%", paddingRight: "15%", marginTop: "8%", paddingBottom: "5%" }

    // if(stored || stored.length) stored=[]
    const [arr, setArr] = useState([]);
    const [isEdit, setEdit] = useState(0);
    const [editId, setEditId] = useState(-1);
    const [input_val, setVal] = useState("");

    // const taskStatus=["To-do","In-Progress", "Completed"] // for input bar

    const getData = async () => {
        let stored = await JSON.parse(localStorage.getItem("array"))
        console.log("calling useEffect" + stored)
        setArr(Array.isArray(stored) && stored.length > 0 ? stored : [])
    }

    function handleInputData(data) {
        //by creating a shallow copy React re-renders the component even if the data was same as previous
        const val = [...data] //👌👌👌👌 enables re-rendering
        setArr(val)
        localStorage.setItem("array", JSON.stringify(data))
        // console.log(data)
    }

    //for useEffect alaways stringify the array in the depenedecy array to prevent infinite re-rendering 🔥🔥🔥🔥🔥
    useEffect(() => {
        getData() // will be called once since no dependecy
    }, [])

    return (
        <Container style={custome_styling}>
            <Routes>
                <Route path="/" element={<><Header show="TASK MANAGER" /> <TaskManager tasks={arr} modifyTasks={handleInputData} setEditStatus={setEdit} setEditId={setEditId} setInputBar={setVal} /></>}/>
                <Route path="/modify" element={<><Header show="ADD NEW TASK"/><Input input_val={input_val} setInputVal={setVal} addItem={handleInputData} itemList={arr} editStatus={isEdit} setEditId={setEditId} editId={editId} setEditStatus={setEdit}/></>}/>
                <Route path="/modify/:id" element={<><Header show="EDIT TASK"/><Input input_val={input_val} setInputVal={setVal} addItem={handleInputData} itemList={arr} editStatus={isEdit} setEditId={setEditId} editId={editId} setEditStatus={setEdit}/></>}/>
                <Route path="/edit/:id" element={<><Header show="EDIT TASK"/><Edit input_val={input_val} setInputVal={setVal} addItem={handleInputData} itemList={arr} editStatus={isEdit} setEditId={setEditId} editId={editId} setEditStatus={setEdit}/></>}/>
            </Routes>
        </Container>
    )
}