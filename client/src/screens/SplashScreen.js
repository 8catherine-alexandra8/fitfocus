import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Card, Row, Col } from 'react-bootstrap'
import { motion } from 'framer-motion'

const SplashScreen = () => {
	const history = useHistory()
	const [ settings, setSettings ] = useState([])
	const [ todaySetting, setTodaySetting ] = useState({})
	const [ currentSettingId, setCurrentSettingId ] = useState('')
	const currentSettingIdRef = useRef(currentSettingId)
	currentSettingIdRef.current = currentSettingId

	useEffect(() => {
		const fetchTodaySetting = async () => {
			const { data } = await axios.get('/api/settings/todaySetting')
			setTodaySetting(data)
			console.log(data)
		}
		fetchTodaySetting()
	}, [])

	useEffect(
		() => {
			if (todaySetting) {
				setCurrentSettingId(todaySetting._id)
				const timer = setTimeout(() => {
					history.push(`/focus/${currentSettingIdRef.current}`)
				}, 6000)
				return () => {
					clearTimeout(timer)
				}
			} else if (!todaySetting) {
				const timer = setTimeout(() => {
					console.log('no setting for today yet')
					history.push('/settings')
				}, 6000)
				return () => {
					clearTimeout(timer)
				}
			}
		},
		[ todaySetting ]
	)
	// useEffect(() => {
	// 	const fetchSettings = async () => {
	// 		const { data } = await axios.get('/api/settings')
	// 		setSettings(data)
	// 		console.log(settings)
	// 	}
	// 	fetchSettings()
	// 	console.log(settings)
	// 	// return () => {
	// 	//     cleanup
	// 	// }
	// }, [])

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

export default SplashScreen
