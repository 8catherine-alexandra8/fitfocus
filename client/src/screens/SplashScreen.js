import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Card, Col } from 'react-bootstrap'
import { motion } from 'framer-motion'
import Message from '../components/Message'
import Footer from '../components/Footer'
import { listTodaySetting, createSetting } from '../actions/settingActions'

const SplashScreen = () => {
	const history = useHistory()
	
	//Redux dispatch and app state access
	const dispatch = useDispatch()

	const settingToday = useSelector((state) => state.settingToday)
	const { loading, setting } = settingToday

	//create new setting if no setting already for today's
	//date and user's ip
	const settingCreate = useSelector((state) => state.settingCreate)
	const {
		error   : errorCreate,
		success : successCreate,
		setting : createdSetting
	} = settingCreate

//Get setting with today's date and user's ip
	useEffect(
		() => {
			dispatch(listTodaySetting())
		},
		[ dispatch ]
	)

	// directs user to SettingScreen or FocusScreen contingent upon
	// existance of (today)setting but allows time for animated
	// splash to finish first, before redirecting user
	useEffect(
		() => {
			if (setting && setting.userIp) {
				const timer = setTimeout(() => {
					history.push(`/focus/${setting._id}`, { from: 'splash' })
				}, 6000)
				return () => {
					clearTimeout(timer)
				}
			} else if (!loading && !setting && !createdSetting) {
				dispatch(createSetting())
				}
			
			if (successCreate) {
					const timer = setTimeout(() => {
						history.push(`settings/${createdSetting._id}/edit`, {from: 'splash'})
					}, 6000)
					return () => {
						clearTimeout(timer)
					}
				}
		},
		[ dispatch, loading, setting, successCreate, createdSetting, history ]
	)

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
		<>
		{errorCreate && <Message variant='danger'>{errorCreate}</Message>}
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
				<Footer className='splash-card-footer light' />
			</Card.Body>
		</Card>
	</>
	)
}

export default SplashScreen
