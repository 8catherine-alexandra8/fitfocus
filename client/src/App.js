import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import SettingsEditScreen from './screens/SettingsEditScreen'
import FocusScreen from './screens/FocusScreen'
import ShortBreakScreen from './screens/ShortBreakScreen'
import LazyBreakScreen from './screens/LazyBreakScreen'
import LongBreakScreen from './screens/LongBreakScreen'
import ReportCardScreen from './screens/ReportCardScreen'

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container className='container'>
					<Route path='/' component={SettingsEditScreen} exact />
					<Route path='/focus' component={FocusScreen} />
					<Route path='/shortbreak' component={ShortBreakScreen} />
					<Route path='/lazybreak' component={LazyBreakScreen} />
					<Route path='/longbreak' component={LongBreakScreen} />
					<Route path='/reportcard' component={ReportCardScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	)
}
export default App
