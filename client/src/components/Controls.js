import React from 'react'
import { Button, Card } from 'react-bootstrap'

const Controls = () => {
	return (
		<Card.Footer className='p-3 text-center'>
			<Button type='button' className='btn btn-success mr-3'>
				<i className='fas fa-play' />
			</Button>
			<Button type='button' className='btn btn-secondary mr-3'>
				<i className='fas fa-pause' />
			</Button>
			<Button type='button' className='btn btn-light mr-3'>
				<i className='fas fa-redo-alt' />
			</Button>
			<Button type='button' className='btn btn-danger'>
				<i className='fas fa-power-off' />
			</Button>
		</Card.Footer>
	)
}

export default Controls
//
