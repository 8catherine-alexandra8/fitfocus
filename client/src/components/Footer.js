import React from 'react'
import { Card } from 'react-bootstrap'

const Footer = () => {
	return (
		<Card.Footer className='copyright-footer'>
			<p className='text-center footer-text dark light'>
				Copyright &copy; 2021 Fit & Focused
			</p>
		</Card.Footer>
	)
}

export default Footer
// <footer>
// 	<Container>
// 		<Row className='px-3'>
// 			<Col className='text-center p-3'>
// 				Copyright &copy; 2021 Fit & Focused
// 			</Col>
// 		</Row>
// 	</Container>
// </footer>
