import React from 'react';
import { Button, Row, Col } from 'reactstrap';

const User = ({ editUser, removeUser, user }) => {
	const handleEdit = (id, name, email) => {
		editUser(id, name, email)
	}

	const handleDelete = (id) => {
		removeUser(id)
	}

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
							<Button color="success" onClick={() => handleEdit(person.id, person.name, person.email)}>Edit</Button>
							<Button color="danger" onClick={() => handleDelete(person.id)}>X</Button>
						</Col>
					</Row>
				)
			}
			)
			}
		</div>
	)
}

export default User
