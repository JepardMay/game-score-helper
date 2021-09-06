import React from 'react';

function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer class='d-flex justify-content-end align-items-center mt-3 p-2'>
			<p className='text-secondary mb-0'>
				© Coded by{' '}
				<a className='link-light' href='https://github.com/JepardMay'>
					Jepard May
				</a>{' '}
				{year}
			</p>
		</footer>
	);
}

export default Footer;
