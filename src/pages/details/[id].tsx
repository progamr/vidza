import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BASE_URL } from '../../utils';
import useAuthStore from '../../store/authStore';
import { Video } from '../../../types';
import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';

interface IProps {
	postDetails: Video,
}

const Details = ({postDetails}: IProps) => {

	const [post, setPost] = useState(postDetails);
	const [comment, setComment] = useState('');
	const [isPostingComment, setIsPostingComment] = useState(false);
	const [isVideoPlaying, setIsVideoPlaying] = useState(false);
	const [isVideoMuted, setIsVideoMuted] = useState(false);
	const { userProfile }: any = useAuthStore();
	const videoRef = useRef<HTMLVideoElement>(null);
	const router = useRouter();

	const onVideoPlay = () => {
		if(isVideoPlaying) {
			videoRef.current?.pause();
			setIsVideoPlaying(false);
		} else {
			videoRef.current?.play();
			setIsVideoPlaying(true);
		}
	}

	useEffect(() => {
		if(post && videoRef.current) {
			videoRef.current.muted = isVideoMuted;
		}
	}, [post, isVideoMuted]);

	const handleLikeAndDislike = async (like: boolean) => {
		if(userProfile) {
			const { data } = await axios.put(`${BASE_URL}/api/like`, {
				userId: userProfile._id,
				postId: post._id,
				like
			});

			setPost({ ...post, likes: data.likes });
		}
	}

	const addComment = async (e: any) => {
		e.preventDefault();
		if (userProfile && comment) {
			setIsPostingComment(true);
			const { data }: any = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
				userId: userProfile._id,
				comment
			});
			console.log('Res from add co', data);
			setPost({...post, comments: data.comments});
			setComment('');
			setIsPostingComment(false);
		}
	}

	{/* TODO: Enhance this to better UI */}
	if(! post) return (<div>Video not found</div>);

	return (
		<div className="flex w-full absolute top-0 left-0 bg-white flex-wrap lg:flex-nowrap">
			<div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
				<div className=" flex absolute top-3 left-2 lg:left-6 gap-6 z-50">
					<span className="cursor-pointer" onClick={() => router.back()}>
						<MdOutlineCancel className="text-white text-[35px]" />
					</span>
				</div>
				<div className="relative"> 
					<div className="lg:h-[100vh] h-[60vh]">
						<video
							ref={videoRef}
							src={post.video.asset.url}
							className="h-full cursor-pointer"
							loop
							onClick={onVideoPlay}
						/>
					</div>
					<div className="absolute top-[45%] left-[45%] cursor-pointer">
						{
							! isVideoPlaying && (
								<button onClick={onVideoPlay}>
									<BsFillPlayFill className="text-white text-6xl lg:text-8xl"/>
								</button>
							)
						}
					</div>
				</div>
				<div className="absolute bottom-6 lg:bottom-12 cursor-pointer right-5 lg:right-10">
				{ isVideoMuted ? (
					<button onClick={() => setIsVideoMuted(false)}>
						<HiVolumeOff className="text-white text-2xl lg:text-4xl" />
					</button>
				) : (
					<button onClick={() => setIsVideoMuted(true)}>
						<HiVolumeUp className="text-white text-2xl lg:text-4xl" />
					</button>
				)}
				</div>
			</div>
			<div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
				<div className="lg:mt-20 mt-10">
					<div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
						<div className="ml-4 md:w-20 md:h-20 w-16 h-16">
							<Link href={`/profile/${post.postedBy._id}`}>
								<>
									<Image
										width={65}
										height={65}
										className="rounded-full"
										src={post.postedBy.image}
										alt="profile photo"
										layout="responsive"
									/>
								</>
							</Link>
						</div>
						<div>
							<Link href={`/profile/${post.postedBy._id}`}>
								<div className="flex flex-col mt-3 gap-2">
									<p className="flex items-center gap-2 md:text-md font-bold text-primary">
										{post.postedBy.userName}
										{` `}
										<GoVerified />
									</p>
									<p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
										{post.postedBy.userName}
									</p>
								</div>
							</Link>
						</div>
					</div>
					<p className="px-10 text-lg text-gray-600">
						{post.caption}
					</p>
					<div className="mt-10 px-10">
						{userProfile && (
							<LikeButton likes={post.likes} handleLikeAndDislike={handleLikeAndDislike} />
						)}
					</div>
					<Comments
						comment={comment}
						setComment={setComment}
						addComment={addComment}
						isPostingComment={isPostingComment}
						comments={post.comments}
					/>
				</div>
			</div>
		</div>
	);
}


interface IServerSideProps {
	params: { id: string },
}

export const getServerSideProps = async ({
	params: { id }
}: IServerSideProps) => {
	const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

	return {
		props: {
			postDetails: data,
		}
	}
}

export default Details;
