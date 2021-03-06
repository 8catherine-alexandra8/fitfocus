import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const NavCard = ({ id, from, timeUsed }) => {
	return (
		<Navbar bg='dark' variant='dark' className='navbar'>
			<Container>
				<LinkContainer to='/'>
					<Navbar.Brand>FitFocus</Navbar.Brand>
				</LinkContainer>
				<Nav className='ml-auto'>
					<Link
						to={{
							pathname : `/settings/${id}/edit`,
							state    : {
								from     : `${from}`,
								timeUsed : `${timeUsed}`
							}
						}}
					>
						<i className='fas fa-cog icon-nav' />
					</Link>
				</Nav>
			</Container>
		</Navbar>
	)
}

export default NavCard
