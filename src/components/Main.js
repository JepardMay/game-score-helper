import React, { useState, useRef } from 'react';
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';
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

	const inputPlayer = useRef(null);

	function Player(name) {
		this.name = name;
		this.score = 0;
		this.last = null;
		this.color = colors[Math.floor(Math.random() * colors.length)];
	}

	const addPlayer = () => {
		if (input.trim() !== '') {
			const newPlayers = input
				.split(',')
				.map(playerName =>
					playerName !== '' && playerName !== ' ' ? new Player(playerName) : null,
				);
			setGame({
				...game,
				players: [...game.players.concat(newPlayers)],
			});

			setInput('');
			inputPlayer.current.focus();
		}
	};

	const editPlayer = e => {
		// if (!game.editingPlayer) {
		// 	const editedIndex = Number(e.target.closest('li').id.split('player-').join(''));
		// 	setInput(e.target.closest('li').textContent);
		// } else if (input.trim() !== '') {
		// 	setInput('');
		// }
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
						onChange={e => setInput(e.target.value)}
						onKeyPress={e =>
							e.key === 'Enter' ? (game.editingPlayer ? editPlayer() : addPlayer()) : null
						}
						value={input}
						autoFocus
					/>
					<InputGroupAddon addonType='append'>
						{game.editingPlayer ? (
							<Button color='warning' onClick={editPlayer}>
								Edit player
							</Button>
						) : (
							<Button color='success' onClick={addPlayer}>
								Add player
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
