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
import { listSettingDetails, updateSettingRoundCt  } from '../actions/settingActions'
import { SETTING_UPDATE_ROUNDCT_RESET } from '../constants/settingConstants'


const LongBreakScreen = ({match, location}) => {
	const history = useHistory()
	const progInterval = useRef(null)
	//passed from SettingsEdit if/when user is redirected
	//to this screen after editing settings 
	//mid-interval
	const timeLeft= location.search.split('=')[1] * 1

	//Sounds
	const [playTransition] = useSound(transitionSfx, { volume: 0.25 })

	//Redux dispatch and state access
	const dispatch = useDispatch()
	
	const settingDetails = useSelector((state) => state.settingDetails)
	const { loading, error, setting} = settingDetails

	const settingUpdateRoundCt = useSelector((state) => state.settingUpdateRoundCt)
	const { loading: loadingRoundCtUpdate, success: successRoundCtUpdate } = settingUpdateRoundCt

	//component level state
	const [intervalTime, setIntervalTime] = useState()
	const intervalRef = useRef(intervalTime)
	intervalRef.current = intervalTime
	const [pause, setPause] = useState(false)
	const [barLgth, setBarLgth] = useState(0)
	const [progTime, setProgTime] = useState(0)
	const [skip, setSkip] = useState(false)
	const [timeLeftPostSettingsEdit] = useState(timeLeft)

	//Redux get setting that has _id matching id in url
	useEffect(() => {
		dispatch(listSettingDetails(match.params.id))
	}, [match, dispatch])

	//use application state to set component state
	useEffect(() => {
		if (timeLeftPostSettingsEdit) {
			setIntervalTime(timeLeftPostSettingsEdit)
			setProgTime((timeLeftPostSettingsEdit + .4) * 60 )
		}
		else if (setting._id) {
			setIntervalTime(setting.longBrkIntvlLgth)
			setProgTime(setting.longBrkIntvlLgth * 60)
		}
	}, [setting._id, setting.longBrkIntvlLgth, timeLeftPostSettingsEdit ])

	//progress bar interval
	useEffect(() => {
			if (!loading && !pause && progTime > 0) {
				let increment = 100 / progTime
				progInterval.current = setInterval(() => {
					setBarLgth((prevVal) => {
						const newValue = prevVal + increment
						if (newValue === 100) {
							clearInterval(progInterval.current)
						} 
						return newValue
						})
						}, 16.7)	
			//Timer set 10sec:1min so progbar set to 16.7ms:1second	
			} else if (pause) {
				clearInterval(progInterval.current)
			}
			return () => {
				clearInterval(progInterval.current)
			}							
	}, [loading, pause, progTime])

	//Timer 
	useEffect(
		() => {
			let interval = null
			if (!loading && !loadingRoundCtUpdate && !pause && intervalTime > 0) {
				interval = setInterval(() => {
					setIntervalTime((minutes) => minutes - 1)
				}, 1000)
				//60000ms : 1min, so currently set 1sec : 1min
			} 			
			return () => {
				clearInterval(interval)
			}
		},
		[ pause, loading, intervalTime, loadingRoundCtUpdate ]
	) 

//Update focusRoundCt in app state
	useEffect(() => {
		if (skip) {
			dispatch(updateSettingRoundCt({
			 	_id: setting._id,
				 focusRoundCt: 0,
			}))
		} else if (
			!loading &&
			!pause &&
			!successRoundCtUpdate &&
			!loadingRoundCtUpdate &&
			intervalTime <= 0 
		) {
			 dispatch(updateSettingRoundCt({
			 	_id: setting._id,
				 focusRoundCt: 0,
			 }))
			}
	}, [skip, intervalTime, dispatch, loading, loadingRoundCtUpdate, pause, setting._id, successRoundCtUpdate, ])

//send user back to focus after focusRoundCt updated
	useEffect(() => {
		if (successRoundCtUpdate && !loading && !loadingRoundCtUpdate) {
			dispatch({ type: SETTING_UPDATE_ROUNDCT_RESET })
			playTransition()
			history.push(`/focus/${setting._id}`, {from: 'break'})
		}
		 
	}, [successRoundCtUpdate, dispatch, history, loading, loadingRoundCtUpdate, playTransition, setting._id])

	//Button controls
	const resetInterval = () => {
		setPause(true)
		window.location.reload()
	}
	const skipBreak = () => {
		setSkip(true)
		const timer = setTimeout(() => {
		history.push(`/focus/${setting._id}`, {from: 'break'})
			}, 500)
		return () => clearTimeout(timer)
	}
	const quit = () => {
		 history.push(`/reportcard/${setting._id}`)
	}

	return (
				<>
	 	{loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
		<Card className='card card-longbreak border-secondary m-4'>
			<Card.Header className='text-center card-header p-3'>
				<NavCard id={setting._id} from='longbreak' 					intvlLgth={setting.longBrkIntvlLgth}
						timeUsed={setting.longBrkIntvlLgth - intervalTime}
 				/>
			</Card.Header>
			<Card.Header className='text-center card-header p-3'>
				<h1>
					<i className='far fa-grin-beam-sweat icon-break-smile px-4' />Long
					Break<i className='far fa-grin-beam-sweat icon-break-smile px-4' />
				</h1>
			</Card.Header>
			<Card.Body className='p-4'>
				<h1 className='timer text-center'>{intervalTime}</h1>
				<h2 className='text-center'>minutes</h2>
			</Card.Body>
			<Card.Body className='px-5 py-3 text-center'>
				<div style={{ width : '80%', marginLeft: 'auto', marginRight: 'auto'}}>
				<ProgressBar
					id='break'
					className='progress-bar-primary progress-bar-striped progress-bar-animated'
					now= {barLgth}
					animated
				/>	
				</div>	
			</Card.Body>
			<Tracker totalCompleted={setting.focusIntvlCt} roundTracker={setting.focusRoundCt} intervalsGoal={setting.focusIntvlGoal}/>
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

export default LongBreakScreen
