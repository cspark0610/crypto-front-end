/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import millify from 'millify';

import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCoinsQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
	const { data: cryptoList, isFetching } = useGetCoinsQuery();
	const [cryptos, setCryptos] = useState([]);
	//let count = simplified ? 10 : 100;
	//console.log('cryptos', cryptos);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		//once component is mounted, i have to filter crypto state which is an [] iniitally by imput coin search
		const filteredData = cryptoList?.data.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

		setCryptos(filteredData);
	}, [cryptoList, searchTerm]);
	//useEffect is a combination of component did mount and component did update

	if (isFetching) return 'Loading...';
	return (
		<>
			{!simplified && (
				<div className="search-crypto">
					<Input placeholder="Search cryptocurrencie" onChange={(e) => setSearchTerm(e.target.value)} />
				</div>
			)}

			<Row gutter={[32, 32]} className="crypto-card-container">
				{cryptos?.map((coin) => (
					<Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.id}>
						<Link to={`/crypto/${coin.id}`}>
							<Card title={`${coin.rank}. ${coin.name}`} extra={<img className="crypto-image" src={coin.iconUrl} alt="" hoverable />}>
								<p> Price: {millify(coin.price)}</p>
								<p> Market Cap: {millify(coin.marketCap)}</p>
								<p> Daily Change: {millify(coin.change)}</p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</>
	);
};

export default Cryptocurrencies;
