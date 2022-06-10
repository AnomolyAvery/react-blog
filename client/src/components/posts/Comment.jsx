import React from 'react';

const Comment = ({ comment }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
                <img
                    className="h-10 w-10 rounded-full"
                    src={getGravatarUrl(
                        comment?.user?.email ?? 'test@test.com'
                    )}
                    alt=""
                />
                <Link to={`/users/${comment.user._id}`} className="ml-3">
                    <p className="text-base leading-6 font-medium text-gray-900">
                        {comment.user.name}
                    </p>
                    <div className="flex text-sm leading-5 text-gray-500">
                        <time dateTime={comment.createdAt}>
                            {new Date(comment.createdAt).toDateString()}
                        </time>
                    </div>
                </Link>
            </div>
            <div className="mt-2">
                <div className="prose lg:prose-xl">
                    <p className="text-base leading-6 text-gray-500">
                        {comment.content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Comment;
