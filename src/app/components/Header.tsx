import Image from 'next/image';
import GoogleIcon from '../assets/google.svg';
import { signIn, useSession, signOut } from 'next-auth/react';
import { X } from 'lucide-react';

const Header = () => {
    const { data: session } = useSession();

    return (
        <header className='flex items-center justify-between py-4 w-full border-b border-zinc-900  '>
            <div className='flex items-center gap-2'>
                <Image width={40} height={40} src='/favicon.ico' alt='' />
            </div>

            {session && (
                <button
                    onClick={() => signOut()}
                    className='flex items-center justify-center gap-2 border border-zinc-800 hover:bg-transparent transition-colors  bg-zinc-800 rounded py-2 px-4 overflow-hidden'
                >
                    {session.user?.name}{' '}
                    <X className='text-zinc-500' size={18} />
                </button>
            )}

            {!session && (
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
