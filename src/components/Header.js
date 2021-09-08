import React, { useState } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import { XLg, QuestionSquareFill } from 'react-bootstrap-icons';

function Header({ isPlaying }) {
	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	return (
		<header className='d-flex justify-content-between align-items-center mb-3 p-2'>
			<h4 className='text-uppercase m-0' style={{ visibility: isPlaying ? 'unset' : 'hidden' }}>
				Game Score App
			</h4>
			<Button size='sm' color='secondary' className='d-flex align-items-center' onClick={toggle}>
				<QuestionSquareFill />
				<span className='d-none d-sm-block' style={{ marginLeft: '0.5rem' }}>
					How to Use This App
				</span>
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<Button
					style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 2 }}
					color='light'
					aria-label='Close Modal'
					onClick={toggle}>
					<XLg />
				</Button>
				<ModalBody className='p-4 text-dark'>
					<h2 className='h4 text-center text-primary'>How To Use This App</h2>
					<ol>
						<li className='mt-5'>
							Type all players' names one by one or slitting them by a comma in the input in the
							center.
						</li>
						<li className='mt-5'>
							Press the 'Start The Game' button when all players are in the list below.
						</li>
						<li className='mt-5'>
							Hide the current score if you don't want to see it before the game is over.
						</li>
						<li className='mt-5'>
							Enter score positive or negative and press the button with the player's name on it to
							add score to them.
						</li>
					</ol>
				</ModalBody>
			</Modal>
		</header>
	);
}

export default Header;
