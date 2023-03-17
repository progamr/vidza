import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SanityAssetDocument } from '@sanity/client';
import axios from 'axios';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { client } from '../utils/client';
import { topics } from '../utils/constants';
import useAuthStore from '../store/authStore';

const Upload = () => {
	const router = useRouter();
	const { userProfile }: {userProfile: any} = useAuthStore();
	const [isLoading, setIsLoading] = useState(false);
	const [fileTypeError, setFileTypeError] = useState(false);
	const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
	const [caption, setCaption] = useState('');
	const [topic, setTopic] = useState(topics[0].name);
	const [savingPost, setSavingPost] = useState(false);

	const uploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if(e.target?.files !== null) {
			const fileToUpload = e.target?.files[0];
			const allowedFileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

			if(allowedFileTypes.includes(fileToUpload.type)) {
				// TODO: check if movinng this to an API route is better
				// for consistency or this is the way to do it.
				setIsLoading(true);
				setFileTypeError(false);
				client.assets.upload('file', fileToUpload, {
					contentType: fileToUpload.type,
					filename: fileToUpload.name,
				}).then(res => {
					setVideoAsset(res);
					setIsLoading(false);
				})
			} else {
				setIsLoading(false);
				setFileTypeError(true);
			}
		}
	}

	const savePost = (e: React.MouseEvent<HTMLButtonElement>) => {
		setSavingPost(true);
		const sanityPostDocument = {
			_type: 'post',
			caption,
			topic,
			userId: userProfile?._id,
			video: {
				_type: 'file',
				asset: {
					_type: 'reference',
					_ref: videoAsset?._id,
				}
			},
			postedBy: {
				_type: 'postedBy',
				_ref: userProfile?._id,
			}
		} 

		axios.post('http://localhost:3000/api/post', sanityPostDocument);
		router.push('/');
	}

  	return (
		<div className="flex w-full h-full absolute left-0 top-[60px] mb-10 
		pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
			<div className="bg-white rounded-lg xl:h-[80vh] w-[70%] flex gap-6 
			flex-wrap items-center justify-between p-14 pt-6">
				<div>
					<div>
						<p className="text-2xl font-bold">Upload video</p>
						<p className="text-md text-gray-400 mt-1">post a video to your account</p>
					</div>
					<div className="flex flex-col border-dashed justify-center items-center 
					rounded-xl border-4 border-gray-400 outline-none mt-10 w-[260px] h-[460px]
					p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
						{
							isLoading ? (
								<p>Loading ...</p>
							) : (
								<div>
									{
										videoAsset ? (
											<div>
												<video
													src={videoAsset.url}
													loop
													controls
													className="rounded-xl h-[450px] mt-16 bg-black"
												>
												</video>
											</div>
										) : (
											<label className="cursor-pointer">
												<div className="flex flex-col justify-center items-center h-full">
													<div className="flex flex-col justify-center items-center">
														<p className="font-bold text-xl">
															<FaCloudUploadAlt className="text-6xl text-gray-300"/>
														</p>
														<p className="text-xl font-semibold">Upload video</p>
													</div>
													<p className="text-gray-400 text-center mt-6 text-sm leading-6">
														MP4, WebM or ogg <br />
														720x1280 or higher <br />
														Up to 10 miutes <br />
														Less than 2GB
													</p>
													<p className="bg-[#F51997] text-center mt-6 
													text-white text-md font-medium p-2 w-52 outline-none">
														Select File
													</p>
													<input type="file" name="video-file" className="w-0 h-0" onChange={uploadVideo}/>
												</div>
											</label>
										)
									}
								</div>
							)
						}
						{
							fileTypeError && <p className="text-center text7u-xl text-red-400 font-semibold mt-4 w-[250px]">Please select a video file</p>
						}
					</div>
				</div>
				<div className="flex flex-col gap-3 pb-10">
						<label htmlFor="caption" className="text-md font-medium">Caption</label>
						<input
							name="caption"
							type="text"
							value={caption}
							onChange={(e) => { setCaption(e.target.value) }}
							className="rounded outline-none text-md border-2 border-gray-200 p-2"
						/>
						<label htmlFor="topic" className="text-md font-medium">Choose a Topic</label>
						<select
							name="topic"
							className="outline-none border-2 border-gray-200 text-md 
							capitalize p-2 lg:p-4 rounded cursor-pointer"
							onChange={(e) => { setTopic(e.target.value); }}
						>
							{topics.map((topic) => (
								<option
									value={topic.name}
									key={topic.name}
									className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
								>
									{topic.name}
								</option>
							))}
						</select>
						<div className="flex gap-6 mt-10">
							<button type="button" onClick={() => {}} className="border-gray-300 border-2 text-md 
							font-medium p-2 rounded w-28 lg:w-44 outline-none">
								Discard
							</button>
							<button type="button" onClick={savePost} className="bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none">
								Post
							</button>

						</div>
				</div>
			</div>
		</div>
  	);
}

export default Upload;
