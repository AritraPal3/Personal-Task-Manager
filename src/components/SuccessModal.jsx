import React from "react";
import { Modal, ModalHeader } from "react-bootstrap";

function Success(props) {
    return (
        <Modal size="sm"
            show={modelShow}
            onHide={() => setModelShow(false)}>
            <Modal.Header closeButton />
            <Modal.Title>Success</Modal.Title>
            <Modal.Body>
                <h4>New Task Has Been Saved</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}