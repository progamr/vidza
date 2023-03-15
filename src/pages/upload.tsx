import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';

const Upload = () => {
  return (
	<div className="flex w-full h-full">
		<div className="bg-white rounded-lg">
			<div>
				<div>
					<p className="text-2xl font-bold">Upload video</p>
					<p>post a video to your account</p>
				</div>
			</div>
		</div>
	</div>
  )
}

export default Upload;
