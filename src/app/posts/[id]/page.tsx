'use client';

import { format } from 'date-fns';
import { Calendar, ChevronLeft, ExternalLink, GithubIcon } from 'lucide-react';
import { Issue } from 'next/dist/build/swc';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Post = ({ params }: any) => {
    const postURL = `https://api.github.com/repos/matheusaltrao/MatheusBlog/issues/${params.id}`;
    const [post, setPost] = useState<Issue>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 3000)); // Aumentei para 3 segundos
                const response = await fetch(postURL);
                const data = await response.json();
                setPost(data);
            } catch (error: any) {
                console.error(`Erro ao acessar as issues: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [postURL]);

    /*   const formatedDate = (date: string) => {
        return format(new Date(date), 'dd/MM/yyyy');
    }; */

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
                            {post?.title}
                        </h2>
                    </div>

                    <div className='flex items-center gap-6'>
                        <div className='flex items-center gap-2 '>
                            <GithubIcon className='text-zinc-400' size={20} />
                            <p className='text-zinc-200'>matheusaltrao</p>
                        </div>

                        <div className='flex items-center gap-2 '>
                            <Calendar className='text-zinc-400' size={20} />
                            <p className='text-zinc-200'>{post?.created_at}</p>
                        </div>

                        <div className='flex items-center gap-2 '>
                            <GithubIcon className='text-zinc-400' size={20} />
                            <p className='text-zinc-200'>matheusaltrao</p>
                        </div>
                    </div>
                </div>
            </header>
            <div className='mt-10 px-8'>
                <p className='text-zinc-300'>{post?.body}</p>
            </div>
        </div>
    );
};

export default Post;
