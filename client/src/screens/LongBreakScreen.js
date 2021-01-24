import React from 'react'
import { Button, Card, ProgressBar, Row, Col } from 'react-bootstrap'
import NavCard from '../components/NavCard'
import Tracker from '../components/Tracker'
import Controls from '../components/Controls'

const LongBreakScreen = () => {
	return (
		<Card className='card card-longbreak border-secondary m-4'>
			<Card.Header className='text-center card-header p-3'>
				<NavCard />
			</Card.Header>
			<Card.Header className='text-center card-header p-3'>
				<h1>
					<i className='far fa-grin-beam-sweat icon-break-smile px-4' />Long
					Break<i className='far fa-grin-beam-sweat icon-break-smile px-4' />
				</h1>
			</Card.Header>
			<Card.Body className='p-4'>
				<h1 className='timer text-center'>25</h1>
				<h2 className='text-center'>minutes</h2>
			</Card.Body>
			<Card.Body className='px-5 py-3 text-center'>
				<ProgressBar
					className='progress-bar progress-bar-striped progress-bar-animated '
					role='progressbar'
					aria-valuenow='75'
					aria-valuemin='0'
					aria-valuemax='100'
					style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}
				/>
			</Card.Body>
			<Tracker />
			<Controls />
		</Card>
	)
}

export default LongBreakScreen
