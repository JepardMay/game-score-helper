import React, { useState, useEffect, useRef } from 'react';
import {
	InputGroup,
	InputGroupAddon,
	Button,
	Input,
	ListGroup,
	ListGroupItem,
	Table,
} from 'reactstrap';

function App() {
	const initialValue = localStorage.getItem('game-score')
		? JSON.parse(localStorage.getItem('game-score'))
		: {
				isPlaying: false,
				players: [],
		  };

	const [game, setGame] = useState(initialValue);

	const [input, setInput] = useState('');
	const [score, setScore] = useState('');

	useEffect(() => {
		localStorage.setItem('game-score', JSON.stringify(game));
	}, [game]);

	const inputPlayer = useRef(null);
	const inputScore = useRef(null);

	function Player(name) {
		this.name = name;
		this.score = 0;
		this.last = null;
	}

	const addPlayer = () => {
		if (input.trim() !== '') {
			const newPlayer = new Player(input);
			setGame({ ...game, players: [...game.players, newPlayer] });
			setInput('');
			inputPlayer.current.focus();
		}
	};

	const deletePlayer = e => {
		const deletedPlayerIndex = Number(e.target.closest('li').id.split('player-').join(''));
		setGame({
			...game,
			players: game.players.filter((player, i) => i !== deletedPlayerIndex && player),
		});
	};

	const addScore = e => {
		if (score.trim() !== '') {
			const index = e.target.id.split('btn-').join('');
			const newPlayers = [...game.players];
			const userScore = newPlayers[index].score;
			newPlayers[index] = {
				...newPlayers[index],
				score: userScore + Number(score),
				last: Number(score),
			};
			setGame({ ...game, players: newPlayers });
			setScore('');
			inputScore.current.focus();
		}
	};

	const resetScore = () => {
		setGame({
			...game,
			players: game.players.map(newPlayer => {
				return { ...newPlayer, score: 0, last: null };
			}),
		});
	};

	const playersList = game.players.map((player, i) => (
		<ListGroupItem key={'user-' + i} id={'player-' + i}>
			{player.name}
			<button
				type='button'
				className='ml-auto btn btn-default'
				aria-label='Delete player'
				onClick={deletePlayer}>
				<i className='bi bi-trash-fill' aria-hidden='true'></i>
			</button>
		</ListGroupItem>
	));

	const playersTable = (
		<>
			<thead>
				<tr>
					{game.players.map((player, i) => (
						<th>{player.name}</th>
					))}
				</tr>
			</thead>
			<tbody>
				<tr>
					{game.players.map((player, i) => (
						<th>{player.score}</th>
					))}
				</tr>
				<tr>
					{game.players.map((player, i) => (
						<th>
							{player.last === null ? (
								'-'
							) : player.last > 0 ? (
								<span className='text-success'>{player.last}</span>
							) : player.last === 0 ? (
								<span className='text-warning'>{player.last}</span>
							) : (
								<span className='text-danger'>{player.last}</span>
							)}
						</th>
					))}
				</tr>
			</tbody>
		</>
	);

	const playersButtons = game.players.map((player, i) => (
		<Button className='ml-2 mt-2' id={'btn-' + i} key={'btn-' + i} onClick={addScore}>
			{player.name}
		</Button>
	));

	return (
		<div className='container min-vh-100 d-flex flex-column justify-content-center align-items-center'>
			{!game.isPlaying ? (
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
								onKeyPress={e => e.key === 'Enter' && addPlayer()}
								value={input}
								autoFocus
							/>
							<InputGroupAddon addonType='append'>
								<Button color='success' onClick={addPlayer}>
									Add player
								</Button>
							</InputGroupAddon>
						</InputGroup>
						<Button
							color='warning'
							size='lg'
							block
							className='mb-5'
							onClick={() => playersList.length > 0 && setGame({ ...game, isPlaying: true })}>
							Start the Game
						</Button>
					</section>
					{playersList.length > 0 && (
						<section className='w-75'>
							<h2 className='h2 mb-3'>Players</h2>
							<ListGroup>{playersList}</ListGroup>
						</section>
					)}
				</>
			) : (
				<section className='w-100'>
					<h2 className='h2'>Game Table</h2>
					<Table className='w-100' dark>
						{playersTable}
					</Table>
					<Input
						ref={inputScore}
						placeholder='Type score'
						onChange={e => setScore(e.target.value)}
						value={score}
						autoFocus
					/>
					<div className='d-flex ml-n2 mt-n2'>{playersButtons}</div>
					<div className='row mx-auto'>
						<div className='col-12 col-sm-6'>
							<Button
								color='danger'
								size='lg'
								block
								className='mt-5 mb-5'
								onClick={() => {
									setGame({ ...game, isPlaying: false });
									resetScore();
								}}>
								Finish the Game
							</Button>
						</div>
						<div className='col-12 col-sm-6'>
							<Button color='danger' size='lg' block className='mt-5 mb-5' onClick={resetScore}>
								Reset score
							</Button>
						</div>
					</div>
				</section>
			)}
		</div>
	);
}

export default App;
