import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Video } from '../../types';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

interface IProps {
	post: Video
}

const VideoCard = ({post}: IProps) => {
	const [isHovering, setIsHovering] = useState(false);
	const [isVideoPlaying, setIsVideoPlaying] = useState(false);
	const [isVideoMuted, setIsVideoMuted] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	const onVideoPress = () => {
		if(isVideoPlaying) {
			videoRef.current?.pause();
			setIsVideoPlaying(false);
		} else {
			videoRef.current?.play();
			setIsVideoPlaying(true);
		}
	}

	useEffect(() => {
		if(videoRef.current) {
			videoRef.current.muted = isVideoMuted;
		}
	}, [isVideoMuted]);

	return (
		<div className="flex flex-col border-b-2 border-gray-200 pd-6">
			<div>
				<div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
					<div className="md:w-16 md:h-16 w-10 h-10">
						<Link href={`/profile/${post.postedBy._id}`}>
							<Image
								width={65}
								height={65}
								className="rounded-full"
								src={post.postedBy.image}
								alt="profile photo"
								layout="responsive"
							/>
						</Link>
					</div>
					<div>
						<Link href={`/profile/${post.postedBy._id}`}>
							<div className="flex items-center gap-2">
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
			</div>
			<div className="lg:ml-20 flex gap-4 relative">
				<div
					onMouseEnter={() => setIsHovering(true)}
					onMouseLeave={() => setIsHovering(false)}
					className="rounded-3xl">
					<Link href={`/details/${post._id}`}>
						<video
							ref={videoRef}
							loop
							src={post.video.asset.url}
							className="w-[200px] h-[300px] lg:w-[600px] lg:h-[530px] md:h-[400px] 
							rounded-2xl cursor-pointer bg-gray-100"
						></video>
					</Link>
					{isHovering && (
						<div className="absolute bottom-6 left-8 cursor-pointer
						 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3">
							{ isVideoPlaying ? (
								<button onClick={onVideoPress}>
									<BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
								</button>
							) : (
								<button onClick={onVideoPress}>
									<BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
								</button>
							)}
							{ isVideoMuted ? (
								<button onClick={() => setIsVideoMuted(false)}>
									<HiVolumeOff className="text-black text-2xl lg:text-4xl" />
								</button>
							) : (
								<button onClick={() => setIsVideoMuted(true)}>
									<HiVolumeUp className="text-black text-2xl lg:text-4xl" />
								</button>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default VideoCard;
