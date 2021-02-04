import React, { useState, useEffect } from 'react'
import { Card, Col } from 'react-bootstrap'

const Tracker = ({ totalCompleted, roundTracker, intervalsGoal }) => {
	// const [ setting, setSetting ] = useState()
	// const [ loading, setLoading ] = useState(true)

	// useEffect(() => {
	// 	setSetting(settings[0])

	// 	// return () => {
	// 	// 	cleanup
	// 	// }
	// }, [])

	// useEffect(() => {
	// 	setting && setLoading(false)
	// })

	return (
		<Card.Body className='p-4 tracking-container'>
			<Col className='rounds-container float-left'>
				<Card.Header className='rounds-header ml-auto mr-auto'>
					<h2 className='text-center'>Rounds</h2>
				</Card.Header>
				<h3 className='rounds-progress text-center'>{roundTracker} </h3>
				<hr />
				<h5 className='denominator-focus text-center'>4</h5>
			</Col>
			<Col className='goal-container float-right'>
				<Card.Header className='goal-header ml-auto mr-auto'>
					<h2 className='text-center'>Goal</h2>
				</Card.Header>
				<h3 className='goal-progress text-center'>{totalCompleted}</h3>
				<hr />
				<h5 className='denominator-focus text-center'>{intervalsGoal}</h5>
			</Col>
		</Card.Body>
	)
}

export default Tracker
