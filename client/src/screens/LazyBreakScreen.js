import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card, ProgressBar, Button } from 'react-bootstrap'
import useSound from 'use-sound'
import transitionSfx from '../sounds/transition.mp3'
import NavCard from '../components/NavCard'
import Tracker from '../components/Tracker'
import Footer from '../components/Footer'
import { listSettingDetails } from '../actions/settingActions'

const LazyBreakScreen = ({ match, location }) => {
	const history = useHistory()
	const source = history.location.state.from
	const progInterval = useRef(null)
	//passed from shortBreak when user chooses lazybreak and
	//utilized again when user returns to this screen after
	//editing settings mid interval
	const timeLeftInBreak = location.search.split('=')[1] * 1

	//Sounds
	const [ playTransition ] = useSound(transitionSfx, { volume: 0.25 })

	//Redux dispatch and state access
	const dispatch = useDispatch()

	const settingDetails = useSelector((state) => state.settingDetails)
	const { setting } = settingDetails

	//component level state
	const [ intervalTime, setIntervalTime ] = useState()
	const intervalRef = useRef(intervalTime)
	intervalRef.current = intervalTime
	const [ pause, setPause ] = useState(false)
	const [ barLgth, setBarLgth ] = useState(0)
	const [ progTime, setProgTime ] = useState(0)

	//Pull time left on break from URL, set it as value for
	//component level intervalTime state
	useEffect(
		() => {
			setIntervalTime(timeLeftInBreak)
			setProgTime((timeLeftInBreak + 0.4) * 60)
		},
		[ location.search, timeLeftInBreak ]
	)

	//In case user modifies settings during lazyBreak,
	//get most recent settings from app state
	useEffect(
		() => {
			if (source === 'settings') {
				dispatch(listSettingDetails(match.params.id))
			}
		},
		[ dispatch, match.params.id, source ]
	)

	//progress bar interval
	useEffect(
		() => {
			if (!pause && progTime > 0) {
				let increment = 100 / progTime
				progInterval.current = setInterval(() => {
					setBarLgth((prevVal) => {
						const newValue = prevVal + increment
						if (newValue === 100) {
							clearInterval(progInterval.current)
						}
						return newValue
					})
				}, 167)
				//Timer set 10sec:1min so progbar set to 167ms:1second				
			} else if (pause) {
				clearInterval(progInterval.current)
				console.log('paused')
			}
			return () => {
				clearInterval(progInterval.current)
			}
		},
		[ pause, progTime ]
	)

	//Timer
	useEffect(
		() => {
			let interval = null

			if (!pause && intervalTime > 0) {
				interval = setInterval(() => {
					setIntervalTime((minutes) => minutes - 1)
				}, 10000)
				//60000 is one minute so currently set 10sec: 1min
			}
			return () => {
				clearInterval(interval)
			}
		},
		[ pause, intervalTime ]
	)

	//Send user back to focus screen when timer complete
	useEffect(
		() => {
			if (!pause && intervalTime <= 0) {
				playTransition()
				history.push(`/focus/${setting._id}`, { from: 'break' })
			}
		},
		[ pause, intervalTime, playTransition, history, setting._id ]
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
				<NavCard
					id={setting._id}
					from='lazybreak'
					intvlLgth={setting.shortBrkIntvlLgth}
					timeUsed={setting.shortBrkIntvlLgth - intervalTime}
				/>
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
