import React, { useState, useEffect } from 'react';

import Main from './components/Main';
import GameView from './components/GameView';

function App() {
	const initialValue = localStorage.getItem('game-score')
		? JSON.parse(localStorage.getItem('game-score'))
		: {
				isPlaying: false,
				players: [],
				editingPlayer: false,
		  };

	const [game, setGame] = useState(initialValue);

	useEffect(() => {
		localStorage.setItem('game-score', JSON.stringify(game));
	}, [game]);

	return (
		<div className='container min-vh-100 d-flex flex-column justify-content-center align-items-center'>
			{!game.isPlaying ? (
				<Main game={game} setGame={setGame} />
			) : (
				<GameView game={game} setGame={setGame} />
			)}
		</div>
	);
}

export default App;
