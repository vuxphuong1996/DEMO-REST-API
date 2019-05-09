import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';

export class User extends Component {
	handleEdit = (id, name, email) => {
		this.props.editUser(id, name, email)
	}

	handleDelete = (id) => {
		this.props.removeUser(id)
	}

	render() {
		const { user } = this.props
		return (
			<div>
				<Row>
					<Col className="text-success">Id</Col>
					<Col className="text-success">Name</Col>
					<Col className="text-success">Email</Col>
					<Col className="text-success">Delete</Col>
				</Row>
				{user.map((person) => {
					return (
						<Row key={person.id}>
							<Col>{person.id}</Col>
							<Col>{person.name}</Col>
							<Col>{person.email}</Col>
							<Col>
							<Button color="success" onClick={() => this.handleEdit(person.id, person.name, person.email)}>Edit</Button>
							<Button color="danger" onClick={() => this.handleDelete(person.id)}>X</Button>
							</Col>
						</Row>
					)
				}
				)
				}
			</div>
		)
	}
}

export default User
