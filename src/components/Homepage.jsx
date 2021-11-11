import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCoinsQuery, useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from './index';
const { Title } = Typography;
const Homepage = () => {
	const { data, isFetching } = useGetCryptosQuery();
	//console.log('data', data);
	//console.log('isFetching', isFetching);

	return (
		<>
			<Title level={2} className="heading">
				Global Crypto Stats
			</Title>
			<Row>
				<Col span={12}>
					<Statistic title="Total Cryptocurrencies" value={data?.data?.totalCoins} />{' '}
				</Col>
				<Col span={12}>
					<Statistic title="Total Exchanges" value={data?.data?.totalExchanges} />{' '}
				</Col>
				<Col span={12}>
					<Statistic title="Total Market Cap" value={data?.data?.totalMarketCap ? millify(data?.data?.totalMarketCap) : data?.data?.totalMarketCap} />{' '}
				</Col>
				<Col span={12}>
					<Statistic title="Total 24h volume" value={data?.data?.total24hVolume ? millify(data?.data?.total24hVolume) : data?.data?.total24hVolume} />{' '}
				</Col>
				<Col span={12}>
					<Statistic title="Total Markets" value={data?.data?.totalMarkets} />{' '}
				</Col>
			</Row>
			<div className="home-heading-container">
				<Title level={2} className="home-title">
					Top 10 cryptocurrencies in the world
				</Title>
				<Title level={3} className="show-more">
					<Link to="/cryptocurrencies">Show more</Link>
				</Title>
			</div>
			<Cryptocurrencies simplified={true} />
			<div className="home-heading-container">
				<Title level={2} className="home-title">
					Latest crypto news
				</Title>
				<Title level={3} className="show-more">
					<Link to="/news">Show more</Link>
				</Title>
			</div>
			<News simplified={true} />
		</>
	);
};

export default Homepage;
