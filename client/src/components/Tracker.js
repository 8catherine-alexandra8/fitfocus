import React from 'react'
import { Card, Col } from 'react-bootstrap'

const Tracker = () => {
	return (
		<Card.Body className='p-4 tracking-container'>
			<Col className='rounds-container float-left'>
				<Card.Header className='rounds-header ml-auto mr-auto'>
					<h2 className='text-center'>Rounds</h2>
				</Card.Header>
				<h3 className='rounds-progress text-center'>3 </h3>
				<hr />
				<h5 className='denominator-focus text-center'>4</h5>
			</Col>
			<Col className='goal-container float-right'>
				<Card.Header className='goal-header ml-auto mr-auto'>
					<h2 className='text-center'>Goal</h2>
				</Card.Header>
				<h3 className='goal-progress text-center'>3</h3>
				<hr />
				<h5 className='denominator-focus text-center'>12</h5>
			</Col>
		</Card.Body>
	)
}

export default Tracker
