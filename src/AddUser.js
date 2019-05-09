import React, { Component } from 'react'
import { Button, Modal, Form, FormGroup, Label, Input, Container } from 'reactstrap';

export class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            user: {
                id: '',
                name: '',
                email: ''
            }
        };
    }

    toggle = () => {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

    handleSubmit = (e) => {
        e.preventDefault()
        const { user } = this.state
        this.props.addUser(user)
        this.setState({ modal: false})
    }

    render() {
        return (
            <Container>
                    <Button color="danger" onClick={this.toggle}>Add User</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="exampleId">Id</Label>
                                <Input type="text" name="id" id="exampleId" onChange={(e) => {
                                    let { user } = this.state
                                    user.id = e.target.value
                                    this.setState({ user })
                                }}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleName">Name</Label>
                                <Input type="text" name="name" id="exampleName" onChange={(e) => {
                                    let { user } = this.state
                                    user.name = e.target.value
                                    this.setState({ user })
                                }}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" id="exampleEmail"  onChange={(e) => {
                                    let { user } = this.state
                                    user.email = e.target.value
                                    this.setState({ user })
                                }}/>
                            </FormGroup>
                            <Button>Submit</Button>
                        </Form>
                    </Modal>
            </Container>
        )
    }
}

export default AddUser
