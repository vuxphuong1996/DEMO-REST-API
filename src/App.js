import React, { Component } from 'react';
import User from './User'
import AddUser from './AddUser'
import axios from 'axios';
import { Container, Modal, ModalHeader, ModalBody, Input, Label, Form, FormGroup, Button } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: [],
      editUser: {
        id: '',
        name: '',
        email: ''
      },
      editModal: false,
    }
  }

  componentDidMount = () => {
    this.refreshUser()
  }

  addUser = (user) => {
    axios.post(`http://localhost:3000/user`, user).then((res) => {
      const { user } = this.state
      user.push(res.data)
      this.setState({ user })
    })
  }

  removeUser = (id) => {
    axios.delete(`http://localhost:3000/user/${id}`).then((res) => {
      const { user } = this.state
      user.splice(res.data.id, 1)
      this.setState({ user })
      this.refreshUser()
    })
  }

  editUser = (id, name, email) => {
    this.setState({
      editUser: {
        id,
        name,
        email
      },
      editModal: !this.state.editModal
    })
  }

  handleEditUser = (e) => {
    e.preventDefault()
    const { name, email } = this.state.editUser
    axios.put(`http://localhost:3000/user/${this.state.editUser.id}`, {
      name,
      email
    }).then((res) => {
      this.refreshUser()
      this.setState({
        editModal: false,
        editUser: {
          id: '',
          name: '',
          email: ''
        }
      })
    })
  }

  toggleEditModal = () => {
    this.setState(prevState => ({
      editModal: !prevState.editModal
    }));
  }
  refreshUser = () => {
    axios.get(`http://localhost:3000/user`).then(
      res => this.setState({ user: res.data })
    )
  }

  render() {
    const { user } = this.state
    const { name, email } = this.state.editUser
    return (
      <Container>
        <AddUser addUser={this.addUser} />
        <User user={user} removeUser={this.removeUser} editUser={this.editUser} />

        <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleEditModal}>Edit User</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleEditUser}>

              <FormGroup>
                <Label for="exampleName">Name</Label>
                <Input type="text" name="name" id="exampleName" value={name} onChange={(e) => {
                  let { editUser } = this.state
                  editUser.name = e.target.value
                  this.setState({ editUser })
                }} />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="exampleEmail" value={email} onChange={(e) => {
                  let { editUser } = this.state
                  editUser.email = e.target.value
                  this.setState({ editUser })
                }} />
              </FormGroup>

              <Button>Submit</Button>
            </Form>
          </ModalBody>
        </Modal>

      </Container>
    );
  }
}

export default App;
