import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const NavCard = () => {
	return (
		<Navbar bg='dark' variant='dark' className='navbar'>
			<Container>
				<LinkContainer to='/'>
					<Navbar.Brand>FitFocus</Navbar.Brand>
				</LinkContainer>
				<Nav className='ml-auto'>
					<Nav.Link href='/'>
						<i className='fas fa-cog icon-nav' />
					</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	)
}

export default NavCard
// <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
