import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenAlt,faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function Item({id,taskName,modifyArray,taskList}) {

    function handleDeleteBtn() {
        const updatedTaskList = taskList.filter((_, index) => index !== id);
        modifyArray(updatedTaskList);
    }
    function handleEditBtn()
    {

    }

    return (
        <tr id={id} >
            <td> {taskName}</td>
            <td className="d-flex justify-content-between">
                <button onClick={handleEditBtn}>
                    <FontAwesomeIcon icon={faPenAlt} />
                </button>
                <button className={id} onClick={handleDeleteBtn}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </td>
        </tr>
    )
}