import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = ({ children }) => {
	return (
		<Container className='container'>
			<Row className='justify-content-md-center'>
				<Col xs={12} md={8} lg={6}>
					{children}
				</Col>
			</Row>
		</Container>
	)
}

export default FormContainer
