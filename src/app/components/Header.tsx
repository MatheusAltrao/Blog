import Image from 'next/image';
import GoogleIcon from '../assets/google.svg';
import { signIn, useSession, signOut } from 'next-auth/react';
import { X } from 'lucide-react';
import Spinner from './Spinner';

const Header = () => {
    const { data, status } = useSession();

    return (
        <header className='flex items-center justify-between py-4 w-full border-b border-zinc-900  '>
            <div className='flex items-center gap-2'>
                <Image
                    width={40}
                    height={40}
                    src='/logo.png'
                    alt='MatheusBlog'
                />
            </div>

            {status === 'authenticated' && (
                <button
                    onClick={() => signOut()}
                    className='flex items-center justify-center gap-2 border border-zinc-800 hover:bg-transparent transition-colors  bg-zinc-800 rounded py-2 px-4 overflow-hidden'
                >
                    {data.user?.name} <X className='text-zinc-500' size={18} />
                </button>
            )}

            {status === 'loading' && (
                <button className='flex items-center justify-center gap-2 border border-zinc-800 hover:bg-transparent transition-colors  bg-zinc-800 rounded py-2 w-[100px] overflow-hidden'>
                    <Spinner />
                </button>
            )}

            {status === 'unauthenticated' && (
                <button
                    onClick={() => signIn('google')}
                    className='flex items-center justify-center gap-2 border border-zinc-800 hover:bg-transparent transition-colors  bg-zinc-800 rounded py-2 px-4 overflow-hidden'
                >
                    <Image
                        src={GoogleIcon}
                        height={20}
                        width={20}
                        alt='Google'
                    />{' '}
                    Entrar com Google
                </button>
            )}
        </header>
    );
};

export default Header;
