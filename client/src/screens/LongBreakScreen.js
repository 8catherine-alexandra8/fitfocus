import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card, ProgressBar } from 'react-bootstrap'
import useSound from 'use-sound'
import transitionSfx from '../sounds/transition.mp3'
import NavCard from '../components/NavCard'
import Tracker from '../components/Tracker'
import Controls from '../components/Controls'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listSettingDetails, updateSettingRoundCt  } from '../actions/settingActions'
import { SETTING_UPDATE_ROUNDCT_RESET } from '../constants/settingConstants'
//import { SETTING_UPDATE_RESET } from '../constants/settingConstants'


const LongBreakScreen = ({match}) => {
	const history = useHistory()

	//Sounds
	const [playTransition] = useSound(transitionSfx, { volume: 0.25 })

	//Redux dispatch and state access
	const dispatch = useDispatch()
	const settingDetails = useSelector((state) => state.settingDetails)
	const { loading, error, setting} = settingDetails

	const settingUpdateRoundCt = useSelector((state) => state.settingUpdateRoundCt)
	const { loading: loadingRoundCtUpdate, error: errorRoundCtUpdate, success: successRoundCtUpdate, setting: settingRoundCtUpdated} = settingUpdateRoundCt

	//component level state
	const [intervalTime, setIntervalTime] = useState()
	const [pause, setPause] = useState(false)

	//Redux get setting that has _id matching id in url
	useEffect(() => {
		dispatch(listSettingDetails(match.params.id))
	}, [match, dispatch])

	//use application state to set component state
	useEffect(() => {
		if (setting._id) {
			console.log('this ran')
			console.log(setting.focusRoundCt)
			setIntervalTime(setting.longBrkIntvlLgth)
		// 	if (setting._id && setting.focusRoundCt === 3) {
		// 							console.log('this ran')

		// 	console.log(setting.focusRoundCt)
		// 	dispatch(updateSetting({
		// 		_id: setting._id,
		// 		focusRoundCt: 0,
		// 	}))
		// }
		}
	}, [setting._id])

	//Timer 
	useEffect(
		() => {

			let interval = null
			if (!loading && !loadingRoundCtUpdate && !pause && intervalTime > 0) {

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
		[ pause, loading, intervalTime, loadingRoundCtUpdate ]
	) 

//Update focusRoundCt in app state
	useEffect(() => {
		if (
			!loading &&
			!pause &&
			!successRoundCtUpdate &&
			!loadingRoundCtUpdate &&
			intervalTime === 0 
		) {
			 dispatch(updateSettingRoundCt({
			 	_id: setting._id,
				 focusRoundCt: 0,
			 }))
			}
	}, [intervalTime, dispatch])

//send user back to focus after focusRoundCt updated
	useEffect(() => {
		if (successRoundCtUpdate && !loading && !loadingRoundCtUpdate) {
			dispatch({ type: SETTING_UPDATE_ROUNDCT_RESET })
			playTransition()
			history.push(`/focus/${setting._id}`, {from: 'break'})
		}
		 
	}, [successRoundCtUpdate])

	return (
				<>
	 	{loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (

		<Card className='card card-longbreak border-secondary m-4'>
			<Card.Header className='text-center card-header p-3'>
				<NavCard id={setting._id} from='longBreak' />
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
				<ProgressBar
					className='progress-bar progress-bar-striped progress-bar-animated '
					role='progressbar'
					aria-valuenow='75'
					aria-valuemin='0'
					aria-valuemax='100'
					style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}
				/>
			</Card.Body>
			<Tracker totalCompleted={setting.focusIntvlCt} roundTracker={setting.focusRoundCt} intervalsGoal={setting.focusIntvlGoal}/>
			<Controls />
		</Card>
				)} 
		
		</>

	)
}

export default LongBreakScreen
