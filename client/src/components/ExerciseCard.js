import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, ListGroup } from 'react-bootstrap'
import { listExercises } from '../actions/exerciseActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ExerciseCard = ({ nextExercise }) => {
	const randomIndex = Math.floor(Math.random() * 52)
	const dispatch = useDispatch()

	//Redux dispatch and state access
	const exerciseList = useSelector((state) => state.exerciseList)
	const { loading, error, exercises } = exerciseList

	//component level state
	const [ exerciseIndex, setExerciseIndex ] = useState(randomIndex)
    const [ exercise, setExercise ] = useState({})
    const [exercisesExist, setExercisesExist] = useState(false)

	//Redux get exercise list
	useEffect(
		() => {
			dispatch(listExercises())
		},
		[ dispatch ]
	)

	//use application state to set component state
	useEffect(
		() => {
			if (exercises) {
				const randomExercise = exercises[exerciseIndex]
				setExercise(randomExercise)
			}
		},
		[ exercises, exerciseIndex ]
	)

	return (
        <>
        {!exercisesExist ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
		<Card.Body className='p-3'>
			<Card.Title className='px-3 exercise-name'>
				{exercise.name}
			</Card.Title>
			<ListGroup variant='flush'>
				{exercise.description.map((exerciseStep) => (
					<ListGroup.Item key={exercise._id}>
						{exerciseStep}
					</ListGroup.Item>
				))}
			</ListGroup>
		</Card.Body>
        )}
        </>
	)
}

export default ExerciseCard
