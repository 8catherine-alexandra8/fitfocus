import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, ProgressBar } from 'react-bootstrap'
import useSound from 'use-sound'
import NavCard from '../components/NavCard'
import Tracker from '../components/Tracker'
import Controls from '../components/Controls'
import settings from '../settings'

const FocusScreen = () => {
	const pathname = window.location.pathname
	const history = useHistory()
	const [ focusInterval, setFocusInterval ] = useState()
	const [ setting, setSetting ] = useState()
	const [ loading, setLoading ] = useState(true)
	const [playTransition] = useSound('../sounds/transition.mp3', { volume: 0.25 })
	const [playLongBreakAlert] = useSound('../sounds/longBreakAlert.mp3', { volume: 0.25 })

	useEffect(() => {
		setSetting(settings[0])

		// return () => {
		// 	cleanup
		// }
	}, [])

	useEffect(
		() => {
			setting && setLoading(false)
			if (!loading && setting.focus.intervalTime) {
				setFocusInterval(setting.focus.intervalTime)
			}
			// return () => {
			// 	cleanup
			// }
		},
		[ setting, loading ]
	)

	useEffect(
		() => {
			let interval = null
			if (!loading && !setting.pause && focusInterval > 0) {
				interval = setInterval(() => {
					setFocusInterval((minutes) => minutes - 1)
				}, 3000)
				//60000 is one minute
				//get progress bar animation in here
			} else if (
				!loading &&
				!setting.pause &&
				focusInterval === 0 &&
				setting.focus.roundTracker < 3
			) {
				//set setting.focus.roundTracker to setting.focus.roundTracker +1
				//set setting.focus.completedIntervalCount to setting.focus.completedIntervalCount +1
				playTransition()
				history.push('/shortbreak')
			} else if (
				!loading &&
				!setting.pause &&
				focusInterval === 0 &&
				setting.focus.roundTracker === 3
			) {
				//set setting.focus.roundTracker to setting.focus.roundTracker +1
				//set setting.focus.completedIntervalCount to setting.focus.completedIntervalCount +1
				playLongBreakAlert()
				history.push('/longbreak')
			} else if (!loading && !setting.pause && focusInterval < 0) {
				clearInterval(interval)
			}
			return () => {
				clearInterval(interval)
			}
		},
		[ focusInterval ]
	)

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
				<h1 className='timer text-center'>{focusInterval}</h1>
				<h2 className='text-center'>minutes</h2>
			</Card.Body>
			<Card.Body className='px-5 py-3 text-center'>
				<ProgressBar
					className='progress-bar-secondary progress-bar-striped progress-bar-animated '
					role='progressbar'
					aria-valuenow='75'
					aria-valuemin='0'
					aria-valuemax='100'
					style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}
				/>
			</Card.Body>
			<Tracker />
			<Controls pathname={pathname} focusInterval={focusInterval} />
		</Card>
		)}
		</>
	)
}

export default FocusScreen
