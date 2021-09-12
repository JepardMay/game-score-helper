import React, { useState } from 'react';
import { Table, Input, List, ListInlineItem, Button } from 'reactstrap';
import { Eye, EyeSlash, ArrowReturnLeft, XOctagonFill } from 'react-bootstrap-icons';

function GameView({ game, setGame, focusInput }) {
	const [score, setScore] = useState('');
	const [error, setError] = useState(false);

	const addScore = e => {
		if (score.trim() !== '') {
			setError(false);
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
		} else {
			setError(true);
		}
		focusInput();
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
							key={i}
							style={{
								backgroundColor: '#' + player.color,
							}}>
							{player.name}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				<tr style={game.visibility ? { display: 'none' } : null}>
					{game.players.map((player, i) => (
						<th key={i}>{player.score}</th>
					))}
				</tr>
				<tr>
					{game.players.map((player, i) => (
						<th key={i}>
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
						setGame({ ...game, visibility: !game.visibility });
					}}>
					{game.visibility ? <Eye /> : <EyeSlash />}
				</button>
			</h2>
			<Table className='w-100' dark>
				{playersTable}
			</Table>
			<Input
				type='number'
				placeholder='Type score'
				className={error ? 'border-danger' : null}
				onChange={e => {
					setScore(e.target.value);
					setError(false);
				}}
				value={score}
				autoFocus
			/>
			<List type='inline'>{playersButtons}</List>
			<div className='d-flex justify-content-between align-items-center mt-4'>
				<Button
					color='warning'
					size='lg'
					className='d-flex align-items-center'
					onClick={() => {
						setGame({ ...game, isPlaying: false });
					}}
					style={{ marginTop: '1rem' }}>
					<ArrowReturnLeft style={{ marginRight: '0.5rem' }} />
					Back{' '}
					<span className='d-none d-sm-block' style={{ marginLeft: '0.5rem' }}>
						to Main
					</span>
				</Button>
				<Button
					color='danger'
					size='lg'
					className='d-flex align-items-center'
					onClick={resetScore}
					style={{ marginLeft: '1rem', marginTop: '1rem' }}>
					Reset{' '}
					<span className='d-none d-sm-block' style={{ marginLeft: '0.5rem' }}>
						Score
					</span>
					<XOctagonFill style={{ marginLeft: '0.5rem' }} />
				</Button>
			</div>
		</section>
	);
}

export default GameView;
