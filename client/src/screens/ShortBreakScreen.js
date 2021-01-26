import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Card, ListGroup } from 'react-bootstrap'
import NavCard from '../components/NavCard'
import Controls from '../components/Controls'
import settings from '../settings'
import exercises from '../exercises'

const ShortBreakScreen = () => {
	const pathname = window.location.pathname
	const history = useHistory()
	const [ randomizedExercises, setRandomizedExercises ] = useState()
	const [ shortBreakInterval, setShortBreakInterval ] = useState()
	const [ setting, setSetting ] = useState()
	const [ loading, setLoading ] = useState(true)
	const [ exerciseBreak, setExerciseBreak ] = useState(true)
	const [ exerciseIndex, setExerciseIndex ] = useState(0)

	useEffect(() => {
		if (exercises && !randomizedExercises && loading) {
			let randomized = exercises
								.map((a) => ({sort: Math.random(), value: a}))
								.sort((a, b) => a.sort - b.sort)
								.map((a) => a.value)
			setRandomizedExercises(randomized)
		}
		// return () => {
		// 	cleanup
		// }
	}, [])

	useEffect(() => {
		if (!setting && loading) {
		setSetting(settings[0])
		} else if (randomizedExercises && setting && loading) {
			setLoading(false)
		}
		// return () => {
		// 	cleanup
		// }
	}, [setting, loading])
	const handleLazyBreak = () => {
		setExerciseBreak(false)
		history.push('/lazybreak')
	}
	return (
		<>
		{!loading && (
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
					{randomizedExercises[exerciseIndex].name}
				</Card.Title>
				<ListGroup variant='flush'>
					{(randomizedExercises[exerciseIndex].description).map((exerciseStep) => (
						<ListGroup.Item key={exerciseStep}>
							{exerciseStep}
						</ListGroup.Item>
					))}
				</ListGroup>
			</Card.Body>
			<Card.Body className='next-exercise-card p-3'>
				<Button
					className='btn-next-exercise float-left'
					variant='link'
					onClick={() => handleLazyBreak()}
				>
					<i
						className='fas fa-arrow-right'
						style={{ transform: 'scaleX(-1)' }}
					/>{' '}
					Lazy Break
				</Button>
				<Button
					className='btn-next-exercise float-right'
					variant='link'
					onClick={() => setExerciseIndex(exerciseIndex + 1)}
				>
					Next Exercise <i className='fas fa-arrow-right' />
				</Button>
			</Card.Body>
			<Controls />
		</Card>
		)}
		</>
	)
}

export default ShortBreakScreen
/* <ListGroup.Item>
						For a variation, after coming back up into a starting push-up
						position, rotate your body to the right and extend your right
						hand overhead, forming a T with your arms and torso.
					</ListGroup.Item>
					<ListGroup.Item>
						Return to the starting position, do a regular push-up, and then
						rotate to the left.
					</ListGroup.Item> */
