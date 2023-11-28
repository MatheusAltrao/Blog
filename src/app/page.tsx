'use client';

import {
    Building,
    ExternalLink,
    GithubIcon,
    Search,
    Users,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from './components/Card';

type Issue = {
    title: string;
    body: string;
    created_at: string;
};

export default function Home() {
    const blogUrl =
        'https://api.github.com/repos/MatheusAltrao/MatheusBlog/issues';
    const userUrl = 'https://api.github.com/users/matheusaltrao';
    const avatar = 'https:github.com/matheusaltrao.png';
    const [blogContent, setBlogContent] = useState<Issue[]>([]);
    const [followers, setFollowers] = useState<number>();
    const [isLoading, setIsLoading] = useState(false);
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 3000)); // Aumentei para 3 segundos
                const response = await fetch(blogUrl);
                const data = await response.json();
                setBlogContent(data);
            } catch (error: any) {
                console.error(`Erro ao acessar as issues: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(userUrl);
                const data = await response.json();
                const followers = data.followers;
                setFollowers(followers);
            } catch (error: any) {
                console.error(`Erro ao acessar as issues: ${error.message}`);
            }
        };

        fetchUserData();
    }, []);

    const filteredBlogContent = filterValue
        ? blogContent.filter((content) =>
              content.title.toLowerCase().includes(filterValue.toLowerCase()),
          )
        : blogContent;

    return (
        <main className='w-full min-h-screen bg-zinc-950  '>
            <div className='max-w-[870px] mx-auto pt-10 px-4 overflow-x-hidden'>
                <div className='bg-zinc-900 hidden sm:flex rounded-lg p-8   gap-8'>
                    <Image
                        className='object-cover rounded-lg'
                        src={avatar}
                        width={148}
                        height={148}
                        alt='foto do matheus'
                    />

                    <div className='flex flex-col'>
                        <div className='flex items-center justify-between'>
                            <h2 className='text-zinc-50 text-2xl font-medium mb-2'>
                                Matheus
                            </h2>

                            <Link
                                target='_blank'
                                className='text-blue-500 font-medium flex uppercase items-center gap-2 hover:underline'
                                href='https://github.com/MatheusAltrao'
                            >
                                GITHUB
                                <ExternalLink size={18} />
                            </Link>
                        </div>
                        <p className='text-zinc-400 mb-5 font-normal'>
                            Explore o mundo do desenvolvimento Front-end através
                            do meu blog, onde compartilho minha paixão,
                            motivação e o meu aprendizado.
                        </p>

                        <div className='flex items-center gap-6'>
                            <div className='flex items-center gap-2 '>
                                <GithubIcon
                                    className='text-zinc-400'
                                    size={20}
                                />
                                <p className='text-zinc-200'>matheusaltrao</p>
                            </div>

                            <div className='flex items-center gap-2 '>
                                <Building className='text-zinc-400' size={20} />
                                <p className='text-zinc-200'>YouDevelop</p>
                            </div>

                            <div className='flex items-center gap-2 '>
                                <Users className='text-zinc-400' size={20} />
                                <p className='text-zinc-200'>{followers}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=' sm:hidden bg-zinc-900 flex flex-col items-center justify-center rounded-lg   gap-8'>
                    <div className='flex items-center flex-col gap-4'>
                        <Image
                            className='object-cover rounded-full'
                            src={avatar}
                            width={100}
                            height={100}
                            alt='foto do matheus'
                        />

                        <div className='flex items-center flex-col gap-1 justify-between'>
                            <h2 className='text-zinc-50 text-base font-medium '>
                                Matheus Altrão
                            </h2>

                            <Link
                                target='_blank'
                                className='text-zinc-500 font-medium flex items-center gap-2 hover:underline'
                                href='https://github.com/MatheusAltrao'
                            >
                                GITHUB
                                <ExternalLink size={18} />
                            </Link>
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <p className='text-zinc-400 mb-5 text-sm font-normal text-center'>
                            Explore o mundo do desenvolvimento Front-end através
                            do meu blog, onde compartilho minha paixão,
                            motivação e o meu aprendizado.
                        </p>

                        <div className='flex items-center justify-between  gap-6'>
                            <div className='flex items-center gap-2 '>
                                <GithubIcon
                                    className='text-zinc-400'
                                    size={16}
                                />
                                <p className='text-zinc-200 text-sm'>
                                    matheusaltrao
                                </p>
                            </div>

                            <div className='flex items-center gap-2 '>
                                <Building className='text-zinc-400' size={16} />
                                <p className='text-zinc-200 text-sm'>
                                    YouDevelop
                                </p>
                            </div>

                            <div className='flex items-center gap-2 '>
                                <Users className='text-zinc-400' size={16} />
                                <p className='text-zinc-200 text-sm'>
                                    {followers}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-20'>
                    <div className='flex items-center gap-2 h-10 w-full border border-zinc-800 rounded-lg px-4'>
                        <Search size={20} />
                        <input
                            placeholder='Pesquise pelo título da postagem'
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                            className='bg-transparent w-full ring-0 focus:ring-0 outline-none '
                            type='text'
                        />
                    </div>
                </div>

                <div className='mt-10 grid  grid-cols-1 sm:grid-cols-2  gap-4'>
                    {filteredBlogContent.map((blog, index) => (
                        <Card key={index} blog={blog} index={index} />
                    ))}
                </div>

                {isLoading && (
                    <div className='w-full'>
                        <p className='text-base text-center mt-10 text-zinc-400'>
                            Carregando ...
                        </p>
                    </div>
                )}

                {filteredBlogContent.length == 0 && filterValue.length > 0 && (
                    <div className='w-full'>
                        <p className='text-base text-center mt-10 text-zinc-400'>
                            Nenhum item encontrado.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
