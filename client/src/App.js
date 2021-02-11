import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import SplashScreen from './screens/SplashScreen'
import SettingsEditScreen from './screens/SettingsEditScreen'
import FocusScreen from './screens/FocusScreen'
import ShortBreakScreen from './screens/ShortBreakScreen'
import LazyBreakScreen from './screens/LazyBreakScreen'
import LongBreakScreen from './screens/LongBreakScreen'
import ReportCardScreen from './screens/ReportCardScreen'

const App = () => {
	return (
		<Router>
			<main>
				<Container fluid>
					<Route path='/' component={SplashScreen} exact />
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
					<Route path='/reportcard/:id' component={ReportCardScreen} />
				</Container>
			</main>
		</Router>
	)
}
export default App
