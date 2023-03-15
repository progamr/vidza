import React from 'react'
import { footerList1, footerList2, footerList3 } from '../utils/constants'

const List = ({ items, className }: { items: string[], className?: string }) => {
  return (
	<div className="flex flex-wrap gap-2 mt-5">
		{
			items.map((item) => (
				<p key={item} className={`text-gray-400 text-sm hover:underline cursor-pointer ${className ? className : ''}`}>
					{item}
				</p>
			))
		}
	</div>
  )
}


const Footer = () => {
  return (
	<div className="mt-6 hidden xl:block">
		<List items={footerList1} />
		<List items={footerList2} className={'mt-5'} />
		<List items={footerList3} className={'mt-5'} />
		<p className="text-gray-400 text-sm mt-5">2023 - Vidza</p>
	</div>
  )
}

export default Footer;
