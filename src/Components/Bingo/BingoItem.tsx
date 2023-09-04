import React from "react";

type Props = {
	text: string;
	isSelected: boolean;
	onItemClick: () => void;
	id: number;
};

const BingoItem: React.FC<Props> = ({ isSelected, onItemClick, text, id }) => {
	return (
		<div onClick={onItemClick} className={`bingo-item ${isSelected ? "bingo-item-selected" : ""}`}>
			{text}
			<span className='absolute right-0.5 -bottom-0.5'>{id}</span>
		</div>
	);
};

export default BingoItem;
