import { Calendar, ChevronLeft, ExternalLink, GithubIcon } from 'lucide-react';
import Link from 'next/link';

const Posts = () => {
    const post =
        'https://api.github.com/repos/matheusaltrao/MatheusBlog/issues/1';

    return (
        <div className='max-w-[870px] mx-auto pt-10 px-4 overflow-x-hidden'>
            <header className=' bg-zinc-900 hidden sm:flex rounded-lg p-8  gap-8'>
                <div className='flex flex-col w-full'>
                    <div className='flex items-center justify-between mb-5'>
                        <Link
                            href='/'
                            className='text-blue-500  font-medium flex items-center gap-2 hover:underline'
                        >
                            <ChevronLeft size={20} /> Voltar
                        </Link>
                        <Link
                            target='_blank'
                            className='text-blue-500 font-medium flex uppercase items-center gap-2 hover:underline'
                            href='https://github.com/MatheusAltrao'
                        >
                            ver no github
                            <ExternalLink size={18} />
                        </Link>
                    </div>

                    <div className='flex items-center justify-between'>
                        <h2 className='text-zinc-50 text-2xl font-medium mb-2'>
                            JavaScript data types and data structures
                        </h2>
                    </div>

                    <div className='flex items-center gap-6'>
                        <div className='flex items-center gap-2 '>
                            <GithubIcon className='text-zinc-400' size={20} />
                            <p className='text-zinc-200'>matheusaltrao</p>
                        </div>

                        <div className='flex items-center gap-2 '>
                            <Calendar className='text-zinc-400' size={20} />
                            <p className='text-zinc-200'>matheusaltrao</p>
                        </div>

                        <div className='flex items-center gap-2 '>
                            <GithubIcon className='text-zinc-400' size={20} />
                            <p className='text-zinc-200'>matheusaltrao</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className='mt-10 px-8'>
                <p className='text-zinc-300'>
                    Programming languages all have built-in data structures, but
                    these often differ from one language to another. This
                    article attempts to list the built-in data structures
                    available in JavaScript and what properties they have. These
                    can be used to build other data structures. Wherever
                    possible, comparisons with other languages are drawn.
                    <br />
                    <br />
                    Dynamic typing JavaScript is a loosely typed and dynamic
                    language. Variables in JavaScript are not directly
                    associated with any particular value type, and any variable
                    can be assigned (and re-assigned) values of all types:
                </p>
            </div>
        </div>
    );
};

export default Posts;
