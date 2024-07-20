import { Container } from 'react-bootstrap'
import Header from './Header';
import Input from './Input';
import TaskManager from './TaskManager';
import { useEffect, useState } from 'react';

export default function Body() {
    let custome_styling = { paddingLeft: "25%", paddingRight: "25%", marginTop: "10%" }

    // if(stored || stored.length) stored=[]
    const [arr, setArr] = useState([]);

    const getData = async () => {
        let stored = await JSON.parse(localStorage.getItem("array"))
        console.log("calling useEffect" +stored)
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
        // let stored = JSON.parse(localStorage.getItem("array"))
        // console.log("calling useEffect" +stored)
        // setArr(Array.isArray(stored) && stored.length > 0 ? stored : [])
        getData() // will be called once since no dependecy
    }, [])

    return (
        <Container style={custome_styling}>
            <Header></Header>
            <Input addItem={handleInputData} itemList={arr}></Input>
            <TaskManager tasks={arr} modifyTasks={handleInputData}></TaskManager>
        </Container>
    )
}