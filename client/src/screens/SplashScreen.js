import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'
import { motion } from 'framer-motion'
import settings from '../settings'

const SplashScreen = () => {
	const history = useHistory()
	const today = new Date().toLocaleDateString('en-US')
	const [ loading, setLoading ] = useState(true)
	const [ setting, setSetting ] = useState()

	const [ todaySetting, setTodaySetting ] = useState(false)
	const todaySettingRef = useRef(todaySetting)
	todaySettingRef.current = todaySetting

	useEffect(() => {
		setSetting(settings[0])

		// return () => {
		// 	cleanup
		// }
	}, [])

	useEffect(
		() => {
			setting && setLoading(false)
			if (
				!loading &&
				setting.settingsDate &&
				!todaySetting &&
				setting.settingsDate === today
			) {
				setTodaySetting(true)
			}
			// return () => {
			//     cleanup
			// }
		},
		[ setting, loading, today, todaySetting ]
	)

	useEffect(() => {
		const timer = setTimeout(() => {
			todaySettingRef.current
				? history.push('/focus')
				: history.push('/settings')
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

export default SplashScreen
