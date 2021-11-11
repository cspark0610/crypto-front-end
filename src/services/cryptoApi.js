// eslint-disable-next-line jsx-a11y/anchor-is-valid
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '[your own key]'
};
//then hide keys in ENV.variables

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = url => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),
  endpoints: builder => ({
    getCryptos: builder.query({
      query: () => createRequest('/stats')
    }),
    getCoins: builder.query({
      query: () => createRequest(`/coins`)
    }),
    getCryptoDetails: builder.query({
      query: coinId => createRequest(`/coin/${coinId}`)
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history/${timeperiod}`)
    })
  })
});

export const { useGetCryptosQuery, useGetCoinsQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;
