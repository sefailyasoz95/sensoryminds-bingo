import { useRecoilValue } from "recoil";
import BingoContainer from "./Components/Bingo/BingoContainer";
import Header from "./Components/Header/Header";
import { celebrationState } from "./Recoil/celebrationState";
import Lottie from "react-lottie";
import { useEffect, useState } from "react";
import { refreshState } from "./Recoil/refreshState";

function App() {
	const celebrationMode = useRecoilValue(celebrationState);
	const refresh = useRecoilValue(refreshState);
	const [username, setUsername] = useState<string>("");
	const [gameStarted, setGameStarted] = useState(false);
	const onStart = () => {
		if (!username) {
			setUsername("Player 1");
		}
		setGameStarted(true);
	};
	useEffect(() => {
		setUsername("");
		setGameStarted(false);
	}, [refresh]);

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.currentTarget.value);
	};
	return (
		<div className='container'>
			{celebrationMode && (
				<div className='celebration'>
					<span className='username'>{username}</span>
					<Lottie
						options={{
							animationData: require("./Assets/Animation/celebration-animation.json"),
							autoplay: true,
							loop: true,
						}}
					/>
				</div>
			)}
			<Header username={username} />
			{gameStarted && username ? (
				<BingoContainer />
			) : (
				<div className='m-auto flex flex-col items-center'>
					<label htmlFor='username'>Player Name</label>
					<input name='username' id='username' className='input' onChange={onInputChange} />
					<button className='start-button' onClick={onStart}>
						Start
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
