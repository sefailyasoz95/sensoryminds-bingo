import React from "react";
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { refreshState } from "../../Recoil/refreshState";

type Props = {
	username?: string;
};

const Header: React.FC<Props> = ({ username }) => {
	const [refresh, setRefresh] = useRecoilState(refreshState);
	const onRefresh = () => setRefresh(!refresh);
	return (
		<nav className='mx-auto text-xs md:text-sm md:w-2/3 flex flex-row items-center px-5 py-2 justify-between w-full'>
			<span>Welcome to Sensory Minds Bingo Game{username && `, ${username}`}</span>
			<div className='flex-row-center'>
				<ThemeToggler />
				<span className='flex-row-center ml-2 cursor-pointer' onClick={onRefresh}>
					Refresh
					<ArrowPathIcon width={20} height={20} className='refresh-icon' />
				</span>
			</div>
		</nav>
	);
};

export default Header;
