import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BingoCardTexts, BingoLines } from "../../Constants/BingoConstants";
import BingoItem from "./BingoItem";
import { useRecoilState, useRecoilValue } from "recoil";
import { refreshState } from "../../Recoil/refreshState";
import { celebrationState } from "../../Recoil/celebrationState";

type Props = {};

const BingoContainer: React.FC<Props> = (props) => {
	const initialBingoCells = Array(25).fill(false);
	const [bingoCells, setBingoCells] = useState<Array<boolean>>(initialBingoCells);
	const refresh = useRecoilValue(refreshState);
	const [winners, setWinners] = useState<Array<Array<number>>>([]);
	const [celebrationMode, setCelebrationMode] = useRecoilState(celebrationState);
	const [lastWinnerLength, setLastWinnerLength] = useState(0);
	const onItemClick = (index: number) => {
		if (index === 12) return;
		const _bingoCells = [...bingoCells];
		_bingoCells[index] = !_bingoCells[index];
		setBingoCells(_bingoCells);
	};
	const shuffledTexts = useMemo(() => {
		const shuffled = BingoCardTexts.sort(() => 0.5 - Math.random());
		const _shuffled = shuffled.slice(0, 24);
		_shuffled.splice(12, 0, "FREE TEXT 🥳");
		return _shuffled;
	}, [refresh]);

	useEffect(() => {
		setWinners([]);
		setBingoCells(initialBingoCells);
	}, [refresh]);

	const checkBingo = useCallback(() => {
		let filteredBingos = BingoLines.filter((line) => line.every((index) => bingoCells[index] || index === 12));
		setLastWinnerLength(winners.length);
		setWinners(filteredBingos);
	}, [bingoCells]);

	useEffect(() => {
		if (winners.length > lastWinnerLength) {
			setCelebrationMode(true);
		}
	}, [winners.length]);

	useEffect(() => {
		const timeoutDuration = 4000;
		let timeout;
		if (celebrationMode) {
			timeout = setTimeout(() => {
				setCelebrationMode(false);
			}, timeoutDuration);
		} else {
			clearTimeout(timeout);
		}
	}, [celebrationMode]);

	useEffect(() => {
		checkBingo();
	}, [bingoCells, checkBingo]);

	return (
		<div className={`bingo-container `}>
			{shuffledTexts.map((item, index) => (
				<BingoItem
					text={item}
					key={index}
					isSelected={index === 12 || bingoCells[index]}
					onItemClick={() => onItemClick(index)}
					id={index + 1}
				/>
			))}
		</div>
	);
};

export default BingoContainer;
