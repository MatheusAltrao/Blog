interface CommentProps {
    name: string;
    date: string;
    content: string;
}

const Comment = ({ content, date, name }: CommentProps) => {
    return (
        <div className='flex flex-col gap-2 bg-zinc-900 p-4 rounded'>
            <div className='flex items-center justify-between'>
                <h3 className='text-zinc-50 font-semibold'>{name}</h3>
                <p className='text-sm text-zinc-500'>{date}</p>
            </div>

            <p className='text-zinc-400 text-base'>{content}</p>
        </div>
    );
};

export default Comment;
