import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, ListGroup } from 'react-bootstrap'
import useSound from 'use-sound'
import NavCard from '../components/NavCard'
import Controls from '../components/Controls'
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
			// const randomized = exercises
	 		// 					.map((a) => ({sort: Math.random(), value: a}))
			// 					.sort((a, b) => a.sort - b.sort)
			// 					.map((a) => a.value)
			// setRandomizedExercises(randomized)
			// setRandomized(true)
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
//need to use this to update app state setting for shortBreak.
//completedExercise if setting.shortBreak.exeriseBreak === true
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

	//Pre redux state and data fetches
	// const [ randomizedExercises, setRandomizedExercises ] = useState()
	// const [ shortBreakInterval, setShortBreakInterval ] = useState()
	// const [ setting, setSetting ] = useState()
	// const [ loading, setLoading ] = useState(true)
	// const [ exerciseBreak, setExerciseBreak ] = useState(true)
	// const [ exerciseIndex, setExerciseIndex ] = useState(0)

	// useEffect(() => {
	// 	if (exercises && !randomizedExercises && loading) {
	// 		let randomized = exercises
	// 							.map((a) => ({sort: Math.random(), value: a}))
	// 							.sort((a, b) => a.sort - b.sort)
	// 							.map((a) => a.value)
	// 		setRandomizedExercises(randomized)
	// 	}
		// return () => {
		// 	cleanup
		// }
	// }, [])

	// useEffect(() => {
	// 	if (!setting && loading) {
	// 	setSetting(settings[0])
	// 	} else if (randomizedExercises && setting && loading) {
	// 		setLoading(false)
	// 	}
	// 	// return () => {
	// 	// 	cleanup
	// 	// }
	// }, [setting, loading])
		
	//Button controls
	const handleLazyBreak = () => {
	// set setting.shortBreak.intervalTime to current value of 
	//component level state: intervalTime
	//update to exercise break false, if necessary
		history.push(`/lazybreak/${setting._id}?timeLeft=${intervalTime}`)
	}
	const handleNextExercise = () => {
		setExerciseIndex(exerciseIndex + 1)
		console.log('next exercise clicked')
	}
	 const resetInterval = () => {
		setPause(true)
		window.location.reload()
	}
	const skipBreak = () => {
		history.push(`/focus/${setting._id}`, {from: 'break'})
	}
	 const quit = () => {
		 console.log('quit')
	 }


	return (
		<>
		{loading || !intervalTime || loadingExercises ? <Loader /> : error ||errorExerciseCtUpdate ? <Message variant='danger'>{error}</Message> : (
		<Card className='card card-shortbreak text-white bg-success m-4'>
			<Card.Header className='text-center card-header p-3'>
				<NavCard id={setting._id} from='shortBreak'/>
			</Card.Header>
			<Card.Header className='text-center card-header p-3'>
				<h1 className='timecard-title'>
					<i className='fas fa-heartbeat px-4 icon-break-heart' />Short
					Break<i className='fas fa-heartbeat px-4 icon-break-heart' />
				</h1>
			</Card.Header>
			<Card.Body className='p-3'>
				<h1 className='timer text-center'>{intervalTime}</h1>
				<h4 className='text-center'>minutes</h4>
			</Card.Body>
			{!exercise ? <Loader /> : errorExercises ? <Message variant='danger'>{errorExercises}</Message> : (
			<Card.Body className='p-3'>
				<Card.Title className='px-3 exercise-name'>
					{exercise.name}
				</Card.Title>
				<ListGroup variant='flush'>
					{(exercise.description).map((exerciseStep) => (
						<ListGroup.Item key={exercise._id}>
							{exerciseStep}
						</ListGroup.Item>
					))}
				</ListGroup>
			</Card.Body>
        	)}

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
					// onClick={() => setExerciseIndex(exerciseIndex + 1)}
				>
					Next Exercise <i className='fas fa-arrow-right' />
				</Button>
			</Card.Body>
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
					onClick={() => setPause(!pause)}
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
				<Button
					type='button'
					className='btn btn-primary mr-3'
					onClick={() => skipBreak()}
				>
					<i className='fas fa-forward' />
				</Button>
				<Button type='button' className='btn btn-danger'>
					<i className='fas fa-power-off' onClick={() => quit()} />
				</Button>
			</Card.Footer>
		</Card>
		)}
		</>
	)
}

export default ShortBreakScreen
