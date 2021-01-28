import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Form, Button, Card } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import settings from '../settings'
import NavCard from '../components/NavCard'

const SettingsCreateScreen = () => {
	const history = useHistory()
	const previousSetting = settings[0]
	const today = new Date().toLocaleDateString('en-US')

	const [ focusInterval, setFocusInterval ] = useState(
		previousSetting.focus.intervalTime
	)
	const [ shortBreakInterval, setShortBreakInterval ] = useState(
		previousSetting.shortBreak.intervalTime
	)
	const [ longBreakInterval, setLongBreakInterval ] = useState(
		previousSetting.longBreak.intervalTime
	)
	const [ focusGoal, setFocusGoal ] = useState(
		previousSetting.focus.completedIntervalGoal
	)
	// useEffect(
	// 	() => {
	// 		//get settings
	// 		if (previousSetting.settingsDate === today) history.push('/focus')
	// 		// return () => {
	// 		// 	cleanup
	// 		// }
	// 	},
	// 	[ previousSetting, today, history ]
	// )

	console.log(
		`focus: ${focusInterval}, shortBreak: ${shortBreakInterval}, longBreak: ${longBreakInterval}, focusGoal: ${focusGoal}`
	)
	const submitHandler = (e) => {
		e.preventDefault()
		history.push('/focus')
		//start Focus Timer
		//create new settings document and post to MongoDB
	}

	return (
		<FormContainer>
			<Card className='card card-settings text-white bg-secondary m-4'>
				<Card.Header className='text-center card-header p-3'>
					<NavCard />
				</Card.Header>
				<Card.Header className='text-center card-header px-5 py-3'>
					<h1>
						<i className='fas fa-cog px-4' />Settings<i className='fas fa-cog px-4' />
					</h1>
					<h5 className='card-subtitle py-2 text-center'> {today}</h5>
				</Card.Header>
				<Form className='form p-5' onSubmit={submitHandler}>
					<Form.Group controlId='settingsForm.ControlSelect1'>
						<Form.Label className='col-form-label col-form-label-lg'>
							Focus Interval
						</Form.Label>
						<Form.Control
							className='setting-select'
							as='select'
							size='lg'
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
						<Form.Label className='col-form-label col-form-label-lg'>
							Short Break Interval
						</Form.Label>
						<Form.Control
							className='setting-select'
							as='select'
							size='lg'
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
						<Form.Label className='col-form-label col-form-label-lg'>
							Long Break Interval
						</Form.Label>
						<Form.Control
							className='setting-select'
							as='select'
							size='lg'
							value={longBreakInterval}
							onChange={(e) => setLongBreakInterval(e.target.value)}
						>
							<option>15</option>
							<option>20</option>
							<option>25</option>
							<option>25</option>
						</Form.Control>
						<Form.Text>Minutes</Form.Text>
					</Form.Group>

					<Form.Group controlId='settingsForm.ControlSelect4'>
						<Form.Label className='col-form-label col-form-label-lg'>
							Total # Focus Sessions Goal
						</Form.Label>
						<Form.Control
							className='setting-select'
							as='select'
							size='lg'
							value={focusGoal}
							onChange={(e) => setFocusGoal(e.target.value)}
						>
							<option>4</option>
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
			</Card>
		</FormContainer>
	)
}

export default SettingsCreateScreen
