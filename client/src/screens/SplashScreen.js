import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'
import { motion } from 'framer-motion'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listTodaySetting, createSetting } from '../actions/settingActions'
import { SETTING_CREATE_RESET } from '../constants/settingConstants'

const SplashScreen = () => {
	const history = useHistory()
	const dispatch = useDispatch()

	const settingToday = useSelector((state) => state.settingToday)
	const { loading, error, setting } = settingToday

	const settingCreate = useSelector((state) => state.settingCreate)
	const {
		loading : loadingCreate,
		error   : errorCreate,
		success : successCreate,
		setting : createdSetting
	} = settingCreate


	//Grabs state resulting from redux dispatch of listSetting()
	//to access all settings in DB
	// const settingList = useSelector((state) => state.settingList)
	// const { loading, error, settings } = settingList

	useEffect(
		() => {
			dispatch(listTodaySetting())
		},
		[ dispatch ]
	)

	//This use effect gets list of all setting records in DB via Redux
	// useEffect(
	// 	() => {
	// 		dispatch(listSettings())
	// 	},
	// 	[ dispatch ]
	// )

	//directs user to SettingScreen or FocusScreen contingent upon
	//existance of (today)setting but allows time for animated
	//splash to finish first, before redirecting user
	useEffect(
		() => {
			if (setting) {
				const timer = setTimeout(() => {
					history.push(`/focus/${setting._id}`, { from: 'splash' })
				}, 6000)
				return () => {
					clearTimeout(timer)
				}
			} else if (!loading && !setting && !createdSetting) {
				//dispatch({ type: SETTING_CREATE_RESET })
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
		[ dispatch, loading, setting, successCreate, createdSetting ]
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
		{loadingCreate && <Loader />}
		{errorCreate && <Message variant='danger'>{errorCreate}</Message>}
		{loading ? (<Loader />) : (
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
	)}
	</>
	)
}

export default SplashScreen
