import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
	return (
		<footer>
			<Container>
				<Row className='px-3'>
					<Col className='text-center p-3'>
						Copyright &copy; 2021 Fit & Focused
					</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer
