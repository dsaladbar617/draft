import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from './ui/select';

interface PlaceholderSelectProps {
	placeholder: string;
}

const PlaceholderSelect = ({placeholder}: PlaceholderSelectProps) => {
	return (
		<Select>
			<SelectTrigger className='w-1/3 lg:w-1/4'>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent className='max-h-[50vh]' position='popper'>
				<SelectItem key={0} className='hover:bg-neutral-500' value={'0'}>
					{'No Team Selected'}
				</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default PlaceholderSelect;
