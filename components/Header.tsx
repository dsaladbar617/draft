'use client';
import Link from 'next/link';


const Header = () => {
	return (
		<header className='bg-slate-600 h-[56px] sticky top-0'>
			<nav className='h-full items-center flex justify-end mx-auto w-11/12'>
				<Link className='p-2 hover:underline' href='/'>
					HOME
				</Link>
				<Link className='p-2 hover:underline' href='/draft/2023'>
					DRAFT
				</Link>
				<Link className='p-2 hover:underline' href='/player'>
					PLAYER
				</Link>
			</nav>
		</header>
	);
};

export default Header;
