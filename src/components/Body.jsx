import { Container } from 'react-bootstrap'
import Header from './Header';
import Input from './Input';
// import Edit from './Edit';
import TaskManager from './TaskManager';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Body() {
    let custome_styling = { paddingLeft: "15%", paddingRight: "15%", marginTop: "8%", paddingBottom: "5%", overflow: "auto" }

    let defaultVal = {
        text: "",
        date: `${new Date().toLocaleDateString("sv-SE")}`,
    }

    let defaultOptions={
        search:"",
        statusFilter:"Filter By",
        sortBy:"Sort By",
    }
    // console.log(defaultVal)
    // if(stored || stored.length) stored=[]
    const [arr, setArr] = useState([]);
    const [isEdit, setEdit] = useState(0);
    const [editId, setEditId] = useState(-1);
    const [input_val, setVal] = useState(defaultVal);

    //search filter sort
    const [options, setOptions] = useState(defaultOptions);

    //pagination factors
    const [currentPage,setCurrentPage]=useState(1);
    const [postPerPage,setPostPerPage]=useState(3);


    const notify = (showString) => toast.success(showString);
    const error = (showString) => toast.error(showString);
    const remove = (showString) => toast.warning(showString)

    // const taskStatus=["To-do","In-Progress", "Completed"] // for input bar

    const getData = async () => {
        // let stored = await JSON.parse(localStorage.getItem("array"))
        //making api call through axios
        const headers = {
            "Content-Type": "application/json",
        };
        console.log(options)
        const url = `https://backend-api-for-todolist.onrender.com/todo/show`;
        let { data } = await axios.get(url,{params:options}, { headers })
        console.log(`API CALLED by ${url}`)

        // let apiCall=await axios.get("http://localhost:8000/todo/show");
        // console.log(data)
        // console.log(stored)
        // console.log("calling useEffect" + stored)
        setArr(data)
    }

    function handleInputData(data) {
        //by creating a shallow copy React re-renders the component even if the data was same as previous
        const val = [...data] //👌👌👌👌 enables re-rendering
        setArr(val)
        localStorage.setItem("array", JSON.stringify(data))
        // console.log(data)
    }

    //for useEffect alaways stringify the array in the depenedecy array to prevent infinite re-rendering ❌ --> not sure
    useEffect(() => {
        getData();// will be called once since no dependecy array    
    }, [JSON.stringify(arr)])

    useEffect(() => {
        getData();
    }, [options])
    
    useEffect(() => {
        getData()
    }, [input_val])

    // set pagination indexes
    let indexOfLastPage=currentPage*postPerPage;
    let indexOfFirstPage=indexOfLastPage-postPerPage;
    let currentPages=arr.slice(indexOfFirstPage,indexOfLastPage) //limited size of array displayed for pagination

    return (
        <Container style={custome_styling}>
            <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} pauseOnHover={true} closeOnClick={true} limit={5} transition={Bounce} />
            <Routes>
                <Route path="/" element={<><Header show="TASK MANAGER" /> <TaskManager setCurrentPage={setCurrentPage} totalPosts={arr.length} postPerPage={postPerPage} options={options} setOptions={setOptions} remove={remove} error={error} alert={notify} tasks={currentPages} modifyTasks={handleInputData} setEditStatus={setEdit} setEditId={setEditId} setInputBar={setVal} /></>} />
                <Route path="/modify" element={<><Header show="ADD NEW TASK" /><Input remove={remove} error={error} alert={notify} input_val={input_val} setInputVal={setVal} addItem={handleInputData} itemList={currentPages} editStatus={isEdit} setEditId={setEditId} editId={editId} setEditStatus={setEdit} /></>} />
                <Route path="/modify/:id" element={<><Header show="EDIT TASK" /><Input remove={remove} error={error} alert={notify} input_val={input_val} setInputVal={setVal} addItem={handleInputData} itemList={currentPages} editStatus={isEdit} setEditId={setEditId} editId={editId} setEditStatus={setEdit} /></>} />
                {/* <Route path="/edit/:id" element={<><Header show="EDIT TASK" /><Edit input_val={input_val} setInputVal={setVal} addItem={handleInputData} itemList={arr} editStatus={isEdit} setEditId={setEditId} editId={editId} setEditStatus={setEdit} /></>} /> */}
            </Routes>
        </Container>
    )
}