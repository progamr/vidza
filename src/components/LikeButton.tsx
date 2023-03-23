import React, { useState,  useEffect } from 'react';
import { MdFavorite } from 'react-icons/md';
import useAuthStore from '../store/authStore';

interface IProps {
	handleLikeAndDislike: (likeState: boolean) => void,
	likes: any[],
}

const LikeButton = ({
	handleLikeAndDislike,
	likes,
}: IProps) => {
	const [alreadyLiked, setAlreadyLiked] = useState(false);
	const { userProfile }: any = useAuthStore();
	const currentUserLike = likes?.filter((item: any) => item._ref === userProfile?._id);

	useEffect(() => {
		if(Array.isArray(currentUserLike) && currentUserLike.length > 0) {
			setAlreadyLiked(true);
		} else {
			setAlreadyLiked(false);
		}
	}, [currentUserLike, likes]);

	return (
		<div className="flex gap-6">
			<div className="mt-4 flex flex-col justify-center items-center">
				<button className={`bg-primary rounded-full p-2 md:p-4 ${alreadyLiked ? 'text-[#F51997]': ''}`} onClick={() => handleLikeAndDislike(!alreadyLiked)}>
						<MdFavorite className="text-lg text-2xl" />
				</button>
				<p className="text-md font-semibold">{likes?.length || 0}</p>
			</div>
		</div>
	);
}

export default LikeButton;
