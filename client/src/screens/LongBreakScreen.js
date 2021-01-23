import React from 'react'
import { Button, Card, ProgressBar, Row, Col } from 'react-bootstrap'

const LongBreakScreen = () => {
	return (
		<Card className='card card-longbreak border-secondary m-4'>
			<Card.Header className='text-center card-header p-3'>
				<h1>
					<i className='far fa-grin-beam-sweat px-4' />Long Break<i className='far fa-grin-beam-sweat px-4' />
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
			<Card.Body className='p-4'>
				<Row>
					<Col className='rounds-container'>
						<Row>
							<Card.Header
								className='ml-auto mr-auto'
								style={{ width: '175px' }}
							>
								<h3 className='text-center'>Rounds</h3>
							</Card.Header>
						</Row>
						<Row>
							<h2 className='rounds-progress ml-auto mr-auto'>
								3<span className='denominator-long'>/4</span>
							</h2>
						</Row>
					</Col>
					<Col className='goal-container'>
						<Row>
							<Card.Header
								className='ml-auto mr-auto'
								style={{ width: '175px' }}
							>
								<h3 className='text-center'>Goal</h3>
							</Card.Header>
						</Row>
						<Row>
							<h2 className='goal-progress ml-auto mr-auto'>
								3<span className='denominator-long'>/12</span>
							</h2>
						</Row>
					</Col>
				</Row>
			</Card.Body>
			<Card.Footer className='p-3 text-center'>
				<Button type='button' className='btn btn-success mr-2'>
					Start
				</Button>
				<Button type='button' className='btn btn-secondary mr-2'>
					Pause
				</Button>
				<Button type='button' className='btn btn-primary mr-2'>
					Skip
				</Button>
				<Button type='button' className='btn btn-light mr-2'>
					Reset
				</Button>
				<Button type='button' className='btn btn-danger'>
					Quit
				</Button>
			</Card.Footer>
		</Card>
	)
}

export default LongBreakScreen
