import Image from 'next/image';
import GoogleIcon from '../assets/google.svg';

const Header = () => {
    return (
        <header className='flex items-center justify-between py-4 w-full border-b border-zinc-900  '>
            <div className='flex items-center gap-2'>
                <Image width={40} height={40} src='/favicon.ico' alt='' />
            </div>

            <button className='flex items-center justify-center gap-2 border border-zinc-800 hover:bg-transparent transition-colors  bg-zinc-800 rounded py-2 px-4 overflow-hidden'>
                <Image src={GoogleIcon} height={20} width={20} alt='Google' />{' '}
                Entrar com Google
            </button>
        </header>
    );
};

export default Header;
