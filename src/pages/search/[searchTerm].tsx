import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import { MdOutlineVideocamOff } from 'react-icons/md';
import axios from 'axios';
import VideoCard from '../../components/VideoCard';
import NoResult from '../../components/NoResults';
import { IUser, Video } from '../../../types';
import { BASE_URL } from '../../utils';
import useAuthStore from '../../store/authStore';

const Search = ({ videos }: {videos: Video[]}) => {
	const [showAccounts, setShowAccounts] = useState(true);
	const accountsTabStyle = showAccounts ? 'border-b-2 border-black' : 'text-gray-400';
	const videosTabStyle = !showAccounts ? 'border-b-2 border-black' : 'text-gray-400';
	const router = useRouter();
	const { searchTerm }: any = router.query;
	const { users } = useAuthStore();
	const foundAccounts = users.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()));

  	return (
		<div className="w-full">
			<div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-400 bg-white w-full">
						<p
							className={`text-xl font-semibold cursor-pointer mt-2 ${accountsTabStyle}`}
							onClick={() => setShowAccounts(true)}
						>
							Accounts
						</p>
						<p
							className={`text-xl font-semibold cursor-pointer mt-2 ${videosTabStyle}`}
							onClick={() => setShowAccounts(false)}
						>
							Videos
						</p>
			</div>
			{
				showAccounts ? (
					<div className="md:mt-16">
						{
							foundAccounts.length ? (
								foundAccounts.map((account: IUser) => (
									<Link href={`/profile/${account._id}`} key={account._id}>
													<div className="flex gap-3 p-2 cursor-pointer font-semibold rounded
													border-b-2 border-gray-200">
														<div>
															<Image
																src={account.image}
																width={50}
																height={50}
																className="rounded-full"
																alt="user profile"
															/>
														</div>
														<div className="hidden xl:block">
															<p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
																{account.userName.replaceAll(' ', '')}
																<GoVerified className="text-blue-400" />
															</p>
															<p className="capitalize text-gray-400 text-xs">
																{account.userName}
															</p>
														</div>
													</div>
												</Link>
								))
							) : (
								<NoResult>
									<MdOutlineVideocamOff />
								<p>No users found</p>	
								</NoResult>
							)
						}
					</div>
				) : (
					<div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
						{
							videos.length ? (
								videos.map((item: Video) => (
									<VideoCard post={item} key={item._id} />
								))
							) : (
								<NoResult>
									<MdOutlineVideocamOff />
								<p>No vedios found</p>	
								</NoResult>
							)
						}
					</div>
				)
			}
		</div>
  	)
}

export const getServerSideProps =async ({
	params: { searchTerm }
}: {
	params: { searchTerm: string }
}) => {
	const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
	return {
		props: { videos: data },
	}
}

export default Search;
