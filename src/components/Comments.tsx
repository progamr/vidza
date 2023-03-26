import React, { FormEventHandler, MouseEventHandler, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { BiCommentX } from 'react-icons/bi';
import useAuthStore from '../store/authStore';
import NoResults from './NoResults';

interface IProps {
	comment: string,
	setComment: Function,
	addComment: MouseEventHandler<HTMLButtonElement>,
	isPostingComment: boolean,
	comments: IComment[],
}

interface IComment {
	comment: string,
	length?: number,
	_key: string,
	postedBy: { _ref: string }
}


const Comments = ({
	comment,
	setComment,
	addComment,
	isPostingComment,
	comments,
}: IProps) => {
	const { userProfile } = useAuthStore();

	return (
		<div className="border-t-2 border-gray-200 pt-4 px-10 
		bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
			<div className="overflow-scroll lg:h-[475px]">
				{
					comments?.length ? (
						<div>comments</div>
					) : (
						<NoResults>
							<p className="text-8xl">
								<BiCommentX />
							</p>
							<p className="text-2xl text-center">No comments yet</p>
						</NoResults>
					)
				}
			</div>
			{userProfile && (
				<div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
					<div className="flex gap-4">
						<input
							type="text"
							value={comment}
							onChange={(e) => { setComment(e.target.value) }}
							placeholder="Add a comment..."
							className="bg-primary px-6 py-4 text-md font-medium border-2 
							w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none
							focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
						/>
						<button className="text-md text-gray-400" onClick={addComment}>
							{ isPostingComment ? 'Commenting...': 'Comment'}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Comments;
