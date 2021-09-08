import React from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { PencilSquare, TrashFill, PeopleFill } from 'react-bootstrap-icons';

function PlayersList({ game, setGame, editPlayer }) {
	const deletePlayer = e => {
		const deletedPlayerIndex = Number(e.target.closest('li').id.split('player-').join(''));
		setGame({
			...game,
			players: game.players.filter((player, i) => i !== deletedPlayerIndex && player),
		});
	};

	const playersList = game.players.map((player, i) => (
		<ListGroupItem
			key={'player-' + i}
			id={'player-' + i}
			className='d-flex justify-content-between align-items-center'>
			<div>
				<Badge
					pill
					style={{
						height: '100%',
						backgroundColor: '#' + player.color,
					}}>
					{' '}
				</Badge>{' '}
				{player.name}
			</div>
			<div className='flex-shrink-0 d-flex flex-nowrap'>
				<button
					type='button'
					className='btn btn-default'
					aria-label='Edit player'
					onClick={editPlayer}>
					<PencilSquare />
				</button>
				<button
					type='button'
					className='btn btn-default'
					aria-label='Delete player'
					onClick={deletePlayer}>
					<TrashFill />
				</button>
			</div>
		</ListGroupItem>
	));

	return (
		<section className='w-75'>
			<h2 className='h3 mb-3 d-flex justify-content-between'>
				<span>
					<PeopleFill style={{ marginRight: '1rem' }} />
					Players
				</span>
				<button
					type='button'
					className='btn btn-danger'
					aria-label='Delete all players'
					onClick={() => {
						setGame({
							...game,
							players: [],
						});
					}}>
					<TrashFill />
				</button>
			</h2>
			<ListGroup>{playersList}</ListGroup>
		</section>
	);
}

export default PlayersList;
