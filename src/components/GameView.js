import React, { useState, useRef } from 'react';
import { Table, Input, List, ListInlineItem, Button } from 'reactstrap';

function GameView({ game, setGame }) {
	const [score, setScore] = useState('');

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
		<ListInlineItem key={'btn-' + i}>
			<Button
				className='mt-2'
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
			<List type='inline'>{playersButtons}</List>
			<div className='row mx-auto'>
				<div className='col-12 col-sm-6'>
					<Button
						color='danger'
						size='lg'
						block
						className='mt-5 mb-5'
						onClick={() => {
							setGame({ ...game, isPlaying: false });
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
	);
}

export default GameView;
