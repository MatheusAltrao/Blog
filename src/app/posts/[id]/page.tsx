'use client';

import { Issue } from '@/app/page';
import { format } from 'date-fns';
import {
    Calendar,
    ChevronLeft,
    ExternalLink,
    GithubIcon,
    Send,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { v4 as uuid } from 'uuid';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Comment from '@/app/components/Comment';
import {
    addDoc,
    collection,
    doc,
    getDoc,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';
import { db } from '@/service/firebase';

type CommentsProps = {
    comment: string;
    date: string;
    email: string;
    id: string;
    name: string;
    postId: string;
};

const Post = ({ params }: { params: { id: string } }) => {
    const { data } = useSession();
    const urlId = params.id;
    const postURL = `https://api.github.com/repos/matheusaltrao/MatheusBlog/issues/${urlId}`;
    const [post, setPost] = useState<Issue>();
    const [isLoading, setIsLoading] = useState(false);
    const [commentInput, setCommentInput] = useState('');
    const [comments, setComments] = useState<CommentsProps[]>([]);

    useEffect(() => {
        if (!data) {
            redirect('/');
        }
    }, [data]);

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

    useEffect(() => {
        async function loadComments() {
            const commentRef = collection(db, 'comments');
            const q = query(commentRef, where('postId', '==', urlId));

            onSnapshot(q, (snapshot) => {
                let listComments = [] as CommentsProps[];
                snapshot.forEach((doc) => {
                    listComments.push({
                        name: doc.data()?.name,
                        email: doc.data()?.email,
                        comment: doc.data()?.comment,
                        date: doc.data()?.date,
                        id: doc.data()?.id,
                        postId: doc.data().postId,
                    });
                });

                setComments(listComments);
            });
        }

        loadComments();
    }, [urlId]);

    const handleRegisterComment = async () => {
        try {
            await addDoc(collection(db, 'comments'), {
                id: uuid(),
                name: data?.user?.name,
                email: data?.user?.email,
                date: new Date().toLocaleDateString(),
                postId: urlId.toString(),
                comment: commentInput,
            });

            setCommentInput('');
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Impede a quebra de linha no textarea
            handleRegisterComment();
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
                            <h2 className='text-zinc-50 text-base md:text-2xl font-medium mb-4'>
                                {post?.title}
                            </h2>
                        </div>

                        <div className='flex flex-col sm:flex-row items-start sm:items-center sm:gap-4 gap-2'>
                            <div className='flex items-center gap-2 '>
                                <GithubIcon
                                    className='text-zinc-400'
                                    size={16}
                                />
                                <p className='text-zinc-200 text-sm md:text-base'>
                                    matheusaltrao
                                </p>
                            </div>

                            <div className='flex items-center gap-2 '>
                                <Calendar className='text-zinc-400' size={16} />
                                <p className='text-zinc-200 text-sm md:text-base'>
                                    {publishedAt(post?.created_at)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </header>
            <div className='mt-10 px-2 prose prose-h1:text-zinc-50 prose-h2:text-zinc-50 prose-h3:text-zinc-50 prose-a:text-blue-500 text-zinc-400 mx-auto w-full'>
                <ReactMarkdown>{post?.body}</ReactMarkdown>
            </div>

            <div className='w-full h-px bg-zinc-700 my-8' />

            <div className='space-y-8'>
                <h2 className='text-zinc-50  text-2xl font-semibold '>
                    Comentários
                </h2>

                <div className='flex flex-col gap-4'>
                    {comments.map((comment) => (
                        <Comment
                            key={comment.id}
                            content={comment.comment}
                            date={comment.date}
                            name={comment.name}
                        />
                    ))}

                    {comments.length == 0 && (
                        <p className='text-zinc-400'>
                            Nenhum comentário encontrado.
                        </p>
                    )}
                </div>

                <div className='w-full h-px bg-zinc-700 my-8' />

                <form className='p-4 rounded h-[120px] bg-zinc-900 w-full flex items-end gap-2 '>
                    <textarea
                        onKeyDown={handleKeyDown}
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder='Comentar'
                        className='resize-none h-full  text-base bg-zinc-900  w-full focus:outline-none ring-0  '
                    />

                    <button
                        onClick={handleRegisterComment}
                        title='Comentar'
                        disabled={commentInput.length == 0}
                        className={`text-blue-600  transition-opacity  ${
                            commentInput.length == 0 && 'opacity-0'
                        }`}
                    >
                        {' '}
                        <Send
                            className='p-1 hover:bg-zinc-800 transition-colors rounded'
                            size={28}
                        />{' '}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Post;
