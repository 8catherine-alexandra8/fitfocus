import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import SplashScreen from './screens/SplashScreen'
//import SettingsCreateScreen from './screens/SettingsCreateScreen'
import SettingsEditScreen from './screens/SettingsEditScreen'
import FocusScreen from './screens/FocusScreen'
import ShortBreakScreen from './screens/ShortBreakScreen'
import LazyBreakScreen from './screens/LazyBreakScreen'
import LongBreakScreen from './screens/LongBreakScreen'
import ReportCardScreen from './screens/ReportCardScreen'

const App = () => {
	const pathname = window.location.pathname
	return (
		<Router>
			<main className='py-3'>
				<Container className='container'>
					<Route path='/' component={SplashScreen} exact />
					{/* <Route path='/settings' component={SettingsCreateScreen} exact /> */}
					<Route
						path='/settings/:id/edit'
						component={SettingsEditScreen}
					/>
					<Route path='/focus/:id' component={FocusScreen} exact />
					<Route
						path='/shortbreak/:id'
						component={ShortBreakScreen}
						exact
					/>
					<Route path='/lazybreak/:id' component={LazyBreakScreen} />
					<Route path='/longbreak/:id' component={LongBreakScreen} exact />
					<Route path='/reportcard' component={ReportCardScreen} />
				</Container>
			</main>
			{pathname === '/' ? <div /> : <Footer />}
		</Router>
	)
}
export default App
