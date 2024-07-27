import React from "react";
import { Pagination } from "react-bootstrap";

export default function Pagenation({ postPerPage, totalPosts,setCurrentPage }) {
    let pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) { pageNumbers.push(i); }
    console.log(pageNumbers, totalPosts, postPerPage)

    function handlePageChange(e)
    {
        let val=e.target.innerHTML
        console.log(e.target.value)
        setCurrentPage(val)
    }
    return (
        <Pagination className="d-flex justify-content-start">
            {pageNumbers.map((num)=>{
                return (<Pagination.Item onClick={handlePageChange}>{num}</Pagination.Item>)
            })}
        </Pagination>
    )
}