import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";


const Modals = ({ open, header, body, footer, size }) => {
    return (
        <Modal isOpen={open} size={size}>
            <ModalHeader>{header}</ModalHeader>
            <ModalBody>{body}</ModalBody>
            <ModalFooter>{footer}</ModalFooter>
        </Modal >
    )
}

export default Modals