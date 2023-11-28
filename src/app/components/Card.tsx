import { differenceInDays, differenceInHours, format } from 'date-fns';
import Link from 'next/link';

interface CardProps {
    blog: any;
    index: number;
}

const Card = ({ blog, index }: CardProps) => {
    const curentDate = new Date();

    const formatedDate = (date: string) => {
        return format(new Date(date), 'dd/MM/yyyy');
    };

    const difference = (endDate: Date, startDate: string) => {
        const formatedEndDate = new Date(endDate);
        const formatedStartDate = new Date(startDate);
        const resultInHours = differenceInHours(
            formatedEndDate,
            formatedStartDate,
        );

        const resultInDays = differenceInDays(
            formatedEndDate,
            formatedStartDate,
        );

        if (resultInHours <= 24) {
            return `${resultInHours}h atrás`;
        }

        if (resultInHours > 24) {
            if (resultInDays == 1) {
                return `${resultInDays} dia atrás`;
            } else {
                return `${resultInDays} dias atrás`;
            }
        }

        if (resultInDays > 30) {
            formatedDate(startDate);
        }
    };

    const description = (text: string) => {
        const desc = text.substring(0, 180);
        return desc;
    };

    //  https://api.github.com/repos/matheusaltrao/MatheusBlog/issues/1

    return (
        <Link
            href={`https://api.github.com/repos/matheusaltrao/MatheusBlog/issues/${index}`}
            className='p-8 border w-full border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-colors overflow-hidden rounded-lg'
        >
            <div className='flex justify-between'>
                <h2 className='text-zinc-50 text-lg font-medium max-w-[200px] break-words'>
                    {blog.title}
                </h2>
                <p className='text-base text-zinc-400 '>
                    {difference(curentDate, blog.created_at)}
                </p>
            </div>
            <div>
                <p className='max-h-[200px] text-left break-words text-base text-zinc-400 mt-5'>
                    {description(blog.body)}...
                </p>
            </div>
        </Link>
    );
};

export default Card;
