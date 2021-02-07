import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import NavCard from '../components/NavCard'
import Footer from '../components/Footer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
	listSettingDetails,
	updateSettingTargets
} from '../actions/settingActions'
import {
	SETTING_UPDATE_TARGETS_RESET,
	SETTING_CREATE_RESET
} from '../constants/settingConstants'

const SettingsEditScreen = ({ match }) => {
	const history = useHistory()
	const settingId = match.params.id
	const source = history.location.state.from
	console.log(source)

	//component level state
	const [ focusInterval, setFocusInterval ] = useState(25)
	const [ shortBreakInterval, setShortBreakInterval ] = useState(5)
	const [ longBreakInterval, setLongBreakInterval ] = useState(25)
	const [ focusGoal, setFocusGoal ] = useState(8)

	//Redux dispatch and state access
	const dispatch = useDispatch()
	const settingDetails = useSelector((state) => state.settingDetails)
	const { loading, error, success, setting } = settingDetails

	const settingUpdateTargets = useSelector(
		(state) => state.settingUpdateTargets
	)
	const {
		loading : loadingUpdate,
		error   : errorUpdate,
		success : successUpdate,
		setting : settingUpdated
	} = settingUpdateTargets

	//Redux get setting that has _id matching id in url
	useEffect(
		() => {
			if (successUpdate) {
				//dispatch({ type: SETTING_UPDATE_TARGETS_RESET })
				//dispatch({ type: SETTING_CREATE_RESET })
				dispatch(listSettingDetails(settingId))
			}
		},
		[ dispatch, history, successUpdate, success ]
	)

	const goToFocus = () => {
		if (source !== 'splash') {
			const timer = setTimeout(() => {
				history.push(`/${source}/${settingId}`, { from: 'settings' })
			}, 500)
			return () => clearTimeout(timer)
		} else {
			const timer = setTimeout(() => {
				history.push(`/focus/${settingId}`, { from: 'settings' })
			}, 500)
			return () => clearTimeout(timer)
		}
	}

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateSettingTargets({
				_id               : settingId,
				focusIntvlLgth    : focusInterval,
				shortBrkIntvlLgth : shortBreakInterval,
				longBrkIntvlLgth  : longBreakInterval,
				focusIntvlGoal    : focusGoal
			})
		)
		goToFocus()
	}

	return (
		<FormContainer>
			{(loadingUpdate || successUpdate) && <Loader />}
			{errorUpdate && <Message variant='danger'>{error}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Card className='card card-settings text-white bg-secondary m-4'>
					<Card.Header className='text-center card-header'>
						<NavCard />
					</Card.Header>
					<Card.Header className='text-center screen-header'>
						<h1>
							<i className='fas fa-cog px-3' />Settings<i className='fas fa-cog px-3' />
						</h1>
						<h5 className='card-subtitle py-2 text-center'>
							{' '}
							{setting.date}
						</h5>
					</Card.Header>
					<Form className='form' onSubmit={submitHandler}>
						<Form.Group controlId='settingsForm.ControlSelect1'>
							<Form.Label className='col-form-label col-form-label'>
								Focus Interval
							</Form.Label>
							<Form.Control
								className='setting-select'
								as='select'
								type='number'
								value={focusInterval}
								onChange={(e) => setFocusInterval(e.target.value)}
							>
								<option>15</option>
								<option>20</option>
								<option>25</option>
								<option>30</option>
							</Form.Control>
							<Form.Text>Minutes</Form.Text>
						</Form.Group>

						<Form.Group controlId='settingsForm.ControlSelect2'>
							<Form.Label className='col-form-label '>
								Short Break Interval
							</Form.Label>
							<Form.Control
								className='setting-select'
								as='select'
								type='number'
								value={shortBreakInterval}
								onChange={(e) => setShortBreakInterval(e.target.value)}
							>
								<option>5</option>
								<option>10</option>
								<option>15</option>
							</Form.Control>
							<Form.Text>Minutes</Form.Text>
						</Form.Group>

						<Form.Group controlId='settingsForm.ControlSelect3'>
							<Form.Label className='col-form-label '>
								Long Break Interval
							</Form.Label>
							<Form.Control
								className='setting-select'
								as='select'
								type='number'
								value={longBreakInterval}
								onChange={(e) => setLongBreakInterval(e.target.value)}
							>
								<option>15</option>
								<option>20</option>
								<option>25</option>
								<option>30</option>
							</Form.Control>
							<Form.Text>Minutes</Form.Text>
						</Form.Group>

						<Form.Group controlId='settingsForm.ControlSelect4'>
							<Form.Label className='col-form-label '>
								Total # Focus Sessions Goal
							</Form.Label>
							<Form.Control
								className='setting-select'
								as='select'
								type='number'
								value={focusGoal}
								onChange={(e) => setFocusGoal(e.target.value)}
							>
								<option>4</option>
								<option>6</option>
								<option>8</option>
								<option>10</option>
								<option>12</option>
								<option>16</option>
								<option>20</option>
							</Form.Control>
						</Form.Group>
						<Button variant='primary' type='submit' className='btn-submit'>
							Submit
						</Button>
					</Form>
					<Footer />
				</Card>
			)}
		</FormContainer>
	)
}

export default SettingsEditScreen
