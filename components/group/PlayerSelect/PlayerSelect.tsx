'use client';
import { useState } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '../../ui/select';
import { useRouter } from 'next/navigation';

interface PlayerSelectProps {
	data: TeamTypeWithRoster | undefined;
	currentTeam: string;
}

const PlayerSelect = ({ data, currentTeam }: PlayerSelectProps) => {
	const [value, setValue] = useState<string>('Pick a Player');
	const selectedTeam = data?.teams?.filter(
		(elem) => elem.id.toString() === currentTeam
	)[0];

	const router = useRouter();

	console.log(value);

	return (
		<Select
		// value={value !== '' ? value : 'Pick a Player'}
			onValueChange={async (e) => {
				router.push(`/player/${e}`);
				setValue(e);
			}}>
			<SelectTrigger className='w-1/3 lg:w-1/4'>
				<SelectValue placeholder={value} />
			</SelectTrigger>
			<SelectContent
				className='max-h-[var(--radix-select-content-available-height)]'
				position='popper'>
				{selectedTeam ? (
					selectedTeam?.roster?.roster
						.sort((a, b) => {
							if (
								a.person.fullName.toUpperCase() >
								b.person.fullName.toUpperCase()
							) {
								return 1;
							}
							if (
								a.person.fullName.toUpperCase() <
								b.person.fullName.toUpperCase()
							) {
								return -1;
							}
							return 0;
						})
						.map((elem, index) => (
							<SelectItem
								className='hover:bg-slate-500 focus:bg-slate-500'
								value={`${elem.person.fullName.replace(
									' ',
									'%20'
								)}?id=${elem.person.id.toString()}`}
								key={elem.person.id}>
								{elem.person.fullName}
							</SelectItem>
						))
				) : (
					<SelectItem key={0} className='hover:bg-slate-500 focus:bg-slate-500' value={'0'}>
						{'No Team Selected'}
					</SelectItem>
				)}
			</SelectContent>
		</Select>
	);
};

export default PlayerSelect;
