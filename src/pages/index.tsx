import { NextPage } from 'next';
import axios from 'axios';
import { Video } from '../../types';
import NoResults from '../components/NoResults';
import VideoCard from '../components/VideoCard';
import { BASE_URL } from '../utils';

interface IProps {
	videos: Video[],
}

const Home: NextPage<IProps> = ({ videos }: IProps) => {
	
	return (
		<div className="flex flex-col gap-10 videos h-full">
			{
				videos.length ? videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
				: <NoResults text={'No vedios available yet.'} />
			}
		</div>
  	)
}

export const getServerSideProps = async () => {
	const { data } = await axios.get(`${BASE_URL}/api/post`);
	
	return {
		props: {
			videos: data,
		},
	};
}

export default Home;
