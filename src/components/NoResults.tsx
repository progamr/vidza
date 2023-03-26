import React from 'react'

interface IProps {
	children: React.ReactNode;
}

const NoResults = ({children}: IProps) => {
  return (
	<div className="flex flex-col justify-center items-center h-full w-full">
		{children}
	</div>
  )
}

export default NoResults;
