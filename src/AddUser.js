import React, { useState } from 'react'
import { Button, Modal, Form, FormGroup, Label, Input, Container } from 'reactstrap';

const AddUser = ({ addUser }) => {
    const [modal, setModal] = useState(false)
    const [user, setUser] = useState({ id: '', name: '', email: '' })

    const toggle = () => {
        setModal(!modal);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addUser(user)
        setModal(false);
    }

    return (
        <div>
            <Button color="danger" outline color="primary" onClick={toggle}>Add User</Button>
            
            <Modal isOpen={modal} toggle={toggle}>
                <h2>ADD USER FORM</h2>
                <Container>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="exampleId">Id</Label>
                        <Input type="text" name="id" id="exampleId" onChange={(e) => {
                            setUser({ ...user, id: e.target.value })
                        }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleName">Name</Label>
                        <Input type="text" name="name" id="exampleName" onChange={(e) => {
                            setUser({ ...user, name: e.target.value })
                        }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" onChange={(e) => {
                            setUser({ ...user, email: e.target.value })
                        }} />
                    </FormGroup>
                    <Button outline color="success">Add User</Button>
                </Form>
                </Container>
            </Modal>
        </div>
    )
}

export default AddUser


