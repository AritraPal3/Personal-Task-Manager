import { Container } from 'react-bootstrap'
import Header from './Header';
import Input from './Input';
import TaskManager from './TaskManager';
import { useEffect, useState } from 'react';

export default function Body() {
    let custome_styling = { paddingLeft: "25%", paddingRight: "25%", marginTop: "10%" }
    
    // if(stored || stored.length) stored=[]
    const [arr, setArr] = useState([]);

    function handleInputData(data) {
        setArr(data)
        localStorage.setItem("array", JSON.stringify(data))
        // console.log(data)
    }

    useEffect(()=>{
        let stored = JSON.parse(localStorage.getItem("array"))
        console.log("calling useEffect")
        setArr(Array.isArray(stored) && stored.length > 0 ? stored : [])
    },[arr])

    return (
        <Container style={custome_styling}>
            <Header></Header>
            <Input addItem={handleInputData} itemList={arr}></Input>
            <TaskManager tasks={arr} modifyTasks={handleInputData}></TaskManager>
        </Container>
    )
}