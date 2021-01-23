import React from 'react'
import { Button, Card, ProgressBar, Row, Col } from 'react-bootstrap'

const ReportCardScreen = () => {
	return (
		<Card className='card card-reportcard border-secondary m-4'>
			<Card.Header className='text-center card-header p-3'>
				<h1>
					<i
						className='fas fa-hand-sparkles px-4'
						style={{ transform: 'scaleX(-1)' }}
					/>Nice Work!<i className='fas fa-hand-sparkles px-4' />
				</h1>
			</Card.Header>
			<Card.Body className='p-4 card-report-top'>
				<i className='fas fa-brain icon-report icon-report-brain' />
				<h1
					className='text-center'
					style={{ fontWeight: 'bold', fontSize: '2rem' }}
				>
					Focus
				</h1>
				<h2 className='report-time text-center'>120 minutes</h2>
			</Card.Body>
			<Card.Body className='p-4 card-report-top'>
				<i className='fas fa-heartbeat icon-report icon-report-heart' />
				<h1
					className='text-center'
					style={{ fontWeight: 'bold', fontSize: '2rem' }}
				>
					Exercise
				</h1>
				<h2 className='report-time text-center'>120 minutes</h2>
			</Card.Body>
			<Card.Body className='p-4 card-report-top'>
				<i className='fas fa-child icon-report icon-report-goal' />
				<h1
					className='text-center'
					style={{ fontWeight: 'bold', fontSize: '2rem' }}
				>
					Goal
				</h1>
				<h2 className='report-time text-center'>
					3<span className='denominator-focus'>/12</span> focus sessions
					completed
				</h2>
			</Card.Body>
			<Card.Body className='px-5 py-2 text-center card-progress-report'>
				<ProgressBar
					className='progress-bar progress-bar-striped progress-bar-animated report-progress-bar'
					role='progressbar'
					aria-valuenow='75'
					aria-valuemin='0'
					aria-valuemax='100'
					style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}
				/>
			</Card.Body>
		</Card>
	)
}

export default ReportCardScreen
