'use client';

import { Issue } from '@/app/page';
import { format } from 'date-fns';
import { Calendar, ChevronLeft, ExternalLink, GithubIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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

    const formatedDate = (date: Date) => {
        return format(new Date(date), 'dd/MM/yyyy');
    };

    const publishedAt = (startDate: string | undefined) => {
        if (startDate != undefined) {
            const formatedStartDate = new Date(startDate);
            return formatedDate(formatedStartDate);
        } else {
            return;
        }
    };

    return (
        <div className='max-w-[870px] mx-auto pt-10 px-4 overflow-x-hidden pb-10'>
            <header className=' bg-zinc-900 flex rounded-lg p-8  gap-8'>
                {isLoading ? (
                    <p>Carregando...</p>
                ) : (
                    <div className='flex flex-col w-full'>
                        <div className='flex items-center justify-between mb-5'>
                            <Link
                                href='/'
                                className='text-blue-500 text-sm  font-medium flex items-center gap-2 hover:underline'
                            >
                                <ChevronLeft size={20} /> Voltar
                            </Link>
                            <Link
                                target='_blank'
                                className='text-blue-500 text-sm font-medium flex uppercase items-center gap-2 hover:underline'
                                href='https://github.com/MatheusAltrao'
                            >
                                ver no github
                                <ExternalLink size={18} />
                            </Link>
                        </div>

                        <div className='flex items-center justify-between'>
                            <h2 className='text-zinc-50 text-2xl font-medium mb-4'>
                                {post?.title}
                            </h2>
                        </div>

                        <div className='flex flex-col sm:flex-row items-start sm:items-center sm:gap-4 gap-2'>
                            <div className='flex items-center gap-2 '>
                                <GithubIcon
                                    className='text-zinc-400'
                                    size={20}
                                />
                                <p className='text-zinc-200'>matheusaltrao</p>
                            </div>

                            <div className='flex items-center gap-2 '>
                                <Calendar className='text-zinc-400' size={20} />
                                <p className='text-zinc-200'>
                                    {publishedAt(post?.created_at)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </header>
            <article className='mt-10 px-8 prose prose-h1:text-zinc-50 prose-h2:text-zinc-200 prose-h3:text-zinc-200 prose-a:text-blue-500 text-zinc-300 mx-auto w-full'>
                <ReactMarkdown>{post?.body}</ReactMarkdown>
            </article>
        </div>
    );
};

export default Post;
