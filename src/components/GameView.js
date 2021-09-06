import React, { useState, useRef } from 'react';
import { Table, Input, List, ListInlineItem, Button } from 'reactstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

function GameView({ game, setGame }) {
	const [score, setScore] = useState('');
	const [hidden, setHidden] = useState(false);

	const inputScore = useRef(null);

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

	const playersTable = (
		<>
			<thead>
				<tr>
					{game.players.map((player, i) => (
						<th
							style={{
								backgroundColor: '#' + player.color,
							}}>
							{player.name}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				<tr style={hidden ? { display: 'none' } : null}>
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
		<ListInlineItem key={'btn-' + i} className='mt-2'>
			<Button
				id={'btn-' + i}
				onClick={addScore}
				style={{
					backgroundColor: '#' + player.color,
					borderColor: '#' + player.color,
					fontWeight: 800,
				}}>
				{player.name}
			</Button>
		</ListInlineItem>
	));

	return (
		<section className='w-100'>
			<h2 className='h2 mb-4 d-flex justify-content-between'>
				Game Table
				<button
					type='button'
					className='btn btn-light'
					aria-label='Hide/show score'
					onClick={() => {
						setHidden(!hidden);
					}}>
					{hidden ? <Eye /> : <EyeSlash />}
				</button>
			</h2>
			<Table className='w-100' dark>
				{playersTable}
			</Table>
			<Input
				ref={inputScore}
				type='number'
				placeholder='Type score'
				onChange={e => setScore(e.target.value)}
				value={score}
				autoFocus
			/>
			<List type='inline'>{playersButtons}</List>
			<div className='row mx-auto mt-5'>
				<div className='col-12 col-sm-6 p-0 pr-1 pr-sm-0 pb-mb-2'>
					<Button
						color='warning'
						size='lg'
						warning
						block
						onClick={() => {
							setGame({ ...game, isPlaying: false });
						}}>
						Back to Main Screen
					</Button>
				</div>
				<div className='col-12 col-sm-6 p-0'>
					<Button color='danger' size='lg' block onClick={resetScore}>
						Reset Score
					</Button>
				</div>
			</div>
		</section>
	);
}

export default GameView;
