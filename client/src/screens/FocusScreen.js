import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, ProgressBar, Button } from 'react-bootstrap'
import useSound from 'use-sound'
import NavCard from '../components/NavCard'
import Tracker from '../components/Tracker'
import Controls from '../components/Controls'
import transitionSfx from '../sounds/transition.mp3'
import longBreakAlertSfx from '../sounds/longBreakAlert.mp3'
import axios from 'axios'

const FocusScreen = ({match}) => {
	const pathname = window.location.pathname
	const history = useHistory()
	const [ setting, setSetting ] = useState({})
	const [ focusIntervalTime, setFocusIntervalTime ] = useState(0)
	const [ focusIntervalCompleted, setFocusIntervalCompleted] = useState(0)
	const [focusRoundTracker, setFocusRoundTracker] = useState(0)
	const [ loading, setLoading ] = useState(true)
	const [ pause, setPause ] = useState(true)

	const [playTransition] = useSound(transitionSfx, { volume: 0.25 })
	const [playLongBreakAlert] = useSound(longBreakAlertSfx, { volume: 0.25 })

	//Get data
	useEffect(() => {
		const fetchSetting = async () => {
			const { data } = await axios.get(`/api/settings/${match.params.id}`)
			setSetting(data)
			console.log(data)
		}
		fetchSetting()
	}, [])

	useEffect(
		() => {
			setting && setLoading(false)
			if (!loading && setting.focus) {
				setFocusIntervalTime(setting.focus.intervalTime)
				setFocusIntervalCompleted(setting.focus.completedIntervalCount)
				setFocusRoundTracker(setting.focus.roundTracker)
			}
		},
		[ setting, loading ]
	)
	//Timer 
	useEffect(
		() => {
			let interval = null
			if (!loading && !pause && focusIntervalTime > 0) {
				console.log(`focusIntervalTime: ${focusIntervalTime}, focusRoundTracker: ${focusRoundTracker}, loading: ${loading}, pause: ${pause}`)
				interval = setInterval(() => {
					setFocusIntervalTime((minutes) => minutes - 1)
					console.log(focusIntervalTime)
				}, 1000)
					console.log(focusIntervalTime)
				//60000 is one minute
				//get progress bar animation in here
			} 			return () => {
				clearInterval(interval)
			}
		},
		[ pause ]
	) 
	//Update data on timer completion
	useEffect(() => {
		console.log(focusIntervalTime)
			if (
				!loading &&
				!pause &&
				focusIntervalTime <= 0 &&
				focusRoundTracker < 3
			) {
				//set setting.focus.roundTracker to setting.focus.roundTracker +1
				//set setting.focus.completedIntervalCount to setting.focus.completedIntervalCount +1
				playTransition()
				history.push('/shortbreak')
			} else if (
				!loading &&
				!pause &&
				focusIntervalTime <= 0 &&
				focusRoundTracker === 3
			) {
				//set setting.focus.roundTracker to setting.focus.roundTracker +1
				//set setting.focus.completedIntervalCount to setting.focus.completedIntervalCount +1
				playLongBreakAlert()
				history.push('/longbreak')
			} 
		// return () => {
		// 	cleanup
		// }
	}, [loading, pause, focusIntervalTime, focusRoundTracker])

	return (
		<>
	 	{!loading && (
		<Card className='card card-focus text-white bg-primary m-4'>
			<Card.Header className='text-center card-header p-3'>
				<NavCard />
			</Card.Header>
			<Card.Header className='text-center card-header p-3'>
				<h1 className='timecard-title-focus'>
					<i className='fas fa-brain px-4 icon-focus-brain' />Focus<i className='fas fa-brain px-4 icon-focus-brain' />
				</h1>
			</Card.Header>				
			<Card.Body className='p-4'>
				<h1 className='timer text-center'>{focusIntervalTime}</h1>
				<h2 className='text-center'>minutes</h2>
			</Card.Body>
			<Card.Body className='px-5 py-3 text-center'>
				{!pause ? (		
				<ProgressBar
					className='progress-bar-secondary progress-bar-striped progress-bar-animated '
					role='progressbar'
					aria-valuenow='75'
					aria-valuemin='0'
					aria-valuemax='100'
					style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}
				/> ) : (
				<Card.Body className='p-4'>
				<h1 className='timer-start-text'>Start Timer</h1>
				<Button
				size='large'
				type='button'
				className='btn btn-success mr-3 start-timer'
				onClick={() => setPause(false)}
			>
				<i className='fas fa-play start-timer-icon' />
				</Button>
			</Card.Body>
			)}
			</Card.Body>
			<Tracker />			
			<Controls/>
		</Card>
		)} 
		
		</>
	)
}

export default FocusScreen
