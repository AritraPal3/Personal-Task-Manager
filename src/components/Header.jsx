import React from "react";
import { Container } from "react-bootstrap";

export default function Header({show}) {
    return (
        <Container style={{ marginBottom: "10%" }}>
            <div className="d-flex flex-column align-items-center">
                <h1 className="text-center">{show}</h1>
            </div>
        </Container>
    )
}