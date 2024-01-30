'use client';
import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    format,
} from 'date-fns';
import Link from 'next/link';
import { Issue } from '../page';
import { signIn, useSession } from 'next-auth/react';
import { Divide } from 'faunadb';

interface CardProps {
    blog: Issue;
}

const Card = ({ blog }: CardProps) => {
    const curentDate = new Date();
    const { data } = useSession();

    const formatedDate = (date: string) => {
        return format(new Date(date), 'dd/MM/yyyy');
    };

    const difference = (endDate: Date, startDate: string) => {
        const formatedEndDate = new Date(endDate);
        const formatedStartDate = new Date(startDate);

        const resultInMinutes = differenceInMinutes(
            formatedEndDate,
            formatedStartDate,
        );

        const resultInHours = differenceInHours(
            formatedEndDate,
            formatedStartDate,
        );

        const resultInDays = differenceInDays(
            formatedEndDate,
            formatedStartDate,
        );

        if (resultInHours < 1) {
            return `${resultInMinutes} min atrás`;
        }

        if (resultInHours <= 23) {
            return `${resultInHours} h atrás`;
        }

        if (resultInHours > 23 && resultInDays < 30) {
            if (resultInDays == 1) {
                return `${resultInDays} dia atrás`;
            } else {
                return `${resultInDays} dias atrás`;
            }
        }

        if (resultInDays > 30) {
            return formatedDate(startDate);
        }
    };

    const description = (text: string) => {
        const desc = text.substring(0, 100);
        return desc;
    };

    return data ? (
        <Link
            className='p-8 h-[14.125rem] border w-full border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-colors overflow-hidden rounded-lg'
            href={`/posts/${blog.number}`}
        >
            <div className='space-y-1 text-left'>
                <p className=' text-zinc-400 text-sm whitespace-nowrap   '>
                    {difference(curentDate, blog.created_at)}
                </p>
                <h2 className='text-zinc-50 text-sm  text-left md:text-lg font-medium '>
                    {blog.title}
                </h2>
            </div>
            <div>
                <p className='max-h-[200px] text-left break-words text-base text-zinc-400 mt-5'>
                    {description(blog.body)}...
                </p>
            </div>
        </Link>
    ) : (
        <button
            onClick={() => signIn('google')}
            className='p-8 h-[14.125rem] border flex items-start flex-col w-full border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-colors overflow-hidden rounded-lg'
        >
            <div className='flex items-start gap-1 flex-col w-full'>
                <p className=' text-zinc-400 text-sm whitespace-nowrap  '>
                    {difference(curentDate, blog.created_at)}
                </p>
                <h2 className='text-zinc-50 text-sm text-left md:text-lg font-medium '>
                    {blog.title}
                </h2>
            </div>
            <div>
                <p className='max-h-[200px] text-left break-words text-base text-zinc-400 mt-5'>
                    {description(blog.body)}...
                </p>
            </div>
        </button>
    );
};

export default Card;
