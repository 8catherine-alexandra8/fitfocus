import React, { useEffect, useState, useRef } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card, ProgressBar, Button, Navbar, Container, Nav } from 'react-bootstrap'
import useSound from 'use-sound'
import NavCard from '../components/NavCard'
import Footer from '../components/Footer'
import Tracker from '../components/Tracker'
import transitionSfx from '../sounds/transition.mp3'
import longBreakAlertSfx from '../sounds/longBreakAlert.mp3'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listSettingDetails, updateSettingFocusCt } from '../actions/settingActions'
import { SETTING_UPDATE_FOCUSCT_RESET } from '../constants/settingConstants'

const FocusScreen = ({match}) => {
	const history = useHistory()
	const interval = useRef(null)
	let progress
	//const source = (window.location.pathname).split('/')[1]

	//Sounds
	const [playTransition] = useSound(transitionSfx, { volume: 0.25 })
	const [playLongBreakAlert] = useSound(longBreakAlertSfx, { volume: 0.25 })

	//Redux dispatch and state access
	const dispatch = useDispatch()
	const settingDetails = useSelector((state) => state.settingDetails)
	const { loading, error, success, setting} = settingDetails

	const settingUpdateFocusCt = useSelector((state) => state.settingUpdateFocusCt)
	const { loading: loadingUpdate, error: errorUpdate, success: successUpdate, setting: settingUpdated} = settingUpdateFocusCt

	//component level state
	const [intervalTime, setIntervalTime] = useState()
	const intervalRef = useRef(intervalTime)
	intervalRef.current = intervalTime
	const [pause, setPause] = useState(true)
	// const [percentProgress, setPercentProgress] = useState(0)
	// const progressRef = useRef(percentProgress)
	// progressRef.current = percentProgress
	const [barLgth, setBarLgth] = useState(0)

	//Redux get setting that has _id matching id in url
	useEffect(() => {
		dispatch(listSettingDetails(match.params.id))
	}, [dispatch])

	//use application state to set component state value for interval
	useEffect(() => {
		if (setting || success || successUpdate) {
			setIntervalTime(setting.focusIntvlLgth)
			if(history.location.state && history.location.state.from === 'break') {
				setPause(false)
			}
		}
	}, [success, history, successUpdate])

	//use application state to set component state value for prog bar length
	useEffect(() => {
		if (setting && intervalRef.current) {
			progress = Math.floor(((setting.focusIntvlLgth-intervalRef.current)/setting.focusIntvlLgth) * 100)
			console.log(intervalRef.current, intervalTime)
			setBarLgth(progress)
		}
		
	}, [intervalRef.current, setting])

	//Timer 
	useEffect(
		() => {
			if (!loading && !pause && intervalRef.current > 0) {
				interval.current = setInterval(() => {
					setIntervalTime((minutes) => minutes - 1)
					if (intervalRef.current <= 0) {
						clearInterval(interval.current)
					}
				}, 1000) 
				//60000 is one minute so currently set 1sec: 1min
			}else if (pause && intervalRef.current !== 0) {
				clearInterval(interval.current)
			}
			 
			return () => {
				clearInterval(interval.current)
			}
		},
		[ loading, pause ]
	) 

	//Update focusRoundCt and focusIntvlCt and direct user to 
	//shortBreak or longBreak depending on RoundCt
	useEffect(() => {
		if (!loading && !pause && !successUpdate && !loadingUpdate && intervalTime === 0) {
			dispatch(updateSettingFocusCt({
				_id: setting._id,
				focusRoundCt: setting.focusRoundCt + 1,
				focusIntvlCt: setting.focusIntvlCt + 1
			}))
		}
		if (successUpdate && settingUpdated.focusRoundCt <=3) {
			dispatch({ type: SETTING_UPDATE_FOCUSCT_RESET })
			playTransition()
			history.push(`/shortbreak/${setting._id}`)
		}
		if (successUpdate && settingUpdated.focusRoundCt === 4) {
			dispatch({ type: SETTING_UPDATE_FOCUSCT_RESET })
			playLongBreakAlert()
			history.push(`/longbreak/${setting._id}`)
		}
		
	}, [loading, pause, dispatch, successUpdate, intervalTime, settingUpdated, loadingUpdate])

	//Button controls
	 const resetInterval = () => {
		setPause(true)
		window.location.reload()
	}
	 const quit = () => {
		 history.push(`/reportcard/${setting._id}`)
	 }
	return (
		
		<Card className='card card-focus text-white bg-primary m-4'>
			{loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : success && (
				<>
			<Card.Header className='p-3 text-center card-header'>
				<NavCard id={setting._id} from='focus' />
			</Card.Header>
			<Card.Header className='text-center screen-header'>
				<h1 className='screen-title title-focus'>
					<i className='fas fa-brain px-3 icon-focus-brain' />Focus<i className='fas fa-brain px-3 icon-focus-brain' />
				</h1>
			</Card.Header>				
			<Card.Body className='timer-wrapper'>
				<h1 className='timer text-center'>{intervalTime}</h1>
				<h2 className='timer-label text-center'>minutes</h2>
			</Card.Body>
			<Card.Body className='px-5 py-3 text-center'>
				<div className='prog-wrapper' style={{ width : '80%', marginLeft: 'auto', marginRight: 'auto'}}>
				<ProgressBar
					className='progress-bar-secondary progress-bar-striped progress-bar-animated'
					now= {barLgth}
					animated
				/>	
				</div>	
			</Card.Body>
			<Tracker totalCompleted={setting.focusIntvlCt} roundTracker={setting.focusRoundCt} intervalsGoal={setting.focusIntvlGoal}/>	
			<Card.Footer className='p-3 text-center'>
				<Button
					type='button'
					className='controls btn-play'
					onClick={() => setPause(false)}
				>
					<i className='fas fa-play' />
				</Button>
				<Button
					type='button'
					className='controls btn-pause'
					onClick={() => setPause(!pause)}
				>
					<i className='fas fa-pause' />
				</Button>
				<Button
					type='button'
					className='controls btn-reset'
					onClick={() => resetInterval()}
				>
					<i className='fas fa-redo-alt' />
				</Button>
				<Button type='button' className='controls btn-quit'>
					<i className='fas fa-power-off' onClick={() => quit()} />
				</Button>
				<Footer className='below-btns-footer'/>
			</Card.Footer>
			</>
			)} 
		</Card>
	)
}

export default FocusScreen

				{/* <Navbar bg='dark' variant='dark' className='navbar'>
					<Container>
						<Navbar.Brand>FitFocus</Navbar.Brand>
						<Nav className='ml-auto'>
							<Link to={`/settings/${setting._id}/edit`}>
								<i className='fas fa-cog icon-nav' />
							</Link>
						</Nav>
					</Container>
				</Navbar> */}
