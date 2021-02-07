import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card, ProgressBar, Button } from 'react-bootstrap'
import useSound from 'use-sound'
import transitionSfx from '../sounds/transition.mp3'
import NavCard from '../components/NavCard'
import Tracker from '../components/Tracker'
import Footer from '../components/Footer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listSettingDetails } from '../actions/settingActions'

const LazyBreakScreen = ({ location }) => {
	const history = useHistory()
	let progress

	//Sounds
	const [ playTransition ] = useSound(transitionSfx, { volume: 0.25 })

	//Redux dispatch and state access
	const dispatch = useDispatch()
	const settingDetails = useSelector((state) => state.settingDetails)
	const { loading, error, setting } = settingDetails

	//component level state
	const [ intervalTime, setIntervalTime ] = useState()
	const intervalRef = useRef(intervalTime)
	intervalRef.current = intervalTime
	const [ pause, setPause ] = useState(false)
	const [ barLgth, setBarLgth ] = useState(0)

	//Pull time left on break from URL, set it as value for
	//component level intervalTime state and update application
	//level state to reflect exerciseBreak now false
	useEffect(() => {
		const timeLeftInBreak = location.search.split('=')[1] * 1
		setIntervalTime(timeLeftInBreak)
		// 	set setting.shortBreak.exerciseBreak to false
		// at application level
	}, [])

	//use application state to set component state value for prog bar length
	useEffect(
		() => {
			if (setting && intervalRef.current) {
				progress = Math.floor(
					(setting.shortBrkIntvlLgth - intervalRef.current) /
						setting.shortBrkIntvlLgth *
						100
				)
				console.log(intervalRef.current, intervalTime)
				setBarLgth(progress)
			}
		},
		[ intervalRef.current, setting ]
	)

	//Timer
	useEffect(
		() => {
			let interval = null

			if (!loading && !pause && intervalTime > 0) {
				interval = setInterval(() => {
					setIntervalTime((minutes) => minutes - 1)
				}, 1000)
				//60000 is one minute so currently set 1sec: 1min
				//? get progress bar animation in here ?
			}
			return () => {
				clearInterval(interval)
			}
		},
		[ loading, pause, intervalTime ]
	)

	useEffect(
		() => {
			if (!loading && !pause && intervalTime <= 0) {
				playTransition()
				history.push(`/focus/${setting._id}`, { from: 'break' })
			}
		},
		[ loading, pause, intervalTime ]
	)

	//Button controls
	const resetInterval = () => {
		setPause(true)
		window.location.reload()
	}
	const skipBreak = () => {
		history.push(`/focus/${setting._id}`, { from: 'break' })
	}
	const quit = () => {
		history.push(`/reportcard/${setting._id}`)
	}

	return (
		<Card className='card card-lazybreak border-secondary m-4'>
			<Card.Header className='text-center card-header p-3'>
				<NavCard id={setting._id} from='lazyBreak' />
			</Card.Header>
			<Card.Header className='text-center card-header p-3'>
				<h1>
					<i className='fas fa-spa px-4 icon-lazy-plant' />Lazy Break<i className='fas fa-spa px-4 icon-lazy-plant' />
				</h1>
			</Card.Header>
			<Card.Body className='p-4'>
				<h1 className='timer text-center'>{intervalTime}</h1>
				<h2 className='text-center'>minutes</h2>
			</Card.Body>
			<Card.Body className='px-5 py-3 text-center'>
				<div
					className='prog-wrapper'
					style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}
				>
					<ProgressBar
						id='break'
						className='progress-bar-primary progress-bar-striped progress-bar-animated'
						now={barLgth}
						animated
					/>
				</div>
			</Card.Body>
			<Tracker
				totalCompleted={setting.focusIntvlCt}
				roundTracker={setting.focusRoundCt}
				intervalsGoal={setting.focusIntvlGoal}
			/>
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
	)
}

export default LazyBreakScreen
