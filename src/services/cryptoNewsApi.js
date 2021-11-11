import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
	'x-bingapis-sdk': 'true',
	'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
	'x-rapidapi-key': '471f381503mshcc67ec1325d80eep1e166djsn836c2fa790cd',
};
//then hide keys in ENV.variables

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
	reducerPath: 'cryptoNewsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
	}),
	endpoints: (builder) => ({
		getCryptoNews: builder.query({
			query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&reshness=Day&count${count}`),
		}),
	}),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
