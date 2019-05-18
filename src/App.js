import React, { useState, useEffect } from 'react';
import User from './User'
import AddUser from './AddUser'
import axios from 'axios';
import { Container, Modal, ModalHeader, ModalBody, Input, Label, Form, FormGroup, Button } from 'reactstrap';

const App = () => {
  const [user, setUser] = useState([])
  const [editUser, setEditUser] = useState({ id: '', name: '', email: '' })
  const [editModal, setEditModal] = useState(false)
  const url = `http://localhost:3000/user`

  const refreshUser = () => {
    axios.get(url).then(
      res => setUser(res.data)
    )
  }

  useEffect(() => {
    refreshUser()
  }, [])

  const addUser = (userif) => {
    axios.post(url, userif).then((res) => {
      user.push(res.data)
      setUser(user)
      refreshUser()
    })
  }

  const removeUser = (id) => {
    axios.delete(url+`/${id}`).then((res) => {
      user.splice(res.data.id, 1)
      setEditUser(user)
      refreshUser()
    })
  }

  const editUserIf = (id, name, email) => {
    setEditUser({ id, name, email })
    setEditModal(!editModal)
  }

  const handleEditUser = (e) => {
    e.preventDefault()
    const { name, email } = editUser
    axios.put(url+`/${editUser.id}`, {
      name,
      email
    }).then((res) => {
      refreshUser()
      setEditModal(false)
      setEditUser({ id: '', name: '', email: '' })
    })
  }

  const toggleEditModal = () => {
    setEditModal(!editModal)
  }

  console.log(user)
  return (
    <Container>
      <AddUser addUser={addUser} />
      <User user={user} removeUser={removeUser} editUser={editUserIf} />

      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit User</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleEditUser}>

            <FormGroup>
              <Label for="exampleName">Name</Label>
              <Input type="text" name="name" id="exampleName" value={editUser.name} onChange={(e) => {
                setEditUser({ ...editUser, name: e.target.value })
              }} />
            </FormGroup>

            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" id="exampleEmail" value={editUser.email} onChange={(e) => {
                setEditUser({ ...editUser, email: e.target.value })
              }} />
            </FormGroup>

            <Button outline color="success">Save</Button>
          </Form>
        </ModalBody>
      </Modal>

    </Container>
  );
}

export default App;
