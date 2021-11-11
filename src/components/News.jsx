import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCoinsQuery } from '../services/cryptoApi';

const News = ({ simplified }) => {
	const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
	const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory: newsCategory, count: simplified ? 6 : 12 });
	const { data } = useGetCoinsQuery();

	if (!cryptoNews?.value) return 'loading ...';

	console.log('cryptoNews', cryptoNews);

	const { Text, Title } = Typography;
	const { Option } = Select;
	const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

	return (
		<>
			{!simplified && (
				<Col span={2}>
					<Select
						showSearch
						className="select-news"
						placeholder="select a crypto"
						optionFilterProp="children"
						onChange={(value) => setNewsCategory(value)}
						filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
					>
						<Option value="Cryptocurrency">Cryptocurrency</Option>
						{data?.data?.coins?.map((coin) => (
							<Option value={coin.name}>{coin.name}</Option>
						))}
					</Select>
				</Col>
			)}
			<Row gutter={[24, 24]}>
				{cryptoNews.value.map((news, i) => (
					<Col xs={24} sm={12} lg={8} key={i}>
						<Card hoverable className="news-card">
							<a href={news.url} target="_blank" rel="noreferrer">
								<div className="news-image-container">
									<Title className="news-title" level={4}>
										{news.name}
									</Title>
									<img src={news?.image?.thumbnail?.contentUrl | demoImage} alt="news" style={{ maxWidth: '200px', maxHeight: '100px' }} />
								</div>
								<p>{news.description > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
								<div className="provider-container">
									<div>
										<Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl | demoImage} alt="news" />
										<Text className="provider-name">{news.provider[0]?.name}</Text>
									</div>
									<Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
								</div>
							</a>
						</Card>
					</Col>
				))}
			</Row>
		</>
	);
};

export default News;
