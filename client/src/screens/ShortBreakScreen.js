import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, ListGroup } from 'react-bootstrap'
import useSound from 'use-sound'
import NavCard from '../components/NavCard'
import Footer from '../components/Footer'
import transitionSfx from '../sounds/transition.mp3'
import minuteSfx from '../sounds/minuteAlert.mp3'
//import exercises from '../exercises'
import Message from '../components/Message'
import Loader from '../components/Loader'
import ExerciseCard from '../components/ExerciseCard'
import { listSettingDetails, updateSettingExerciseCt } from '../actions/settingActions'
import { listExercises } from '../actions/exerciseActions'
import { SETTING_UPDATE_EXERCISECT_RESET } from '../constants/settingConstants'

const ShortBreakScreen = ({match}) => {
	const pathname = window.location.pathname
	const history = useHistory()
	const randomIndex = Math.floor(Math.random() * 52)
	
	//Sounds
	const [playTransition] = useSound(transitionSfx, { volume: 0.25 })
	const [playMinuteAlert] = useSound(minuteSfx, { volume: 0.25 })

	//Redux dispatch and state access
	const dispatch = useDispatch()
	const settingDetails = useSelector((state) => state.settingDetails)
	const { loading, error, success, setting} = settingDetails

	const settingUpdateExerciseCt = useSelector((state) => state.settingUpdateExerciseCt)
	const { loading: loadingExerciseCtUpdate, error: errorExerciseCtUpdate, success: successExerciseCtUpdate, setting: settingExerciseCtUpdated} = settingUpdateExerciseCt

	const exerciseList = useSelector((state) => state.exerciseList)
	const { loading: loadingExercises, error: errorExercises, exercises} = exerciseList



	//component level state
	const [intervalTime, setIntervalTime] = useState()
	const [pause, setPause] = useState(false)
	//const [randomizedExercises, setRandomizedExercises] = useState([])
	const [exerciseIndex, setExerciseIndex] = useState(randomIndex)
	const [exercise, setExercise] = useState()
	//const [randomized, setRandomized] = useState(false)

	// //Redux get exercises 1x on initial load only
	// useEffect(() => {
	// }, [dispatch])

	//Redux get setting that has _id matching id in url
	useEffect(() => {
			dispatch(listSettingDetails(match.params.id))
			dispatch(listExercises())
	}, [match, dispatch])

	//use application state to set component state
	useEffect(() => {
		if (setting._id) {
			setIntervalTime(setting.shortBrkIntvlLgth)
		} 
	}, [setting._id])

	useEffect(() => {
		if (exercises){
			console.log('exercises exist so setRandomized should run now')
			const randomExercise = exercises[exerciseIndex]
			setExercise(randomExercise)
		}
	}, [exercises, exerciseIndex])

	//Timer 
	useEffect(
		() => {
			let interval = null
			if (!loading && !pause && intervalTime > 0) {
				playMinuteAlert()
				interval = setInterval(() => {
					setIntervalTime((minutes) => minutes - 1)
				}, 1000)
				//60000 is one minute so currently set 1sec: 1min
			} 			
			return () => {
				clearInterval(interval)
			}
		},
		[ loading, pause, intervalTime]
	) 
//Update app state setting for shortBreak.completedExercise 
	useEffect(() => {
		if (
			!loading &&
			!pause &&
			!successExerciseCtUpdate &&
			!loadingExerciseCtUpdate && 
			intervalTime === 0
		) {
			dispatch(updateSettingExerciseCt({
				_id: setting._id,
				exerciseBrkCt: setting.exerciseBrkCt + 1
			}))
		} 
		}, [loading, pause, intervalTime])

//send user back to focus after exerciseCt updated
	useEffect(() => {
		if (successExerciseCtUpdate) {
			dispatch({ type: SETTING_UPDATE_EXERCISECT_RESET })
			playTransition()
			history.push(`/focus/${setting._id}`, {from: 'break'})
		}		
	}, [successExerciseCtUpdate])

	//Button controls
	const handleLazyBreak = () => {
		history.push(`/lazybreak/${setting._id}?timeLeft=${intervalTime}`)
	}

	 const resetInterval = () => {
		setPause(true)
		window.location.reload()
	}
	const skipBreak = () => {
		history.push(`/focus/${setting._id}`, {from: 'break'})
	}
	 const quit = () => {
		 history.push(`/reportcard/${setting._id}`)
	 }


	return (
		<>
		{loading || !intervalTime || loadingExercises ? <Loader /> : error ||errorExerciseCtUpdate ? <Message variant='danger'>{error}</Message> : (
		<Card className='card card-shortbreak text-white bg-success m-4'>
			<Card.Header className='text-center card-header p-3'>
				<NavCard id={setting._id} from='shortBreak'/>
			</Card.Header>
			<Card.Header className='text-center card-header p-3'>
				<h1 className='screen-title'>
					<i className='fas fa-heartbeat  icon-break-heart' />Short
					Break<i className='fas fa-heartbeat  icon-break-heart' />
				</h1>
			</Card.Header>
			<Card.Body className='exercise-timer-wrapper'>
				<h1 className='timer timer-exercise text-center'>{intervalTime}</h1>
				{/* <h6 className='text-center'>minutes</h6> */}
			</Card.Body>
			{!exercise ? <Loader /> : errorExercises ? <Message variant='danger'>{errorExercises}</Message> : (
			<Card.Body className='exercise-card px-4'>
				<Card.Title className='exercise-name text-center'>
					{exercise.name}
				</Card.Title>
				<ListGroup variant='flush'>
					{(exercise.description).map((exerciseStep) => (
						<ListGroup.Item key={exerciseStep}>
							{exerciseStep}
						</ListGroup.Item>
					))}
				</ListGroup>
			</Card.Body>
        	)}

			<Card.Body className='next-exercise-card'>
				<Button
					className='btn-lazybreak float-left'
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
			<Card.Footer className='p-3 text-center'>
				<Button
					type='button'
					className='btn btn-success'
					onClick={() => setPause(false)}
				>
					<i className='fas fa-play' />
				</Button>
				<Button
					type='button'
					className='btn btn-secondary'
					onClick={() => setPause(!pause)}
				>
					<i className='fas fa-pause' />
				</Button>
				<Button
					type='button'
					className='btn btn-light'
					onClick={() => resetInterval()}
				>
					<i className='fas fa-redo-alt' />
				</Button>
				<Button
					type='button'
					className='btn btn-primary'
					onClick={() => skipBreak()}
				>
					<i className='fas fa-forward' />
				</Button>
				<Button type='button' className='btn btn-danger'>
					<i className='fas fa-power-off' onClick={() => quit()} />
				</Button>
				<Footer />
			</Card.Footer>
		</Card>
		)}
		</>
	)
}

export default ShortBreakScreen
