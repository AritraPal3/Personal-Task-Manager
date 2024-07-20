import React from "react";
import { Container } from "react-bootstrap";

export default function Header() {
    return (
        <Container style={{ marginBottom: "10%" }}>
            <div className="d-flex flex-column align-items-center">
                <h1 className="text-center">TASK MANAGER</h1>
            </div>
        </Container>
    )
}