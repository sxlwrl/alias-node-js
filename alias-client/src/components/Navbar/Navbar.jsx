import { Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<nav
			className='navbar navbar-expand-lg'
			style={{
				background:
					'linear-gradient(90deg, rgba(33,37,41,1) 0%, rgba(72,85,99,1) 100%)',
				color: '#ffffff',
			}}
		>
			<div className='container'>
				<Link className='navbar-brand' to='/' style={{ color: '#ffffff' }}>
					Alias Game
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav ms-auto'>
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='/leaderboard'
								style={{ color: '#f0f0f0' }}
							>
								Our Leaders
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
