import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Controls = () => {
	const pathname = window.location.pathname
	const history = useHistory()
	const [ pause, setPause ] = useState(false)

	const skipBreak = () => {
		history.push('/focus')
	}
	const resetInterval = () => {
		console.log('reset Interval')
		// pathname === '/focus' && setFocusInterval(setting.focus.intervalTime)
		// pathname === '/shortbreak' || '/lazybreak' && setFocusInterval(setting.shortBreak.intervalTime)
		// pathname === '/longBreak' && setFocusInterval(setting.longBreak.intervalTime)
	}
	const quit = () => {
		history.push('/reportcard')
	}
	return (
		<Card.Footer className='p-3 text-center'>
			<Button
				type='button'
				className='btn btn-success mr-3'
				onClick={() => setPause(false)}
			>
				<i className='fas fa-play' />
			</Button>
			<Button
				type='button'
				className='btn btn-secondary mr-3'
				onClick={() => setPause(true)}
			>
				<i className='fas fa-pause' />
			</Button>
			<Button
				type='button'
				className='btn btn-light mr-3'
				onClick={() => resetInterval()}
			>
				<i className='fas fa-redo-alt' />
			</Button>
			{pathname !== '/focus' && (
				<Button
					type='button'
					className='btn btn-primary mr-3'
					onClick={() => skipBreak()}
				>
					<i className='fas fa-forward' />
				</Button>
			)}
			<Button type='button' className='btn btn-danger'>
				<i className='fas fa-power-off' onClick={() => quit()} />
			</Button>
		</Card.Footer>
	)
}

export default Controls
//