'use client';
import Link from 'next/link';

interface HeaderProps {}

const Header = () => {
	return (
		<nav className='bg-slate-600 h-[6vh]'>
			<div className='h-full items-center flex justify-end mx-auto w-11/12'>
				<Link className='p-2' href='/'>
					HOME
				</Link>
				<Link className='p-2' href='/draft'>
					DRAFT
				</Link>
				<Link className='p-2' href='/player'>
					PLAYERS
				</Link>
			</div>
		</nav>
	);
};

export default Header;
