import React, { useState, useRef, useEffect } from 'react';
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import { PlusSquareFill, PencilSquare } from 'react-bootstrap-icons';

import PlayersList from './PlayersList';

function Main({ game, setGame }) {
	const colors = [
		'593F62',
		'7B6D8D',
		'8499B1',
		'493B2A',
		'F9DC5C',
		'C2EABD',
		'B59194',
		'B59194',
		'6EA4BF',
		'41337A',
		'B75D69',
		'394032',
		'F9A03F',
		'0AD3FF',
		'7C7C7C',
		'383D3B',
		'587B7F',
		'AF5D63',
	];

	const [input, setInput] = useState('');
	const [editing, setEditing] = useState(null);
	const [error, setError] = useState(false);

	const inputPlayer = useRef(null);

	useEffect(() => {
		inputPlayer.current.focus();
	}, [input]);

	function Player(name) {
		this.name = name;
		this.score = 0;
		this.last = null;
		this.color = colors[Math.floor(Math.random() * colors.length)];
	}

	const addPlayer = () => {
		if (input.trim() !== '') {
			setError(false);
			const newPlayers = input
				.split(',')
				.map(playerName =>
					playerName !== '' && playerName !== ' ' ? new Player(playerName.trim()) : null,
				);
			setGame({
				...game,
				players: [...game.players.concat(newPlayers)],
			});

			setInput('');
		} else {
			setError(true);
		}
	};

	const editPlayer = e => {
		if (!editing) {
			setEditing(e.target.closest('li').id.split('player-').join(''));
			setInput(e.target.closest('li').textContent.trim());
		} else if (editing && input.trim() !== '') {
			setError(false);
			const newPlayers = [...game.players];
			newPlayers[editing] = {
				...newPlayers[editing],
				name: input.trim(),
			};
			setGame({ ...game, players: newPlayers });
			setInput('');
			setEditing(null);
		} else if (editing && input.trim() === '') {
			setError(true);
		}
	};

	return (
		<>
			<h1 className='h1 text-center'>Game Score</h1>
			<p className='lead text-center'>
				Simple app to keep your score! Just add players name and push start.
			</p>
			<section className='w-100 d-flex flex-column justify-content-center align-items-center'>
				<h2 className='h4 sr-only'>Add players</h2>
				<InputGroup className='mb-5'>
					<Input
						ref={inputPlayer}
						placeholder='Player Name'
						className={error ? 'border-danger' : null}
						onChange={e => {
							setInput(e.target.value);
							setError(false);
						}}
						onKeyPress={e => (e.key === 'Enter' ? (editing ? editPlayer() : addPlayer()) : null)}
						value={input}
						autoFocus
					/>
					<InputGroupAddon addonType='append'>
						{editing ? (
							<Button color='warning' className='d-flex align-items-center' onClick={editPlayer}>
								<PencilSquare style={{ marginRight: '0.5rem' }} />
								Edit{' '}
								<span className='d-none d-sm-block' style={{ marginLeft: '0.5rem' }}>
									player
								</span>
							</Button>
						) : (
							<Button color='success' className='d-flex align-items-center' onClick={addPlayer}>
								<PlusSquareFill style={{ marginRight: '0.5rem' }} />
								Add{' '}
								<span className='d-none d-sm-block' style={{ marginLeft: '0.5rem' }}>
									player
								</span>
							</Button>
						)}
					</InputGroupAddon>
				</InputGroup>
				<Button
					color='warning'
					size='lg'
					block
					className='mb-5'
					onClick={() => game.players.length > 0 && setGame({ ...game, isPlaying: true })}>
					Start the Game
				</Button>
			</section>
			{game.players.length > 0 && (
				<PlayersList game={game} setGame={setGame} editPlayer={editPlayer} />
			)}
		</>
	);
}

export default Main;
