import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'
import { motion } from 'framer-motion'
import settings from '../settings'

const SplashScreen1 = () => {
	const history = useHistory()
	const today = new Date().toLocaleDateString('en-US')
	const [ loading, setLoading ] = useState(true)
	const [ setting, setSetting ] = useState()
	const [ todaySetting, setTodaySetting ] = useState(false)
	// const todaySettingRef = useRef(todaySetting)
	// todaySettingRef.current = todaySetting

	const [ currentSettingId, setCurrentSettingId ] = useState('')
	const currentSettingIdRef = useRef(currentSettingId)
	currentSettingIdRef.current = currentSettingId

	useEffect(() => {
		//get settings data from database
		// return () => {
		// 	cleanup
		// }
		console.log('splash mounted')
	}, [])
	useEffect(
		() => {
			//if data is loading and setting state variable has no
			//value, then set setting state as settings data array element as 0 index
			if (loading && !setting) {
				setSetting(settings[0])
			} else if (
				setting &&
				setting.settingsDate &&
				setting.settingsDate === today &&
				!todaySetting &&
				loading
			) {
				//if setting is defined and setting.settinsDate is defined, and settings.settingsDate is same as today, and todaySetting state is false, and loading is still true, then change todaySetting to true, update currentSettingId to setting's id and change loading to false
				setTodaySetting(true)
				setCurrentSettingId(setting._id)
				setLoading(false)
			} else if (
				setting &&
				setting.settingsDate &&
				setting.settingsDate !== today &&
				!todaySetting &&
				loading
			) {
				//if setting is defined and setting.settinsDate is defined, and settings.settingsDate is NOT same as today, and todaySetting state is false, and loading is still true, then create a new setting record with today's date and default values for intervals (set in model.) and setSetting(the new setting record) should happen via this useEffect being called again due to state update of settings
				console.log('no setting yet for today')
				//create new setting record with today's date & upload to db
			}

			if (setting)
				console.log(
					`todaySetting: ${todaySetting}, currentSettingId: ${currentSettingId}, currentSettingIdRef.current: ${currentSettingIdRef.current}, setting: ${setting}, setting.settingsDate: ${setting.settingsDate} `
				)
			// return () => {
			// 	cleanup
			// }
		},
		[
			settings,
			setting,
			todaySetting,
			currentSettingId,
			currentSettingIdRef.current
		]
	)

	useEffect(() => {
		console.log(
			`In timer useEffect before timer: currentSettingId: ${currentSettingId}, currentSettingIdRef.current: ${currentSettingIdRef.current}, todaySetting: ${todaySetting}`
		)
		const timer = setTimeout(() => {
			currentSettingIdRef.current
				? history.push(`/focus/${currentSettingIdRef.current}`)
				: history.push('/settings')
			console.log(
				`In timer useEffect after timer: currentSettingId: ${currentSettingId}, currentSettingIdRef.current: ${currentSettingIdRef.current}, todaySetting: ${todaySetting}`
			)
		}, 6000)
		return () => {
			clearTimeout(timer)
		}
	}, [])

	//Animations
	const splashAnim = {
		hidden : { opacity: 0 },
		show   : { opacity: 1, transition: { duration: 0.75 } }
	}
	const animContainer = {
		hidden : { y: 100 },
		show   : {
			y          : 0,
			transition : {
				duration        : 1,
				ease            : 'easeOut',
				staggerChildren : 0.5
			}
		}
	}

	return (
		<Card className='card border-primary mb-3 splash-card'>
			<Card.Header className='text-center card-header p-3'>
				<h1>FitFocus</h1>
			</Card.Header>

			<Card.Body className='px-5 py-3 text-center'>
				<Col className='splash-card-text-container text-center hide'>
					<motion.div
						variants={animContainer}
						initial='hidden'
						animate='show'
						className='hide'
					>
						<motion.h2 variants={splashAnim} className='splash-card-text'>
							Are
						</motion.h2>
						<motion.h2 variants={splashAnim} className='splash-card-text'>
							you
						</motion.h2>
						<motion.h2 variants={splashAnim} className='splash-card-text'>
							ready
						</motion.h2>
						<motion.h2 variants={splashAnim} className='splash-card-text'>
							to
						</motion.h2>
						<motion.h2 variants={splashAnim} className='splash-card-text'>
							work
						</motion.h2>
						<motion.h2 variants={splashAnim} className='splash-card-text'>
							?
						</motion.h2>
						<motion.img
							variants={splashAnim}
							src='../images/brainBiceps.png'
							alt='brain with muscles'
							width='250px'
							className='splash-img'
						/>
					</motion.div>
				</Col>
				<Card.Footer className='splash-card-footer'>
					<p className='text-center splash-footer-text'>
						Copyright &copy; 2021 Fit & Focused
					</p>
				</Card.Footer>
			</Card.Body>
		</Card>
	)
}

export default SplashScreen1
