import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, ProgressBar } from 'react-bootstrap'
import NavCard from '../components/NavCard'
import Footer from '../components/Footer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listSettingDetails } from '../actions/settingActions'

const ReportCardScreen = ({ match }) => {

	//Redux dispatch and state access
	const dispatch = useDispatch()
	const settingDetails = useSelector((state) => state.settingDetails)
	const { loading, error, success, setting } = settingDetails

	//component level state
	const [focusTtl, setFocusTtl] = useState(0)
	const [exerciseTtl, setExerciseTtl] = useState(0)
	const [barLgth, setBarLgth] = useState(0)

	//Redux get setting that has _id matching id in url
	useEffect(
		() => {
			dispatch(listSettingDetails(match.params.id))
		},
		[ dispatch ]
	)

	//use application state to set component state value for interval
	useEffect(
		() => {
			if (setting) {
				const focusMinutes = setting.focusIntvlCt * setting.focusIntvlLgth
				const exerciseMinutes =
					setting.exerciseBrkCt * setting.shortBrkIntvlLgth
				const progress = Math.floor(
					setting.focusIntvlCt / setting.focusIntvlGoal * 100
				)
				setFocusTtl(focusMinutes)
				setExerciseTtl(exerciseMinutes)
				setBarLgth(progress)
			}
		},
		[ setting ]
	)
	return (
		<Card className='card card-reportcard border-secondary m-4'>
			{loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : success && (
			<>
			<Card.Header className='text-center card-header p-3'>
				<NavCard />
			</Card.Header>
			<Card.Header className='text-center card-header p-3'>
				<h1>
					<i
						className='fas fa-hand-sparkles icon-report-high5 px-4'
						style={{ transform: 'scaleX(-1)' }}
					/>Nice Work!<i className='fas fa-hand-sparkles icon-report-high5 px-4' />
				</h1>
			</Card.Header>
			<Card.Body className='p-4 card-report-top'>
				<i className='fas fa-brain icon-report icon-report-brain' />
				<h1
					className='text-center'
					style={{ fontWeight: 'bold', fontSize: '2rem' }}
				>
					Focus
				</h1>
				<h2 className='report-time text-center'>{focusTtl} minutes</h2>
			</Card.Body>
			<Card.Body className='p-4 card-report-top'>
				<i className='fas fa-heartbeat icon-report icon-report-heart' />
				<h1
					className='text-center'
					style={{ fontWeight: 'bold', fontSize: '2rem' }}
				>
					Exercise
				</h1>
				<h2 className='report-time text-center'>
					{exerciseTtl} minutes
				</h2>
			</Card.Body>
			<Card.Body className='p-4 card-report-top'>
				<i className='fas fa-child icon-report icon-report-goal' />
				<h1
					className='text-center'
					style={{ fontWeight: 'bold', fontSize: '2rem' }}
				>
					Goal
				</h1>
				<h2 className='report-time text-center'>
					{setting.focusIntvlCt}/{setting.focusIntvlGoal} focus sessions completed
				</h2>
			</Card.Body>
			<Card.Body className='px-5 py-2 text-center card-progress-report'>
				<div
					className='report-prog'
					style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto'}}
				>
					<ProgressBar
						id='break'
						className='progress-bar-primary progress-bar-striped progress-bar-animated report-prog'
						now={barLgth}
						label={`${barLgth}%`}
						animated
					/>
				</div>
			</Card.Body>
			<Footer />
			</>
			)} 
		</Card>
	)
}

export default ReportCardScreen
