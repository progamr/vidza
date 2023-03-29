import React from 'react';
import { useState, useEffect } from 'react'; 
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import { MdOutlineVideocamOff } from 'react-icons/md';
import axios from 'axios';
import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../../types';
import { BASE_URL } from '../..//utils';

interface IProps {
	user: IUser,
	userVideos: Video[],
	userLikedVideos: Video[],
}

const Profile = (props: IProps) => {
	const { user, userVideos, userLikedVideos } = props;
	const [showUserVideos, setShowUserVideos] = useState(true);
	const [videosList, setVideosList] = useState<Video[]>([]);
	const videosTabStyle = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
	const likedVideosTabStyle = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';

	useEffect(() => {
		if (showUserVideos) {
			setVideosList(userVideos);
		} else {
			setVideosList(userLikedVideos);
		}
	}, [showUserVideos, userVideos, userLikedVideos]);

	return (
		<div className="w-full">
			<div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
				<div className="w-16 h-16 md:w-32 md:h-32">
					<Image
						src={user.image}
						width={120}
						height={120}
						className="rounded-full"
						alt="user profile"
						layout="responsive"
					/>
				</div>
				<div className="flex flex-col">
					<p className="md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-primary lowercase">
						{user.userName.replaceAll(' ', '')}
						<GoVerified className="text-blue-400" />
					</p>
					<p className="capitalize text-gray-400 md:text-xl text-xs">
						{user.userName}
					</p>
				</div>
			</div>
			<div>
				<div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-400 bg-white w-full">
					<p
						className={`text-xl font-semibold cursor-pointer mt-2 ${videosTabStyle}`}
						onClick={() => setShowUserVideos(true)}
					>
						Videos
					</p>
					<p
						className={`text-xl font-semibold cursor-pointer mt-2 ${likedVideosTabStyle}`}
						onClick={() => setShowUserVideos(false)}
					>
						Likes
					</p>
				</div>
				<div className="flex gap-6 flex-wrap md:justify-start">
					{
						videosList.length > 0 ? (
							videosList.map((video: Video, index: number) => (
								<VideoCard post={video} key={video._id} />
							))
						) : (
							<NoResults>
								<MdOutlineVideocamOff />
								<p>No {showUserVideos ? '': 'liked'} vedios yet</p>
							</NoResults>
						)
					}
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps = async ({
	params: { id }
} : {
	params: { id: string }
}) => {
	const { data } = await axios.get(`${BASE_URL}/api/profile/${id}`);

	return {
		props: data,
	}
}

export default Profile
