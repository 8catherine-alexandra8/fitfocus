import React from 'react'
import {
	Button,
	Card,
	ProgressBar,
	Row,
	Col,
	ListGroup
} from 'react-bootstrap'
import NavCard from '../components/NavCard'
import Controls from '../components/Controls'

const ShortBreakScreen = () => {
	return (
		<Card className='card card-shortbreak text-white bg-success m-4'>
			<Card.Header className='text-center card-header p-3'>
				<NavCard />
			</Card.Header>
			<Card.Header className='text-center card-header p-3'>
				<h1 className='timecard-title'>
					<i className='fas fa-heartbeat px-4 icon-break-heart' />Short
					Break<i className='fas fa-heartbeat px-4 icon-break-heart' />
				</h1>
			</Card.Header>
			<Card.Body className='p-3'>
				<h1 className='timer text-center'>5</h1>
				<h4 className='text-center'>minutes</h4>
			</Card.Body>

			<Card.Body className='p-3'>
				<Card.Title className='px-3 exercise-name'>
					Rotational Push-Up
				</Card.Title>
				<ListGroup variant='flush'>
					<ListGroup.Item>
						Standard push-ups not cutting it?
					</ListGroup.Item>
					<ListGroup.Item>
						For a variation, after coming back up into a starting push-up
						position, rotate your body to the right and extend your right
						hand overhead, forming a T with your arms and torso.
					</ListGroup.Item>
					<ListGroup.Item>
						Return to the starting position, do a regular push-up, and then
						rotate to the left.
					</ListGroup.Item>
				</ListGroup>
			</Card.Body>
			<Card.Body className='next-exercise-card p-3'>
				<Button className='btn-next-exercise float-left' variant='link'>
					<i
						className='fas fa-arrow-right'
						style={{ transform: 'scaleX(-1)' }}
					/>{' '}
					Lazy Break
				</Button>
				<Button className='btn-next-exercise float-right' variant='link'>
					Next Exercise <i className='fas fa-arrow-right' />
				</Button>
			</Card.Body>
			<Controls />
		</Card>
	)
}

export default ShortBreakScreen
